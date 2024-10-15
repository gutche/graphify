import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-sidebar",
	standalone: true,
	imports: [],
	templateUrl: "./sidebar.component.html",
	styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
	@ViewChild("sidebarContainer", { static: false })
	sidebarContainer!: ElementRef;

	appendChild(element: HTMLElement): void {
		this.sidebarContainer.nativeElement.appendChild(element);
	}
}
