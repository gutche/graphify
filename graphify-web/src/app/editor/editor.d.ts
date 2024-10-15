declare module "mxgraph" {
	interface mxGraph {
		domPurify: (value: string, inPlace: boolean) => string;
		sanitizeHtml: (value: string, editing: boolean) => string;
		deleteCells: (
			deletetableCells: mxCell[],
			includeEdges: boolean
		) => mxCell[];
	}
}
