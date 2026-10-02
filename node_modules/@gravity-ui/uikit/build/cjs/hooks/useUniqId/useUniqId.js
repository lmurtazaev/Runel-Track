"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUniqId = void 0;
const tslib_1 = require("tslib");
// webpack checks that namespace import (* as React) has useId
// eslint-disable-next-line no-restricted-syntax
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../components/utils/cn.js");
const common_1 = require("../../components/utils/common.js");
function useUniqIdFallback() {
    const idRef = react_1.default.useRef();
    if (idRef.current === undefined) {
        idRef.current = (0, common_1.getUniqId)();
    }
    return idRef.current;
}
function useIdNative() {
    // eslint-disable-next-line no-restricted-syntax
    return `${cn_1.NAMESPACE}${react_1.default.useId()}`;
}
exports.useUniqId = 
// eslint-disable-next-line no-restricted-syntax
typeof react_1.default.useId === 'function' ? useIdNative : useUniqIdFallback;
//# sourceMappingURL=useUniqId.js.map
