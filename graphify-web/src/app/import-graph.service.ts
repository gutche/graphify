import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LoadDataService {
	private loadButton = new Subject<void>();

	loadButton$ = this.loadButton.asObservable();

	private graphData: String | ArrayBuffer = null;

	setGraphData(data: String | ArrayBuffer) {
		this.graphData = data;
	}

	getGraphData(): String | ArrayBuffer {
		return this.graphData;
	}

	updateLoadData() {
		this.loadButton.next();
	}
}
