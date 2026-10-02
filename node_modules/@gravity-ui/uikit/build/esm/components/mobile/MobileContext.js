'use client';
import * as React from 'react';
import { Platform } from "./constants.js";
const initialValue = {
    mobile: false,
    platform: Platform.BROWSER,
    useHistory: () => ({ action: '', replace() { }, push() { }, goBack() { } }),
    useLocation: () => ({ pathname: '', search: '', hash: '' }),
};
export const MobileContext = React.createContext(initialValue);
//# sourceMappingURL=MobileContext.js.map
