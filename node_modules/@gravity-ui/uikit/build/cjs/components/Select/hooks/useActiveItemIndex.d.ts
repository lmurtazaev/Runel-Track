import * as React from 'react';
import type { FlattenOption } from "../utils.js";
export declare function useActiveItemIndex({ options, value, open, }: {
    options: FlattenOption[];
    open: boolean;
    value: string[];
}): readonly [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>];
