import * as React from 'react';
import type { TabListProps } from "../types.js";
export declare function useTabList(tabListProps: TabListProps): React.HTMLAttributes<HTMLDivElement> & {
    [key: `data-${string}`]: string | undefined;
};
