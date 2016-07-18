// Type definitions for ag-grid v5.0.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { CsvExportParams } from "./csvCreator";
import { MasterSlaveService } from "./masterSlaveService";
<<<<<<< HEAD
import { ColDef } from "./entities/colDef";
=======
import { ColDef, IAggFunc } from "./entities/colDef";
>>>>>>> upstream/master
import { RowNode } from "./entities/rowNode";
import { Column } from "./entities/column";
import { IRowModel } from "./interfaces/iRowModel";
import { RangeSelection, AddRangeSelectionParams } from "./interfaces/iRangeController";
import { GridCell } from "./entities/gridCell";
import { IViewportDatasource } from "./interfaces/iViewportDatasource";
<<<<<<< HEAD
import { ICellRendererFunc, ICellRenderer } from "./rendering/cellRenderers/iCellRenderer";
import { ICellEditor } from "./rendering/cellEditors/iCellEditor";
=======
>>>>>>> upstream/master
export declare class GridApi {
    private csvCreator;
    private gridCore;
    private rowRenderer;
    private headerRenderer;
    private filterManager;
    private columnController;
    private selectionController;
    private gridOptionsWrapper;
    private gridPanel;
    private valueService;
    private masterSlaveService;
    private eventService;
    private floatingRowModel;
    private context;
    private rowModel;
    private sortController;
    private paginationController;
    private focusedCellController;
    private rangeController;
    private clipboardService;
<<<<<<< HEAD
=======
    private aggFuncService;
>>>>>>> upstream/master
    private menuFactory;
    private cellRendererFactory;
    private cellEditorFactory;
    private inMemoryRowModel;
    private init();
    /** Used internally by grid. Not intended to be used by the client. Interface may change between releases. */
    __getMasterSlaveService(): MasterSlaveService;
    getFirstRenderedRow(): number;
    getLastRenderedRow(): number;
    getDataAsCsv(params?: CsvExportParams): string;
    exportDataAsCsv(params?: CsvExportParams): void;
    setDatasource(datasource: any): void;
    setViewportDatasource(viewportDatasource: IViewportDatasource): void;
    setRowData(rowData: any[]): void;
    setFloatingTopRowData(rows: any[]): void;
    setFloatingBottomRowData(rows: any[]): void;
    setColumnDefs(colDefs: ColDef[]): void;
    refreshRows(rowNodes: RowNode[]): void;
    refreshCells(rowNodes: RowNode[], colIds: string[], animate?: boolean): void;
    rowDataChanged(rows: any): void;
    refreshView(): void;
    setFunctionsReadOnly(readOnly: boolean): void;
    softRefreshView(): void;
    refreshGroupRows(): void;
    refreshHeader(): void;
    isAnyFilterPresent(): boolean;
    isAdvancedFilterPresent(): boolean;
    isQuickFilterPresent(): boolean;
    getModel(): IRowModel;
    onGroupExpandedOrCollapsed(refreshFromIndex?: any): void;
<<<<<<< HEAD
=======
    refreshInMemoryRowModel(): any;
>>>>>>> upstream/master
    expandAll(): void;
    collapseAll(): void;
    addVirtualRowListener(eventName: string, rowIndex: number, callback: Function): void;
    addRenderedRowListener(eventName: string, rowIndex: number, callback: Function): void;
    setQuickFilter(newFilter: any): void;
    selectIndex(index: any, tryMulti: any, suppressEvents: any): void;
    deselectIndex(index: number, suppressEvents?: boolean): void;
    selectNode(node: RowNode, tryMulti?: boolean, suppressEvents?: boolean): void;
    deselectNode(node: RowNode, suppressEvents?: boolean): void;
    selectAll(): void;
    deselectAll(): void;
    recomputeAggregates(): void;
    sizeColumnsToFit(): void;
    showLoadingOverlay(): void;
    showNoRowsOverlay(): void;
    hideOverlay(): void;
    isNodeSelected(node: any): any;
    getSelectedNodesById(): {
        [nodeId: number]: RowNode;
    };
    getSelectedNodes(): RowNode[];
    getSelectedRows(): any[];
    getBestCostNodeSelection(): any;
    getRenderedNodes(): any[];
    ensureColIndexVisible(index: any): void;
    ensureColumnVisible(key: string | Column | ColDef): void;
    ensureIndexVisible(index: any): void;
    ensureNodeVisible(comparator: any): void;
    forEachLeafNode(callback: (rowNode: RowNode) => void): void;
    forEachNode(callback: (rowNode: RowNode) => void): void;
    forEachNodeAfterFilter(callback: (rowNode: RowNode) => void): void;
    forEachNodeAfterFilterAndSort(callback: (rowNode: RowNode) => void): void;
    getFilterApiForColDef(colDef: any): any;
    getFilterApi(key: string | Column | ColDef): any;
    destroyFilter(key: string | Column | ColDef): void;
    getColumnDef(key: string | Column | ColDef): ColDef;
    onFilterChanged(): void;
    setSortModel(sortModel: any): void;
    getSortModel(): {
        colId: string;
        sort: string;
    }[];
    setFilterModel(model: any): void;
    getFilterModel(): any;
    getFocusedCell(): GridCell;
    setFocusedCell(rowIndex: number, colKey: Column | ColDef | string, floating?: string): void;
    setHeaderHeight(headerHeight: number): void;
    showToolPanel(show: any): void;
    isToolPanelShowing(): boolean;
    doLayout(): void;
    getValue(colKey: string | ColDef | Column, rowNode: RowNode): any;
    addEventListener(eventType: string, listener: Function): void;
    addGlobalListener(listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
    removeGlobalListener(listener: Function): void;
    dispatchEvent(eventType: string, event?: any): void;
    destroy(): void;
    resetQuickFilter(): void;
    getRangeSelections(): RangeSelection[];
    addRangeSelection(rangeSelection: AddRangeSelectionParams): void;
    clearRangeSelection(): void;
    copySelectedRowsToClipboard(): void;
    copySelectedRangeToClipboard(): void;
    copySelectedRangeDown(): void;
    showColumnMenuAfterButtonClick(colKey: string | Column | ColDef, buttonElement: HTMLElement): void;
    showColumnMenuAfterMouseClick(colKey: string | Column | ColDef, mouseEvent: MouseEvent): void;
<<<<<<< HEAD
    addCellRenderer(key: string, cellRenderer: {
        new (): ICellRenderer;
    } | ICellRendererFunc): void;
    addCellEditor(key: string, cellEditor: {
        new (): ICellEditor;
    }): void;
=======
    stopEditing(cancel?: boolean): void;
    addAggFunc(key: string, aggFunc: IAggFunc): void;
    addAggFuncs(aggFuncs: {
        [key: string]: IAggFunc;
    }): void;
    clearAggFuncs(): void;
>>>>>>> upstream/master
}
