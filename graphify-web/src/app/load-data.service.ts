import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadDataService {
    private loadButton = new Subject<void>();

    loadButton$ = this.loadButton.asObservable();

    private blobData: Blob | null = null;

    setBlobData(data: Blob) {
        this.blobData = data;
    }

    getBlobData(): Blob | null {
        return this.blobData;
    }

    updateDownloadData() {
        this.loadButton.next();
    }
}
