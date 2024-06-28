import { Component } from "@angular/core";
import { DownloadDataService } from "../../export-graph.service";
import { LoadDataService } from "../../import-graph.service";

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [],
	templateUrl: "./menu.component.html",
	styleUrl: "./menu.component.scss",
})
export class MenuComponent {
	constructor(
		private downloadService: DownloadDataService,
		private loadService: LoadDataService
	) {}

	ngAfterViewInit() {
		const menuComponent = this;
		document
			.getElementById("fileInput")
			.addEventListener("change", function (event) {
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
		let blobData = null;
		let url = null;

		if (fileType === "xml") {
			this.downloadService.updateDownloadData();
			blobData = this.downloadService.getBlobData();
		} else {
			const container = document.getElementById("graph-container");
			const svgElement = container.querySelector("svg");
			const svgContent = new XMLSerializer().serializeToString(
				svgElement
			);

			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			const image = new Image();
			image.onload = () => {
				canvas.width = svgElement.clientWidth;
				canvas.height = svgElement.clientHeight;
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(image, 0, 0);
				url = canvas.toDataURL(`image/${fileType}`);
				this.triggerDownload(url, fileType);
			};
			image.src =
				"data:image/svg+xml;charset=utf-8," +
				encodeURIComponent(svgContent);
		}

		if (blobData) {
			url = URL.createObjectURL(blobData);
			this.triggerDownload(url, fileType);
		}
	}

	private triggerDownload(url: string, fileType: string) {
		const exportLink = document.createElement("a");
		exportLink.href = url;
		exportLink.download = `example.${fileType}`;
		exportLink.click();
		URL.revokeObjectURL(url);
	}

	import() {
		document.getElementById("fileInput").click();
	}
}
