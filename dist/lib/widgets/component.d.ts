// Type definitions for ag-grid v5.0.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { IEventEmitter } from "../interfaces/iEventEmitter";
<<<<<<< HEAD
export declare class Component implements IEventEmitter {
=======
import { Context } from "../context/context";
import { GridOptionsWrapper } from "../gridOptionsWrapper";
export declare class Component implements IEventEmitter {
    static EVENT_VISIBLE_CHANGED: string;
>>>>>>> upstream/master
    private eGui;
    private destroyFunctions;
    private localEventService;
    private childComponents;
<<<<<<< HEAD
    constructor(template?: string);
    setTemplate(template: string): void;
    addEventListener(eventType: string, listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
=======
    private annotatedEventListeners;
    private visible;
    constructor(template?: string);
    instantiate(context: Context): void;
    private instantiateRecurse(parentNode, context);
    private swapComponentForNode(newComponent, parentNode, childNode);
    private swapInComponentForQuerySelectors(newComponent, childNode);
    setTemplate(template: string): void;
    private wireQuerySelectors();
    private addAnnotatedEventListeners();
    private removeAnnotatedEventListeners();
    addEventListener(eventType: string, listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
    dispatchEventAsync(eventType: string, event?: any): void;
>>>>>>> upstream/master
    dispatchEvent(eventType: string, event?: any): void;
    getGui(): HTMLElement;
    protected queryForHtmlElement(cssSelector: string): HTMLElement;
    protected queryForHtmlInputElement(cssSelector: string): HTMLInputElement;
    appendChild(newChild: Node | Component): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    addOrRemoveCssClass(className: string, addOrRemove: boolean): void;
    destroy(): void;
<<<<<<< HEAD
    addGuiEventListener(event: string, listener: () => void): void;
    addDestroyableEventListener(eElement: HTMLElement | IEventEmitter, event: string, listener: (event?: any) => void): void;
=======
    addGuiEventListener(event: string, listener: (event: any) => void): void;
    addDestroyableEventListener(eElement: HTMLElement | IEventEmitter | GridOptionsWrapper, event: string, listener: (event?: any) => void): void;
>>>>>>> upstream/master
    addDestroyFunc(func: () => void): void;
    addCssClass(className: string): void;
    getAttribute(key: string): string;
}
