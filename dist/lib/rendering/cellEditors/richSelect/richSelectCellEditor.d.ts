// Type definitions for ag-grid v4.0.5
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { ICellEditor, ICellEditorParams } from "./../iCellEditor";
import { Component } from "../../../widgets/component";
import { Context } from "../../../context/context";
import { ICellRenderer, ICellRendererFunc } from "../../cellRenderers/iCellRenderer";
import { CellRendererService } from "../../cellRendererService";
export interface IRichCellEditorParams extends ICellEditorParams {
    values: string[];
    cellRenderer: {
        new (): ICellRenderer;
    } | ICellRendererFunc | string;
}
export declare class RichSelectCellEditor extends Component implements ICellEditor {
    private static TEMPLATE;
    context: Context;
    cellRendererService: CellRendererService;
    private params;
    private virtualList;
    private selectedValue;
    private cellRenderer;
    constructor();
    init(params: IRichCellEditorParams): void;
    private onKeyDown(event);
    private onEnterKeyDown();
    private onNavigationKeyPressed(event, key);
    private renderSelectedValue();
    private setSelectedValue(value);
    private createRowComponent(value);
    private onMouseMove(mouseEvent);
    private onClick();
    afterGuiAttached(): void;
    getValue(): any;
    isPopup(): boolean;
}
