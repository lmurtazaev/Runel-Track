import * as React from 'react';
import type { ButtonButtonProps } from "../Button/index.js";
import type { SVGIconData } from "../Icon/types.js";
import type { StepperItemView } from "./types.js";
export type StepperItemProps = Omit<ButtonButtonProps, 'view'> & {
    id?: string | number;
    children: React.ReactNode;
    view?: StepperItemView;
    disabled?: boolean;
    icon?: SVGIconData;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
};
export declare const StepperItem: React.ForwardRefExoticComponent<Omit<ButtonButtonProps, "view"> & {
    id?: string | number;
    children: React.ReactNode;
    view?: StepperItemView;
    disabled?: boolean;
    icon?: SVGIconData;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
} & React.RefAttributes<HTMLButtonElement>>;
