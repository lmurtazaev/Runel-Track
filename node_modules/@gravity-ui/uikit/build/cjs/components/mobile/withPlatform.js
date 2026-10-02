"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPlatform = withPlatform;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const getComponentName_1 = require("../utils/getComponentName.js");
const MobileContext_1 = require("./MobileContext.js");
function withPlatform(WrappedComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    return class WithPlatformComponent extends React.Component {
        static displayName = `withPlatform(${componentName})`;
        static contextType = MobileContext_1.MobileContext;
        render() {
            return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...this.props, platform: this.context.platform });
        }
    };
}
//# sourceMappingURL=withPlatform.js.map
