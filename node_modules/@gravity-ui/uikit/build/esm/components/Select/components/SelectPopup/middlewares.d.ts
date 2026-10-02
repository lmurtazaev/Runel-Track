import type { Middleware } from '@floating-ui/react';
import type { SelectPopupProps } from "./types.js";
export declare function sameWidthMiddleware(args: Pick<SelectPopupProps, 'width' | 'disablePortal' | 'virtualized'>): Middleware;
export declare function getMiddlewares(args: Pick<SelectPopupProps, 'width' | 'disablePortal' | 'virtualized'>): Middleware[];
