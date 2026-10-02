"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToaster = useToaster;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ToasterContext_1 = require("../Provider/ToasterContext.js");
function useToaster() {
    const toaster = React.useContext(ToasterContext_1.ToasterContext);
    if (toaster === null) {
        throw new Error('Toaster: `useToaster` hook is used out of context');
    }
    return React.useMemo(() => ({
        add: toaster.add.bind(toaster),
        remove: toaster.remove.bind(toaster),
        removeAll: toaster.removeAll.bind(toaster),
        update: toaster.update.bind(toaster),
        has: toaster.has.bind(toaster),
    }), [toaster]);
}
//# sourceMappingURL=useToaster.js.map
