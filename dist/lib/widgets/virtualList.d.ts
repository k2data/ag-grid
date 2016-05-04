// Type definitions for ag-grid v4.0.5
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { Component } from "./component";
export interface VirtualListModel {
    getRowCount(): number;
    getRow(index: number): any;
}
export declare class VirtualList extends Component {
    private static TEMPLATE;
    private context;
    private model;
    private eListContainer;
    private rowsInBodyContainer;
    private componentCreator;
    private rowHeight;
    constructor();
    private init();
    ensureIndexVisible(index: number): void;
    setComponentCreator(componentCreator: (value: any) => Component): void;
    getRowHeight(): number;
    getScrollTop(): number;
    setRowHeight(rowHeight: number): void;
    refresh(): void;
    private clearVirtualRows();
    private drawVirtualRows();
    private ensureRowsRendered(start, finish);
    private removeVirtualRows(rowsToRemove);
    private insertRow(value, rowIndex);
    private addScrollListener();
    setModel(model: VirtualListModel): void;
}
