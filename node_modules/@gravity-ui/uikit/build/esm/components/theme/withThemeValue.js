import { jsx as _jsx } from "react/jsx-runtime";
import { getComponentName } from "../utils/getComponentName.js";
import { useThemeValue } from "./useThemeValue.js";
export function withThemeValue(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);
    const component = function WithThemeValueComponent(props) {
        const themeValue = useThemeValue();
        return _jsx(WrappedComponent, { ...props, themeValue: themeValue });
    };
    component.displayName = `withThemeValue(${componentName})`;
    return component;
}
//# sourceMappingURL=withThemeValue.js.map
