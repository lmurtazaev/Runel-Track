import type { ActionsPanelItem } from "../types.js";
import "./CollapseActions.css";
type Props = {
    actions: ActionsPanelItem[];
    maxRowActions?: number;
};
export declare const CollapseActions: ({ actions, maxRowActions }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
