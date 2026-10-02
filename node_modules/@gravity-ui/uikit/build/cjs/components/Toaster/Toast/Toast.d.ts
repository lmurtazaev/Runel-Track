import * as React from 'react';
import type { InternalToastProps } from "../types.js";
import "./Toast.css";
interface ToastInnerProps {
    removeCallback: (name: string) => void;
    mobile?: boolean;
}
interface ToastUnitedProps extends InternalToastProps, ToastInnerProps {
}
export declare const Toast: React.ForwardRefExoticComponent<Omit<ToastUnitedProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export {};
