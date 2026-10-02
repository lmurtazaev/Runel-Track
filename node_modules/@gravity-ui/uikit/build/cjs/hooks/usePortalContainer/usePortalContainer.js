"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePortalContainer = usePortalContainer;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const PortalProvider_1 = require("./PortalProvider.js");
function usePortalContainer() {
    const context = React.useContext(PortalProvider_1.PortalContext);
    let defaultContainer = null;
    if (typeof window === 'object') {
        defaultContainer = window.document.body;
    }
    return context.current ?? defaultContainer;
}
//# sourceMappingURL=usePortalContainer.js.map
