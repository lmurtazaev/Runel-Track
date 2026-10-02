import type { BreadcrumbsProps } from "./Breadcrumbs.js";
interface Props extends Pick<BreadcrumbsProps, 'popupPlacement' | 'popupStyle' | 'items'> {
}
export declare function BreadcrumbsMore({ popupStyle, popupPlacement, items }: Props): import("react/jsx-runtime").JSX.Element;
export declare namespace BreadcrumbsMore {
    var displayName: string;
}
export {};
