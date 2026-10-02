import type { FilePreviewAction } from "../../types.js";
import "./MobileActionsMenu.css";
export interface MobileActionsMenuProps {
    actions: FilePreviewAction[];
    fileName: string;
    isCustomImage?: boolean;
}
export declare const MobileActionsMenu: ({ actions, fileName, isCustomImage }: MobileActionsMenuProps) => import("react/jsx-runtime").JSX.Element;
