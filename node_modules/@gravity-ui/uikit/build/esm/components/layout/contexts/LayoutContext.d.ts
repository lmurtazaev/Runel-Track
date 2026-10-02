import * as React from 'react';
import type { LayoutTheme, MediaType } from "../types.js";
interface LayoutContextProps {
    theme: LayoutTheme;
    activeMediaQuery: MediaType;
    fixBreakpoints: boolean;
}
export declare const LayoutContext: React.Context<LayoutContextProps>;
export {};
