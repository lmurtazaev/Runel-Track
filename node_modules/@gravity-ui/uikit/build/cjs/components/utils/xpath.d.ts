import type { ElementClass } from "./class-transform.js";
export interface ElementClassWithInfo extends ElementClass {
    tag: string;
}
export type XpathClassConverter = (parsedClass: ElementClassWithInfo, strClass: string) => ElementClass | undefined;
export type XpathIdConverter = (id: string) => string | undefined;
export interface XpathOptions {
    /** Function for converting and filtering classes */
    classConverter?: XpathClassConverter;
    /** Function for converting and filtering ids */
    idConverter?: XpathIdConverter;
    /** Flag for managing replaces from tag[@class='...'] to tag[@id='...'] if id is exist */
    withoutId?: boolean;
}
export declare function withoutClassMods(converter?: XpathClassConverter): XpathClassConverter;
export declare function getXpath(event: React.SyntheticEvent, options?: XpathOptions): {
    xpath: string;
    hash: string;
};
