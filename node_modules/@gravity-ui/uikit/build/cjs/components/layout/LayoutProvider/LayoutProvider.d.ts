import * as React from 'react';
import type { LayoutTheme, MediaType, RecursivePartial } from "../types.js";
export interface PrivateLayoutProviderProps {
    config?: RecursivePartial<LayoutTheme>;
    /**
     * During ssr you can override default (`s`) media screen size if needed
     */
    initialMediaQuery?: MediaType;
    /**
     * Fixes "s" media breakpoint behaviour with introducing "xs" media.
     * Will be default in the next major release.
     */
    fixBreakpoints?: boolean;
    children: React.ReactNode;
}
export declare function PrivateLayoutProvider({ children, config: override, initialMediaQuery, fixBreakpoints, }: PrivateLayoutProviderProps): import("react/jsx-runtime").JSX.Element;
