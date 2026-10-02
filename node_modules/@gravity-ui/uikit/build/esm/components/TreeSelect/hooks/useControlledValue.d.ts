import * as React from 'react';
import type { ListItemId, ListStateHandler } from "../../useList/types.js";
type UseControlledValueProps = {
    value?: string[];
    defaultValue?: string[];
    onUpdate?(ids: ListItemId[]): void;
};
export declare const useControlledValue: ({ defaultValue, value: valueProps, onUpdate, }: UseControlledValueProps) => {
    value: string[];
    selectedById: Record<string, boolean>;
    setSelected: ListStateHandler<Record<string, boolean>>;
    /**
     * Available only if `uncontrolled` component valiant
     */
    setInnerValue: React.Dispatch<React.SetStateAction<string[]>> | undefined;
};
export {};
