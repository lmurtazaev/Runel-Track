import * as React from 'react';
import type { ActionsPanelItem } from "../../types.js";
export declare const useCollapseActions: (actions: ActionsPanelItem[], maxRowActions?: number) => {
    buttonActions: ActionsPanelItem[];
    dropdownItems: (import("../../../index.js").DropdownMenuItem | import("../../../index.js").DropdownMenuItem[])[];
    parentRef: React.RefObject<HTMLDivElement>;
    offset: number;
    visibilityMap: import("./types.js").VisibilityMap;
    showDropdown: boolean;
};
