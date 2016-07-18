// Type definitions for ag-grid v5.0.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { RenderedCell } from "./renderedCell";
import { RowNode } from "../entities/rowNode";
import { RowRenderer } from "./rowRenderer";
import { Column } from "../entities/column";
import { GridCell } from "../entities/gridCell";
export declare class RenderedRow {
    static EVENT_RENDERED_ROW_REMOVED: string;
    private gridOptionsWrapper;
    private columnController;
    private $compile;
    private mainEventService;
    private context;
    private focusedCellController;
    private cellRendererService;
    ePinnedLeftRow: HTMLElement;
    ePinnedRightRow: HTMLElement;
    eBodyRow: HTMLElement;
    private eLeftCenterAndRightRows;
    private renderedCells;
    private scope;
    private rowNode;
    private rowIndex;
    private rowIsHeaderThatSpans;
    private parentScope;
    private rowRenderer;
    private eBodyContainer;
    private ePinnedLeftContainer;
    private ePinnedRightContainer;
    private eGroupRow;
    private eGroupRowPaddingCentre;
    private eGroupRowPaddingRight;
    private destroyFunctions;
    private renderedRowEventService;
<<<<<<< HEAD
=======
    private initialised;
>>>>>>> upstream/master
    constructor(parentScope: any, rowRenderer: RowRenderer, eBodyContainer: HTMLElement, ePinnedLeftContainer: HTMLElement, ePinnedRightContainer: HTMLElement, node: RowNode, rowIndex: number);
    init(): void;
    private angular1Compile();
    private addColumnListener();
    private onDisplayedColumnsChanged(event);
    private onVirtualColumnsChanged(event);
    private onGridColumnsChanged();
    private refreshCellsIntoRow();
    private removeRenderedCells(colIds);
    private ensureCellInCorrectRow(renderedCell);
    private getOrCreateCell(column);
    private addRowSelectedListener();
    private addHoverFunctionality();
    private addHoverClass(hover);
    private addCellFocusedListener();
<<<<<<< HEAD
    private forEachRenderedCell(callback);
=======
    forEachRenderedCell(callback: (renderedCell: RenderedCell) => void): void;
>>>>>>> upstream/master
    private addNodeDataChangedListener();
    private createContainers();
    private attachContainers();
    onMouseEvent(eventName: string, mouseEvent: MouseEvent, eventSource: HTMLElement, cell: GridCell): void;
    private setTopAndHeightCss();
    private addRowIds();
    addEventListener(eventType: string, listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
    getRenderedCellForColumn(column: Column): RenderedCell;
    getCellForCol(column: Column): HTMLElement;
    destroy(): void;
    private destroyScope();
    isDataInList(rows: any[]): boolean;
    isGroup(): boolean;
    private refreshGroupRow();
    private createGroupSpanningEntireRowCell(padding);
    private createChildScopeOrNull(data);
    private addDynamicStyles();
    private createParams();
    private createEvent(event, eventSource);
    private createRowContainer();
    onRowClicked(event: MouseEvent): void;
    getRowNode(): any;
    getRowIndex(): any;
    refreshCells(colIds: string[], animate: boolean): void;
    private addDynamicClasses();
}
