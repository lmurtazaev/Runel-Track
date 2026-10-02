import { jsx as _jsx } from "react/jsx-runtime";
import { getComponentName } from "../utils/getComponentName.js";
import { useTheme } from "./useTheme.js";
export function withTheme(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);
    const component = function WithThemeComponent(props) {
        const theme = useTheme();
        return _jsx(WrappedComponent, { ...props, theme: theme });
    };
    component.displayName = `withTheme(${componentName})`;
    return component;
}
//# sourceMappingURL=withTheme.js.map
