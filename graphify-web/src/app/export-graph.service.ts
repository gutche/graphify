import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class DownloadDataService {
	private downloadButton: Subject<void> = new Subject<void>();

	downloadButton$: Observable<void> = this.downloadButton.asObservable();

	private blobData: Blob | null = null;

	setBlobData(data: Blob) {
		this.blobData = data;
	}

	getBlobData(): Blob | null {
		return this.blobData;
	}

	updateDownloadData(): void {
		this.downloadButton.next();
	}
}
