import * as React from 'react';
type Props = {
    placement: 'start' | 'end';
    children?: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};
export declare const AdditionalContent: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export {};
