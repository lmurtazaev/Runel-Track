import * as React from 'react';
import type { TabPanelProps } from "../types.js";
export declare function useTabPanel(tabPanelProps: TabPanelProps): React.HTMLAttributes<HTMLDivElement> & {
    [key: `data-${string}`]: string | undefined;
};
