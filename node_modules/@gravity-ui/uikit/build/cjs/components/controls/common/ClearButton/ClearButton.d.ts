import type * as React from 'react';
import type { ButtonSize } from "../../../Button/index.js";
import type { InputControlSize } from "../../types.js";
import "./ClearButton.css";
type Props = {
    size: ButtonSize;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};
export declare const mapTextInputSizeToButtonSize: (textInputSize: InputControlSize) => ButtonSize;
export declare const ClearButton: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
