import { jsx as _jsx } from "react/jsx-runtime";
import { getComponentName } from "../utils/getComponentName.js";
import { useToaster } from "./hooks/useToaster.js";
export function withToaster() {
    return function (WrappedComponent) {
        function WithToaster(props) {
            const toaster = useToaster();
            return _jsx(WrappedComponent, { ...props, toaster: toaster });
        }
        WithToaster.displayName = `WithToaster(${getComponentName(WrappedComponent)})`;
        return WithToaster;
    };
}
//# sourceMappingURL=withToaster.js.map
