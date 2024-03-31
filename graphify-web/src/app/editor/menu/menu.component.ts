import { Component, ElementRef } from '@angular/core';
import { DownloadDataService } from '../../download-data.service';

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
        private elRef: ElementRef
    ) {}

    ngAfterViewInit() {
        document
            .getElementById('fileInput')
            .addEventListener('change', function (event) {
                const inputElement = event.target as HTMLInputElement;
                if (inputElement.files && inputElement.files[0]) {
                    const selectedFile = inputElement.files[0];
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        // 'e.target.result' contains the file content
                        const fileContent = e.target.result;
                        console.log(fileContent); // You can do something with the file content here
                    };

                    reader.readAsText(selectedFile);
                }
            });
    }

    download() {
        this.downloadService.updateDownloadData();
        const blobData = this.downloadService.getBlobData();
        const downloadButton =
            this.elRef.nativeElement.querySelector('#downloadButton');

        if (blobData) {
            downloadButton.href = URL.createObjectURL(blobData);
            downloadButton.download = 'example.xml';

            downloadButton.click();
        }
    }

    load() {
        document.getElementById('fileInput').click();
    }
}
