'use client';
import * as React from 'react';
import { DEFAULT_LAYOUT_THEME } from "../constants.js";
export const LayoutContext = React.createContext({
    theme: DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
    fixBreakpoints: false,
});
//# sourceMappingURL=LayoutContext.js.map
