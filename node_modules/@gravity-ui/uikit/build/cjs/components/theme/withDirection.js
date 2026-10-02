"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDirection = withDirection;
const jsx_runtime_1 = require("react/jsx-runtime");
const getComponentName_1 = require("../utils/getComponentName.js");
const useDirection_1 = require("./useDirection.js");
function withDirection(WrappedComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    const component = function WithDirectionComponent(props) {
        const direction = (0, useDirection_1.useDirection)();
        return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...props, direction: direction });
    };
    component.displayName = `withDirection(${componentName})`;
    return component;
}
//# sourceMappingURL=withDirection.js.map
