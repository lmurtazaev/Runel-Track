import * as React from 'react';
export interface BreadcrumbsItemInnerProps {
    __disabled?: boolean;
    __onAction?: () => void;
    __current?: boolean;
    __index?: number;
}
export interface BreadcrumbsItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    disabled?: boolean;
    children?: React.ReactNode;
}
declare const _BreadcrumbsItem: React.ForwardRefExoticComponent<BreadcrumbsItemProps & React.RefAttributes<HTMLAnchorElement>>;
export { _BreadcrumbsItem as BreadcrumbsItem };
