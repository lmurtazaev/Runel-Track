import type { DropdownMenuItem } from "../../../DropdownMenu/index.js";
import type { ActionsPanelItem } from "../../types.js";
import type { VisibilityMap } from "./types.js";
type UseDropdownActionsArg = {
    buttonActions: ActionsPanelItem[];
    restActions: ActionsPanelItem[];
    visibilityMap: VisibilityMap;
};
export declare const useDropdownActions: ({ buttonActions, restActions, visibilityMap, }: UseDropdownActionsArg) => (DropdownMenuItem | DropdownMenuItem[])[];
export {};
