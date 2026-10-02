import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { getComponentName } from "../utils/getComponentName.js";
import { MobileContext } from "./MobileContext.js";
export function withPlatform(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);
    return class WithPlatformComponent extends React.Component {
        static displayName = `withPlatform(${componentName})`;
        static contextType = MobileContext;
        render() {
            return _jsx(WrappedComponent, { ...this.props, platform: this.context.platform });
        }
    };
}
//# sourceMappingURL=withPlatform.js.map
