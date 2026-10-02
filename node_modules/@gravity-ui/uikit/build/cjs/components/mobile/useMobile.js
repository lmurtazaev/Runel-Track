"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobile = useMobile;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const MobileContext_1 = require("./MobileContext.js");
function useMobile() {
    return React.useContext(MobileContext_1.MobileContext).mobile;
}
//# sourceMappingURL=useMobile.js.map
