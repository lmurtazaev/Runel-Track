import * as React from 'react';
import { MobileContext } from "./MobileContext.js";
export function usePlatform() {
    return React.useContext(MobileContext).platform;
}
//# sourceMappingURL=usePlatform.js.map
