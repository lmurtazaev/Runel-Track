import type { InternalToastProps } from "../types.js";
import "./ToastAnimation.css";
import "./ToastList.css";
type ToastListProps = {
    removeCallback: (name: string) => void;
    toasts: InternalToastProps[];
    mobile?: boolean;
};
export declare function ToastList(props: ToastListProps): import("react/jsx-runtime").JSX.Element;
export {};
