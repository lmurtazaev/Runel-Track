import * as React from 'react';
export type LinksProps = {
    links: Array<{
        text: string;
        href: string;
        target?: '_self' | '_blank';
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    }>;
};
export declare const Links: ({ links }: LinksProps) => import("react/jsx-runtime").JSX.Element | null;
