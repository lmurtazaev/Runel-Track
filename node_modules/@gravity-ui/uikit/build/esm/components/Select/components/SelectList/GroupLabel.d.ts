import type * as React from 'react';
import type { GroupTitleItem } from "../../utils.js";
type GroupLabelProps = {
    option: GroupTitleItem;
    renderOptionGroup?: (option: GroupTitleItem) => React.ReactElement;
};
export declare const GroupLabel: ({ option, renderOptionGroup }: GroupLabelProps) => import("react/jsx-runtime").JSX.Element;
export {};
