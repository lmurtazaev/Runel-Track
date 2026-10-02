"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComponentType = isComponentType;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function isComponentType(component, type) {
    if (!React.isValidElement(component)) {
        return false;
    }
    if (typeof component.type === 'string') {
        return false;
    }
    return component.type.displayName === type;
}
//# sourceMappingURL=utils.js.map
