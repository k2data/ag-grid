<<<<<<< HEAD
// Type definitions for ag-grid v4.0.5
=======
// Type definitions for ag-grid v5.0.3
>>>>>>> upstream/master
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { ICellRenderer, ICellRendererFunc } from "./cellRenderers/iCellRenderer";
export declare class CellRendererFactory {
    static ANIMATE_SLIDE: string;
    static ANIMATE_SHOW_CHANGE: string;
    static GROUP: string;
    private gridOptionsWrapper;
<<<<<<< HEAD
    private selectionRendererFactory;
=======
>>>>>>> upstream/master
    private expressionService;
    private eventService;
    private cellRendererMap;
    private init();
<<<<<<< HEAD
    private registerRenderersFromGridOptions();
=======
>>>>>>> upstream/master
    addCellRenderer(key: string, cellRenderer: {
        new (): ICellRenderer;
    } | ICellRendererFunc): void;
    getCellRenderer(key: string): {
        new (): ICellRenderer;
    } | ICellRendererFunc;
}
