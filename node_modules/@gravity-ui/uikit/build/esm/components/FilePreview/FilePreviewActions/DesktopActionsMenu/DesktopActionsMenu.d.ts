import type { FilePreviewAction } from "../../types.js";
import "./DesktopActionsMenu.css";
export interface DesktopActionsMenuProps {
    actions: FilePreviewAction[];
    hoverabelPanelClassName: string;
}
export declare const DesktopActionsMenu: ({ actions, hoverabelPanelClassName }: DesktopActionsMenuProps) => import("react/jsx-runtime").JSX.Element;
