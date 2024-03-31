import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DownloadDataService {
    private downloadButton = new Subject<String>();

    downloadButton$ = this.downloadButton.asObservable();

    private blobData: Blob | null = null;

    setBlobData(data: Blob) {
        this.blobData = data;
    }

    getBlobData(): Blob | null {
        return this.blobData;
    }

    updateDownloadData(fileType: string) {
        this.downloadButton.next(fileType);
    }
}
