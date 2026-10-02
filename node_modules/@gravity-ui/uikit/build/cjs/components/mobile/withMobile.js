"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMobile = withMobile;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const getComponentName_1 = require("../utils/getComponentName.js");
const MobileContext_1 = require("./MobileContext.js");
function withMobile(WrappedComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    return class WithMobileComponent extends React.Component {
        static displayName = `withMobile(${componentName})`;
        static contextType = MobileContext_1.MobileContext;
        render() {
            return ((0, jsx_runtime_1.jsx)(WrappedComponent, { ...this.props, mobile: this.context.mobile, platform: this.context.platform, useHistory: this.context.useHistory, useLocation: this.context.useLocation }));
        }
    };
}
//# sourceMappingURL=withMobile.js.map
