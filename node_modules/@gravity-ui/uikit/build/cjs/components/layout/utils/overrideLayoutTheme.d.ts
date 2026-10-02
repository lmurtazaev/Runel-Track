import type { LayoutTheme, RecursivePartial } from "../types.js";
interface OverrideLayoutThemeOptions {
    theme: LayoutTheme;
    override?: RecursivePartial<LayoutTheme>;
}
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export declare function overrideLayoutTheme({ theme, override }: OverrideLayoutThemeOptions): LayoutTheme;
export {};
