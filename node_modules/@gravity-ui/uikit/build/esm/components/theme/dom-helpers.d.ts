import type { Direction, RealTheme } from "./types.js";
export declare function updateBodyClassName({ theme, className, prevClassName, }: {
    theme: RealTheme;
    className?: string;
    prevClassName?: string;
}): void;
export declare function updateBodyDirection(direction: Direction): void;
export declare const supportsMatchMedia: boolean;
export declare const getDarkMediaMatch: () => MediaQueryList;
export declare function getSystemTheme(): "light" | "dark";
