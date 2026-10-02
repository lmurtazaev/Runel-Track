"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDOMProps = filterDOMProps;
const DOMPropNames = new Set(['id']);
const labelablePropNames = new Set([
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-details',
]);
const propRe = /^(data-.*)$/;
function filterDOMProps(props, options = {}) {
    const { labelable, propNames } = options;
    const filteredProps = {};
    for (const prop in props) {
        if (Object.prototype.hasOwnProperty.call(props, prop) &&
            (DOMPropNames.has(prop) ||
                (labelable && labelablePropNames.has(prop)) ||
                propNames?.has(prop) ||
                propRe.test(prop))) {
            // @ts-expect-error
            filteredProps[prop] = props[prop];
        }
    }
    return filteredProps;
}
//# sourceMappingURL=filterDOMProps.js.map
