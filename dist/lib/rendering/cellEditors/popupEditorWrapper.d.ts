<<<<<<< HEAD
// Type definitions for ag-grid v4.0.5
=======
// Type definitions for ag-grid v5.0.3
>>>>>>> upstream/master
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { Component } from "../../widgets/component";
<<<<<<< HEAD
import { ICellEditor } from "./iCellEditor";
=======
import { ICellEditor, ICellEditorParams } from "./iCellEditor";
>>>>>>> upstream/master
export declare class PopupEditorWrapper extends Component implements ICellEditor {
    private cellEditor;
    private params;
    private getGuiCalledOnChild;
    constructor(cellEditor: ICellEditor);
    private onKeyDown(event);
    getGui(): HTMLElement;
<<<<<<< HEAD
    init(params: any): void;
    afterGuiAttached(): void;
    getValue(): any;
    isPopup(): boolean;
=======
    init(params: ICellEditorParams): void;
    afterGuiAttached(): void;
    getValue(): any;
    isPopup(): boolean;
    isCancelBeforeStart(): boolean;
    isCancelAfterEnd(): boolean;
>>>>>>> upstream/master
}
