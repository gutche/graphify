import { Component, ElementRef, ViewChild } from "@angular/core";
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
	@ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;

	constructor(
		private downloadService: DownloadDataService,
		private loadService: LoadDataService
	) {}

	ngAfterViewInit(): void {
		this.fileInput.nativeElement.addEventListener(
			"change",
			(event): void => {
				const inputElement: HTMLInputElement =
					event.target as HTMLInputElement;
				if (inputElement.files && inputElement.files[0]) {
					const selectedFile: File = inputElement.files[0];
					const reader: FileReader = new FileReader();

					reader.onload = (e) => {
						const fileContent: string | ArrayBuffer =
							e.target?.result;
						this.loadService.setGraphData(fileContent as string);
						this.loadService.updateLoadData();
						inputElement.value = ""; // Clear the input after loading the file
					};

					reader.readAsText(selectedFile);
				}
			}
		);
	}

	export(fileType: string): void {
		let blobData: Blob | null = null;
		let url: string | null = null;

		if (fileType === "xml") {
			this.downloadService.updateDownloadData();
			blobData = this.downloadService.getBlobData();
		} else {
			const container: HTMLElement =
				document.getElementById("graph-container");
			const svgElement: SVGSVGElement = container.querySelector("svg");
			const svgContent: string = new XMLSerializer().serializeToString(
				svgElement
			);

			const canvas: HTMLCanvasElement = document.createElement("canvas");
			const context: CanvasRenderingContext2D = canvas.getContext("2d");

			const image: HTMLImageElement = new Image();
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

	private triggerDownload(url: string, fileType: string): void {
		const exportLink: HTMLAnchorElement = document.createElement("a");
		exportLink.href = url;
		exportLink.download = `example.${fileType}`;
		exportLink.click();
		URL.revokeObjectURL(url);
	}

	import(): void {
		this.fileInput.nativeElement.click();
	}
}
