import { Component, ElementRef, ViewChild } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MenuComponent } from "./menu/menu.component";
import mx from "../../mxgraph";
import { DownloadDataService } from "../export-graph.service";
import { LoadDataService } from "../import-graph.service";
import DOMPurify from "dompurify";
import { mxCell, mxCodec, mxGraph, mxGraphView } from "mxgraph";

@Component({
	selector: "app-editor",
	standalone: true,
	imports: [SidebarComponent, MenuComponent],
	templateUrl: "./editor.component.html",
	styleUrl: "./editor.component.scss",
})
export class EditorComponent {
	private graph: mxGraph;
	@ViewChild("graphContainer", { static: false }) graphContainer!: ElementRef;
	@ViewChild("sidebarComponent", { static: false })
	sidebarComponent!: SidebarComponent;

	constructor(
		private downloadService: DownloadDataService,
		private loadService: LoadDataService
	) {}

	updateDownloadData = (): void => {
		const codec: mxCodec = new mx.mxCodec();
		const model: XMLDocument = codec.encode(this.graph.getModel());
		const modelXml: string = mx.mxUtils.getXml(model);

		const blob: Blob = new Blob([modelXml], { type: "application/xml" });
		this.downloadService.setBlobData(blob);
	};

	loadGraph = (): void => {
		const graphData: String | ArrayBuffer = this.loadService.getGraphData();
		const xmlDocument = mx.mxUtils.parseXml(graphData);
		const codec: mxCodec = new mx.mxCodec(xmlDocument);
		codec.decode(xmlDocument.documentElement, this.graph.getModel());
	};

	initGrid = (): void => {
		try {
			const canvas = document.createElement("canvas");
			canvas.style.position = "absolute";
			canvas.style.top = "0px";
			canvas.style.left = "0px";
			canvas.style.zIndex = "-1";
			this.graph.container.appendChild(canvas);

			const ctx = canvas.getContext("2d");
			const mxGraphView: mxGraphView = mx.mxGraphView.prototype;

			const isContainerEventRef: Function = mxGraphView.isContainerEvent;

			// Modify event filtering to accept canvas as container
			mxGraphView.isContainerEvent = function (evt) {
				return (
					isContainerEventRef.apply(this, arguments) ||
					mx.mxEvent.getSource(evt) == canvas
				);
			};

			let s = 0;
			let gs = 0;
			let tr = new mx.mxPoint();
			let w = 0;
			let h = 0;

			const repaintGrid = () => {
				if (ctx != null) {
					const bounds = this.graph.getGraphBounds();
					const width = Math.max(
						bounds.x + bounds.width,
						this.graph.container.clientWidth
					);
					const height = Math.max(
						bounds.y + bounds.height,
						this.graph.container.clientHeight
					);
					const sizeChanged = width != w || height != h;

					if (
						this.graph.view.scale != s ||
						this.graph.view.translate.x != tr.x ||
						this.graph.view.translate.y != tr.y ||
						gs != this.graph.gridSize ||
						sizeChanged
					) {
						tr = this.graph.view.translate.clone();
						s = this.graph.view.scale;
						gs = this.graph.gridSize;
						w = width;
						h = height;

						// Clears the background if required
						if (!sizeChanged) {
							ctx.clearRect(0, 0, w, h);
						} else {
							canvas.setAttribute("width", w.toString());
							canvas.setAttribute("height", h.toString());
						}

						const tx = tr.x * s;
						const ty = tr.y * s;

						// Sets the distance of the grid lines in pixels
						const minStepping = this.graph.gridSize;
						let stepping = minStepping * s;

						if (stepping < minStepping) {
							const count =
								Math.round(
									Math.ceil(minStepping / stepping) / 2
								) * 2;
							stepping = count * stepping;
						}

						const xs =
							Math.floor((0 - tx) / stepping) * stepping + tx;
						let xe = Math.ceil(w / stepping) * stepping;
						const ys =
							Math.floor((0 - ty) / stepping) * stepping + ty;
						let ye = Math.ceil(h / stepping) * stepping;

						xe += Math.ceil(stepping);
						ye += Math.ceil(stepping);

						const ixs = Math.round(xs);
						const ixe = Math.round(xe);
						const iys = Math.round(ys);
						const iye = Math.round(ye);

						// Draws the actual grid
						ctx.strokeStyle = "#f6f6f6";
						ctx.beginPath();

						for (let x = xs; x <= xe; x += stepping) {
							x = Math.round((x - tx) / stepping) * stepping + tx;
							const ix = Math.round(x);

							ctx.moveTo(ix + 0.5, iys + 0.5);
							ctx.lineTo(ix + 0.5, iye + 0.5);
						}

						for (let y = ys; y <= ye; y += stepping) {
							y = Math.round((y - ty) / stepping) * stepping + ty;
							const iy = Math.round(y);

							ctx.moveTo(ixs + 0.5, iy + 0.5);
							ctx.lineTo(ixe + 0.5, iy + 0.5);
						}

						ctx.closePath();
						ctx.stroke();
					}
				}
			};
			const validateBackgroundRef = mxGraphView.validateBackground;
			mxGraphView.validateBackground = function () {
				validateBackgroundRef.apply(this, arguments);
				repaintGrid();
			};
		} catch (e) {
			mx.mxLog.show();
			mx.mxLog.debug("Using background image");
			this.graphContainer.nativeElement.style.backgroundImage =
				"url('editors/images/grid.gif')";
		}
	};

	initZoom = (): void => {
		mx.mxEvent.addMouseWheelListener((evt, up) => {
			if (mx.mxEvent.isConsumed(evt)) {
				return;
			}

			const gridEnabled = this.graph.gridEnabled;

			// disable snapping
			this.graph.gridEnabled = false;

			const p1 = this.graph.getPointForEvent(evt, false);

			if (up) {
				this.graph.zoomIn();
			} else {
				this.graph.zoomOut();
			}

			const p2 = this.graph.getPointForEvent(evt, false);
			const deltaX = p2.x - p1.x;
			const deltaY = p2.y - p1.y;
			const view = this.graph.view;

			view.setTranslate(
				view.translate.x + deltaX,
				view.translate.y + deltaY
			);

			this.graph.gridEnabled = gridEnabled;

			mx.mxEvent.consume(evt);
		}, this.graphContainer.nativeElement);
	};

	preloadBMC = (): void => {
		const xmlDocument = mx.mxUtils.parseXml(`
			<mxGraphModel dx="4997" dy="2347" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none" math="0" shadow="0">
			  <root>
				<mxCell id="0" />
				<mxCell id="1" parent="0" />
				<mxCell id="2" value="" style="group" vertex="1" connectable="0" parent="1">
				  <mxGeometry x="-300" y="-550" width="2250" height="1598" as="geometry" />
				</mxCell>
				<mxCell id="3" value="" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=none;strokeWidth=3;fillColor=#e8edf0;fontSize=60;fontColor=#2F5B7C;align=left;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry width="2250" height="1598" as="geometry" />
				</mxCell>
				<mxCell id="4" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Customer Relationships" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="1330" y="188" width="420" height="450" as="geometry" />
				</mxCell>
				<mxCell id="5" value="&lt;font&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Partners" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="70" y="188" width="420" height="900" as="geometry" />
				</mxCell>
				<mxCell id="6" value="&lt;font&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Activities" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="490" y="188" width="420" height="450" as="geometry" />
				</mxCell>
				<mxCell id="7" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Resources" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="490" y="638" width="420" height="450" as="geometry" />
				</mxCell>
				<mxCell id="8" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Value Propositions" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;graph.txtdeletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="910" y="188" width="420" height="900" as="geometry" />
				</mxCell>
				<mxCell id="9" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Customer Segments" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="1750" y="188" width="420" height="900" as="geometry" />
				</mxCell>
				<mxCell id="10" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Channels" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="1330" y="638" width="420" height="450" as="geometry" />
				</mxCell>
				<mxCell id="11" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Cost Structure" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="70" y="1088" width="1050" height="450" as="geometry" />
				</mxCell>
				<mxCell id="12" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Revenue Streams" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="1120" y="1088" width="1050" height="450" as="geometry" />
				</mxCell>
				<mxCell id="13" value="The Business Model Canvas" style="text;html=1;resizable=1;points=[];autosize=1;align=left;verticalAlign=top;spacingTop=-4;fontSize=60;fontColor=#2F5B7C;movable=1;rotatable=1;deletable=1;fillColor=#ffffff;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
				  <mxGeometry x="70" y="78" width="780" height="70" as="geometry" />
				</mxCell>
			  </root>
			</mxGraphModel>`);

		const codec = new mx.mxCodec(xmlDocument);
		codec.decode(xmlDocument.documentElement, this.graph.getModel());
	};

	initDraggable = (): void => {
		const getGraphFromEvent = (evt: PointerEvent): mxGraph | null => {
			const x = mx.mxEvent.getClientX(evt);
			const y = mx.mxEvent.getClientY(evt);
			const elt = document.elementFromPoint(x, y);

			if (mx.mxUtils.isAncestorNode(this.graph.container, elt)) {
				return this.graph;
			}

			return null;
		};

		const createStyledCell = (graph, evt, target, x, y): void => {
			const cell = new mx.mxCell(
				"text",
				new mx.mxGeometry(0, 0, 150, 100)
			);
			cell.vertex = true;
			let style = cell.getStyle();
			style = mx.mxUtils.setStyle(
				style,
				mx.mxConstants.STYLE_FILLCOLOR,
				"#FFEB84"
			);
			style = mx.mxUtils.setStyle(
				style,
				mx.mxConstants.STYLE_FONTCOLOR,
				"#000000"
			);
			cell.setStyle(style);
			const cells = graph.importCells([cell], x, y, target);

			if (cells != null && cells.length > 0) {
				graph.scrollCellToVisible(cells[0]);
				graph.setSelectionCells(cells);
			}
		};

		// Creates a DOM node that acts as the drag source
		const img = mx.mxUtils.createImage(
			"../../assets/dragsource/post-it.png"
		);
		img.style.width = "100px";
		img.style.height = "100px";
		img.style.cursor = "pointer";

		this.sidebarComponent.appendChild(img);

		// Disables built-in DnD in IE (this is needed for cross-frame DnD, see below)
		if (mx.mxClient.IS_IE) {
			mx.mxEvent.addListener(img, "dragstart", function (evt) {
				evt.returnValue = false;
			});
		}

		// Creates the element for the actual preview of the object that is being dragged.
		const dragElt = document.createElement("div");
		dragElt.style.border = "dashed black 1px";
		dragElt.style.width = "150px";
		dragElt.style.height = "100px";

		// Drag source is configured to use dragElt for preview and as drag icon
		// if scalePreview (last) argument is true. Dx and dy are null to force
		// the use of the defaults. Note that dx and dy are only used for the
		// drag icon but not for the preview.
		const ds = mx.mxUtils.makeDraggable(
			img,
			getGraphFromEvent,
			createStyledCell,
			dragElt,
			null,
			null,
			this.graph.autoScroll,
			true
		);

		// Redirects feature to global switch. Note that this feature should only be used
		// if the the x and y arguments are used in funct to insert the cell.
		ds.isGuidesEnabled = (): boolean => {
			return this.graph.graphHandler.guidesEnabled;
		};

		// Restores original drag icon while outside of graph
		ds.createDragElement = mx.mxDragSource.prototype.createDragElement;
	};

	ngOnInit(): void {
		this.downloadService.downloadButton$.subscribe((fileType) => {
			this.updateDownloadData();
		});
		this.loadService.loadButton$.subscribe(() => this.loadGraph());
		window.DOM_PURIFY_CONFIG = window.DOM_PURIFY_CONFIG || {
			ADD_TAGS: ["use", "foreignObject"],
			FORBID_TAGS: ["form"],
			ALLOWED_URI_REGEXP: /^((?!javascript:).)*$/i,
			ADD_ATTR: [
				"target",
				"content",
				"pointer-events",
				"requiredFeatures",
			],
		};
	}

	deleteCells(includeEdges): void {
		// Cancels interactive operations
		this.graph.escape();
		const select: mxCell[] = this.graph.deleteCells(
			this.graph.getDeletableCells(this.graph.getSelectionCells()),
			includeEdges
		);

		if (select != null) {
			this.graph.setSelectionCells(select);
		}
	}

	deleteLabels(): void {
		if (!this.graph.isSelectionEmpty()) {
			this.graph.getModel().beginUpdate();
			try {
				const cells: mxCell[] = this.graph.getSelectionCells();

				for (var i = 0; i < cells.length; i++) {
					this.graph.cellLabelChanged(cells[i], "");
				}
			} finally {
				this.graph.getModel().endUpdate();
			}
		}
	}

	convertHtmlToText(label): string {
		if (label != null) {
			var temp = document.createElement("div");
			temp.innerHTML = this.graph.sanitizeHtml(
				label,
				this.graph.isEditing()
			);

			return mx.mxUtils.extractTextWithWhitespace(temp.childNodes);
		} else {
			return null;
		}
	}

	async ngAfterViewInit(): Promise<void> {
		// Init graph
		this.graph = new mx.mxGraph(this.graphContainer.nativeElement!);
		// Zoom out at the start (We're too zoomed in xd)
		setTimeout(() => {
			this.graph.zoomOut();
			this.graph.zoomOut();
			this.graph.zoomOut();
			this.graph.zoomOut();
		}, 100);

		// Enable panning
		this.graph.setPanning(true);

		this.graph.setHtmlLabels(true);
		new mx.mxRubberband(this.graph);
		const keyHandler = new mx.mxKeyHandler(this.graph);

		// Pan with right click on top of vertices
		var panningHandlerIsForcePanningEvent =
			this.graph.panningHandler.isForcePanningEvent;
		this.graph.panningHandler.isForcePanningEvent = function (me) {
			// Ctrl+left button is reported as right button in FF on Mac
			return (
				panningHandlerIsForcePanningEvent.apply(this, arguments) ||
				(mx.mxEvent.isMouseEvent(me.getEvent()) &&
					(this.usePopupTrigger ||
						!mx.mxEvent.isPopupTrigger(me.getEvent())) &&
					((!mx.mxEvent.isControlDown(me.getEvent()) &&
						mx.mxEvent.isRightMouseButton(me.getEvent())) ||
						mx.mxEvent.isMiddleMouseButton(me.getEvent())))
			);
		};

		mx.mxGraph.prototype.isTable = function (cell): boolean {
			var style = this.getCellStyle(cell);

			return style != null && style["childLayout"] == "tableLayout";
		};

		mx.mxGraph.prototype.deleteCells = function (cells, includeEdges) {
			let select = null;

			if (cells != null && cells.length > 0) {
				this.model.beginUpdate();
				try {
					// Shrinks tables
					for (let i = 0; i < cells.length; i++) {
						const parent = this.model.getParent(cells[i]);

						if (this.isTable(parent)) {
							const row = this.getCellGeometry(cells[i]);
							let table = this.getCellGeometry(parent);

							if (row != null && table != null) {
								table = table.clone();
								table.height -= row.height;
								this.model.setGeometry(parent, table);
							}
						}
					}

					this.removeCells(cells, includeEdges);
				} finally {
					this.model.endUpdate();
				}
				const parents = this.selectParentAfterDelete
					? this.model.getParents(cells)
					: null;

				// Selects parents for easier editing of groups
				if (parents != null) {
					select = [];

					for (let i = 0; i < parents.length; i++) {
						if (
							this.model.contains(parents[i]) &&
							(this.model.isVertex(parents[i]) ||
								this.model.isEdge(parents[i]))
						) {
							select.push(parents[i]);
						}
					}
				}
			}
			return select;
		};

		keyHandler.bindKey(46, (evt, trigger): void => {
			// Context menu click uses trigger, toolbar menu click uses evt
			evt = trigger != null ? trigger : evt;

			if (evt != null && mx.mxEvent.isShiftDown(evt)) {
				this.deleteLabels();
			} else {
				this.deleteCells(
					evt != null &&
						(mx.mxEvent.isControlDown(evt) ||
							mx.mxEvent.isMetaDown(evt) ||
							mx.mxEvent.isAltDown(evt))
				);
			}
		});

		mx.mxGraph.prototype.isRecursiveVertexResize = function (
			state
		): boolean {
			return (
				!this.isSwimlane(state.cell) &&
				this.model.getChildCount(state.cell) > 0 &&
				!this.isCellCollapsed(state.cell) &&
				mx.mxUtils.getValue(state.style, "recursiveResize", "1") ==
					"1" &&
				mx.mxUtils.getValue(state.style, "childLayout", null) == null
			);
		};

		/**
		 * Enables recursive resize for groups.
		 */
		mx.mxVertexHandler.prototype.isRecursiveResize = function (
			state,
			me
		): boolean {
			return (
				this.graph.isRecursiveVertexResize(state) &&
				!mx.mxEvent.isAltDown(me.getEvent())
			);
		};

		this.graph.domPurify = function (value, inPlace): string {
			window.DOM_PURIFY_CONFIG.IN_PLACE = inPlace;
			return DOMPurify.sanitize(value, window.DOM_PURIFY_CONFIG);
		};
		/**
		 * Sanitizes the given HTML markup, allowing target attributes and
		 * data: protocol links to pages and custom actions.
		 */
		this.graph.sanitizeHtml = (value, editing): string => {
			return this.graph.domPurify(value, editing);
		};

		const mxCellEditor = mx.mxCellEditor.prototype;

		const getInitialValueRef = mxCellEditor.getInitialValue;
		mxCellEditor.getInitialValue = function (state, trigger) {
			if (mx.mxUtils.getValue(state.style, "html", "0") == "0") {
				return getInitialValueRef.apply(this, arguments);
			} else {
				var result = this.graph.getEditingValue(state.cell, trigger);

				if (mx.mxUtils.getValue(state.style, "nl2Br", "1") == "1") {
					result = result.replace(/\n/g, "<br/>");
				}

				result = this.graph.sanitizeHtml(result, true);

				return result;
			}
		};

		this.initGrid();
		this.initZoom();
		this.initDraggable();
		this.preloadBMC();
	}
}
