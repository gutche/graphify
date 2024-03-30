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

    ngAfterViewInit() {}

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
        console.log('Load');
    }

 
}
