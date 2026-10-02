import type { RealTheme } from "./types.js";
interface RootMods {
    theme?: RealTheme;
}
export declare function getRootClassName({ theme }?: RootMods, className?: string): string;
export {};
