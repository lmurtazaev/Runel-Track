"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withToaster = withToaster;
const jsx_runtime_1 = require("react/jsx-runtime");
const getComponentName_1 = require("../utils/getComponentName.js");
const useToaster_1 = require("./hooks/useToaster.js");
function withToaster() {
    return function (WrappedComponent) {
        function WithToaster(props) {
            const toaster = (0, useToaster_1.useToaster)();
            return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...props, toaster: toaster });
        }
        WithToaster.displayName = `WithToaster(${(0, getComponentName_1.getComponentName)(WrappedComponent)})`;
        return WithToaster;
    };
}
//# sourceMappingURL=withToaster.js.map
