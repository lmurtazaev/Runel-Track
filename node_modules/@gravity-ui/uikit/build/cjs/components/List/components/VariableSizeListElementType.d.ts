import * as React from 'react';
export interface VariableSizeListElementTypeProps {
    role: string;
    listId: string;
}
export declare const VariableSizeListElementType: React.ForwardRefExoticComponent<VariableSizeListElementTypeProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const createVariableSizeListElementType: (role: string, listId: string) => React.ForwardRefExoticComponent<VariableSizeListElementTypeProps & React.RefAttributes<HTMLDivElement>>;
