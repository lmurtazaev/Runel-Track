import * as React from 'react';
export interface TabContextProps {
    id: string;
    value?: string;
    onUpdate?: (value: string) => void;
    isFocused?: boolean;
    isProvider?: boolean;
}
export declare const TabContext: React.Context<TabContextProps | undefined>;
