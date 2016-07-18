<<<<<<< HEAD
// Type definitions for ag-grid v4.0.5
=======
// Type definitions for ag-grid v5.0.3
>>>>>>> upstream/master
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { ICellRenderer } from "./iCellRenderer";
import { Component } from "../../widgets/component";
export declare class AnimateSlideCellRenderer extends Component implements ICellRenderer {
    private static TEMPLATE;
    private params;
    private eCurrent;
    private ePrevious;
    private lastValue;
    private refreshCount;
    constructor();
    init(params: any): void;
    addSlideAnimation(): void;
    refresh(params: any): void;
}
