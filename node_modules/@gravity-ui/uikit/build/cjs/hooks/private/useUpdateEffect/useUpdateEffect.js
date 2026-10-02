"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateEffect = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useUpdateEffect = (effect, deps) => {
    const isInitial = React.useRef(true);
    React.useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }
        effect();
    }, deps);
};
exports.useUpdateEffect = useUpdateEffect;
//# sourceMappingURL=useUpdateEffect.js.map
