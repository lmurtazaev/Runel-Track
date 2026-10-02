import type { SelectProps } from "../../types.js";
import "./EmptyOptions.css";
type EmptyPlaceholderProps = {
    renderEmptyOptions?: SelectProps['renderEmptyOptions'];
    filter: string;
};
export declare const EmptyOptions: ({ renderEmptyOptions, filter }: EmptyPlaceholderProps) => import("react/jsx-runtime").JSX.Element;
export {};
