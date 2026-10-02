export interface ElementClass {
    block: string;
    element?: string;
    mod?: {
        key: string;
        value: string | boolean;
    };
}
export declare function parseClass(strClass: string): ElementClass;
export declare function formatClass(objClass: ElementClass): string;
