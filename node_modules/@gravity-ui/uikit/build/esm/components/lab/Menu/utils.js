import * as React from 'react';
export function isComponentType(component, type) {
    if (!React.isValidElement(component)) {
        return false;
    }
    if (typeof component.type === 'string') {
        return false;
    }
    return component.type.displayName === type;
}
//# sourceMappingURL=utils.js.map
