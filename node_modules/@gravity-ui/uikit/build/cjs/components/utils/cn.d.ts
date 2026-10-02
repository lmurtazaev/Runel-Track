export type CnMods = Record<string, string | boolean | undefined>;
export declare const NAMESPACE = "g-";
export declare const cn: import("@bem-react/classname").ClassNameInitilizer;
export declare const block: import("@bem-react/classname").ClassNameInitilizer;
export type CnBlock = ReturnType<typeof cn>;
/**
 * Extracts modifiers part from className
 */
export declare function modsClassName(className: string): string;
