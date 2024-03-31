import { Component, ElementRef } from '@angular/core';
import { DownloadDataService } from '../../download-data.service';
import { LoadDataService } from '../../load-data.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent {
    constructor(
        private downloadService: DownloadDataService,
        private loadService: LoadDataService,
        private elRef: ElementRef
    ) {}

    ngAfterViewInit() {
        const menuComponent = this;
        document
            .getElementById('fileInput')
            .addEventListener('change', function (event) {
                const inputElement = event.target as HTMLInputElement;
                if (inputElement.files && inputElement.files[0]) {
                    const selectedFile = inputElement.files[0];
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        // 'e.target.result' contains the file content
                        const fileContent = e.target.result;
                        menuComponent.loadService.setGraphData(fileContent);
                        menuComponent.loadService.updateLoadData();
                    };

                    reader.readAsText(selectedFile);
                }
            });
    }

    export(fileType: string) {
        this.downloadService.updateDownloadData(fileType);
        const blobData = this.downloadService.getBlobData();
        const exportButton =
            this.elRef.nativeElement.querySelector('#exportButton');

        if (blobData) {
            const url = URL.createObjectURL(blobData);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `example.${fileType}`;

            // Programmatically trigger the download
            downloadLink.click();

            // Clean up after download
            URL.revokeObjectURL(url);
        }
    }

    import() {
        document.getElementById('fileInput').click();
    }
}
