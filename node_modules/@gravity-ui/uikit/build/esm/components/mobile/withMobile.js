import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { getComponentName } from "../utils/getComponentName.js";
import { MobileContext } from "./MobileContext.js";
export function withMobile(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);
    return class WithMobileComponent extends React.Component {
        static displayName = `withMobile(${componentName})`;
        static contextType = MobileContext;
        render() {
            return (_jsx(WrappedComponent, { ...this.props, mobile: this.context.mobile, platform: this.context.platform, useHistory: this.context.useHistory, useLocation: this.context.useLocation }));
        }
    };
}
//# sourceMappingURL=withMobile.js.map
