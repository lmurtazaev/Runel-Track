"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInToasterContext = useInToasterContext;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ToasterContext_1 = require("../Provider/ToasterContext.js");
function useInToasterContext() {
    return React.useContext(ToasterContext_1.ToasterContext) !== null;
}
//# sourceMappingURL=useInToasterContext.js.map
