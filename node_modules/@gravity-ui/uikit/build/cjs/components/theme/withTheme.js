"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTheme = withTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const getComponentName_1 = require("../utils/getComponentName.js");
const useTheme_1 = require("./useTheme.js");
function withTheme(WrappedComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    const component = function WithThemeComponent(props) {
        const theme = (0, useTheme_1.useTheme)();
        return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...props, theme: theme });
    };
    component.displayName = `withTheme(${componentName})`;
    return component;
}
//# sourceMappingURL=withTheme.js.map
