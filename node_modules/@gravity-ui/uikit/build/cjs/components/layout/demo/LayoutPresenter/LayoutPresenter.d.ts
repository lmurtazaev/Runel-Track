import type * as React from 'react';
import type { LayoutTheme } from "../../index.js";
interface LayoutPresenterProps {
    children?: React.ReactNode;
    title?: string;
    theme?: LayoutTheme;
    fixBreakpoints?: boolean;
}
export declare const LayoutPresenter: ({ children, title, theme: config }: LayoutPresenterProps) => import("react/jsx-runtime").JSX.Element;
export {};
