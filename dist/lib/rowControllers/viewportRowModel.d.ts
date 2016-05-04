// Type definitions for ag-grid v4.0.5
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { IRowModel } from "../interfaces/iRowModel";
import { RowNode } from "../entities/rowNode";
import { IViewportDatasource } from "../interfaces/iViewportDatasource";
export declare class ViewportRowModel implements IRowModel {
    private gridOptionsWrapper;
    private eventService;
    private selectionController;
    private context;
    private firstRow;
    private lastRow;
    private rowCount;
    private rowNodesByIndex;
    private rowHeight;
    private viewportDatasource;
    private init();
    private destroy();
    private destroyCurrentDatasource();
    private calculateFirstRow(firstRenderedRow);
    private calculateLastRow(lastRenderedRow);
    private onViewportChanged(event);
    purgeRowsNotInViewport(): void;
    setViewportDatasource(viewportDatasource: IViewportDatasource): void;
    getType(): string;
    getRow(rowIndex: number): RowNode;
    getRowCount(): number;
    getRowIndexAtPixel(pixel: number): number;
    getRowCombinedHeight(): number;
    isEmpty(): boolean;
    isRowsToRender(): boolean;
    forEachNode(callback: (rowNode: RowNode) => void): void;
    private setRowData(rowData);
    private createNode(data, rowIndex);
    setRowCount(rowCount: number): void;
}
