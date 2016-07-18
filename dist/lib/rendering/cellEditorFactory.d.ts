<<<<<<< HEAD
// Type definitions for ag-grid v4.0.5
=======
// Type definitions for ag-grid v5.0.3
>>>>>>> upstream/master
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { ICellEditor } from "./cellEditors/iCellEditor";
export declare class CellEditorFactory {
    private static TEXT;
    private static SELECT;
<<<<<<< HEAD
    private static DATE;
    private static POPUP_TEXT;
    private static POPUP_SELECT;
    private static RICH_SELECT;
    private context;
=======
    private static POPUP_TEXT;
    private static POPUP_SELECT;
    private context;
    private gridOptionsWrapper;
>>>>>>> upstream/master
    private cellEditorMap;
    private init();
    addCellEditor(key: string, cellEditor: {
        new (): ICellEditor;
    }): void;
    createCellEditor(key: string | {
        new (): ICellEditor;
    }): ICellEditor;
}
