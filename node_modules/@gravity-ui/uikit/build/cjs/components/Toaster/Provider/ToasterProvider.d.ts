import * as React from 'react';
import type { ToasterImplementation } from "../types.js";
type Props = React.PropsWithChildren<{
    toaster: ToasterImplementation;
}>;
export declare const ToasterProvider: {
    ({ toaster, children }: Props): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export {};
