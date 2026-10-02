"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withThemeValue = withThemeValue;
const jsx_runtime_1 = require("react/jsx-runtime");
const getComponentName_1 = require("../utils/getComponentName.js");
const useThemeValue_1 = require("./useThemeValue.js");
function withThemeValue(WrappedComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    const component = function WithThemeValueComponent(props) {
        const themeValue = (0, useThemeValue_1.useThemeValue)();
        return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...props, themeValue: themeValue });
    };
    component.displayName = `withThemeValue(${componentName})`;
    return component;
}
//# sourceMappingURL=withThemeValue.js.map
