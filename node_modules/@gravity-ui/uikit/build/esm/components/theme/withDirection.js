import { jsx as _jsx } from "react/jsx-runtime";
import { getComponentName } from "../utils/getComponentName.js";
import { useDirection } from "./useDirection.js";
export function withDirection(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);
    const component = function WithDirectionComponent(props) {
        const direction = useDirection();
        return _jsx(WrappedComponent, { ...props, direction: direction });
    };
    component.displayName = `withDirection(${componentName})`;
    return component;
}
//# sourceMappingURL=withDirection.js.map
