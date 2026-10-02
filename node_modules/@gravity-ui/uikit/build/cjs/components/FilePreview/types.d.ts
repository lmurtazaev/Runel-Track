import type { ActionTooltipProps } from "../ActionTooltip/index.js";
import type { ButtonButtonProps, ButtonLinkProps } from "../Button/index.js";
export declare const FILE_TYPES: readonly ["default", "image", "video", "code", "archive", "music", "audio", "text", "pdf", "table"];
export type FileType = (typeof FILE_TYPES)[number];
export type FilePreviewAction = {
    id?: string;
    icon: React.ReactNode;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    extraProps?: ButtonButtonProps | ButtonLinkProps;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'title' | 'children'>;
};
