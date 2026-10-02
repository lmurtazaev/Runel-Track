import type { FilePreviewAction } from "../types.js";
export interface FilePreviewActionsProps {
    hoverabelPanelClassName: string;
    fileName: string;
    isCustomImage?: boolean;
    actions: FilePreviewAction[];
}
export declare const FilePreviewActions: ({ actions, fileName, hoverabelPanelClassName, isCustomImage, }: FilePreviewActionsProps) => import("react/jsx-runtime").JSX.Element;
