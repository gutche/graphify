import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditorComponent } from "./editor.component";
import { LoadDataService } from "../import-graph.service";

describe("EditorComponent", () => {
	let editor: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;
	let loadDataService: LoadDataService;
	let graphData: string;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [LoadDataService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditorComponent);
		editor = fixture.componentInstance;
		loadDataService = TestBed.inject(LoadDataService);
		graphData = `
        <mxGraphModel dx="4997" dy="2347" grid="1" gridSize="10" guides="1" tooltips="1" connect="1"
        arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none"
        math="0" shadow="0">
        <root>
            <mxCell id="0" />
            <mxCell id="1" parent="0" />
            <mxCell id="2" value="" style="group" vertex="1" connectable="0" parent="1">
                <mxGeometry x="250" y="240" width="2250" height="1598" as="geometry" />
            </mxCell>
            <mxCell id="3" value=""
                style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=none;strokeWidth=3;fillColor=#e8edf0;fontSize=60;fontColor=#2F5B7C;align=left;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;"
                vertex="1" parent="2">
                <mxGeometry width="2250" height="1598" as="geometry" />
            </mxCell>
        </root>
        </mxGraphModel>
        `;
		loadDataService.setGraphData(graphData);
		editor.ngOnInit();
		editor.ngAfterViewInit();
		editor.loadGraph();
		editor.updateDownloadData();
		fixture.detectChanges();
	});

	it("it should load graph data correctly", () => {
		const loadedGraphData = loadDataService.getGraphData();
		expect(loadedGraphData).toEqual(graphData);
	});
});
