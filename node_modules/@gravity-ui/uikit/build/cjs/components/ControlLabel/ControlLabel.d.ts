import * as React from 'react';
import "./ControlLabel.css";
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export declare const ControlLabel: React.ForwardRefExoticComponent<{
    labelClassName?: string;
    title?: string;
    disabled?: boolean;
    size?: import("./types.js").Size;
    control: React.ReactElement;
} & {
    children?: React.ReactNode | undefined;
} & import("../index.js").DOMProps & import("../index.js").QAProps & React.RefAttributes<HTMLLabelElement>>;
