"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlatform = usePlatform;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const MobileContext_1 = require("./MobileContext.js");
function usePlatform() {
    return React.useContext(MobileContext_1.MobileContext).platform;
}
//# sourceMappingURL=usePlatform.js.map
