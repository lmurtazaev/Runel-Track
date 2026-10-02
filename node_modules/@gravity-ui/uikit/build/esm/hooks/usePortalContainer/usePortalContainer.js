import * as React from 'react';
import { PortalContext } from "./PortalProvider.js";
export function usePortalContainer() {
    const context = React.useContext(PortalContext);
    let defaultContainer = null;
    if (typeof window === 'object') {
        defaultContainer = window.document.body;
    }
    return context.current ?? defaultContainer;
}
//# sourceMappingURL=usePortalContainer.js.map
