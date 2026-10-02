import * as React from 'react';
import type { QAProps } from "../../types.js";
import type { PopoverInstanceProps } from "./types.js";
import "./Popover.css";
/**
 * @deprecated
 */
export declare const Popover: React.ForwardRefExoticComponent<Pick<import("../../Popup/index.js").PopupProps, "anchorRef" | "placement" | "strategy" | "anchorElement"> & import("./types.js").PopoverExternalProps & import("./types.js").PopoverBehaviorProps & Partial<import("./types.js").PopoverDefaultProps> & QAProps & React.RefAttributes<PopoverInstanceProps>>;
