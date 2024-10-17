import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LoadDataService {
	private loadButton: Subject<void> = new Subject<void>();

	loadButton$: Observable<void> = this.loadButton.asObservable();

	private graphData: String | ArrayBuffer = null;

	setGraphData(data: String | ArrayBuffer): void {
		this.graphData = data;
	}

	getGraphData(): String | ArrayBuffer {
		return this.graphData;
	}

	updateLoadData(): void {
		this.loadButton.next();
	}
}
