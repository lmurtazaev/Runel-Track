"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = useElementSize;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const round_1 = tslib_1.__importDefault(require("lodash/round.js"));
const throttle_1 = tslib_1.__importDefault(require("lodash/throttle.js"));
const __1 = require("../../index.js");
const RESIZE_THROTTLE = 16;
const ROUND_PRECISION = 2;
function useElementSize(ref, 
// can be used, when it is needed to force reassign observer to element
// in order to get correct measures. might be related to below
// https://github.com/WICG/resize-observer/issues/65
key) {
    const [size, setSize] = React.useState({
        width: 0,
        height: 0,
    });
    (0, __1.useLayoutEffect)(() => {
        const element = ref?.current;
        if (!element) {
            return undefined;
        }
        setSize({
            width: (0, round_1.default)(element.offsetWidth, ROUND_PRECISION),
            height: (0, round_1.default)(element.offsetHeight, ROUND_PRECISION),
        });
        const handleResize = (entries) => {
            if (!Array.isArray(entries)) {
                return;
            }
            const entry = entries[0];
            if (entry.borderBoxSize) {
                const borderBoxSize = entry.borderBoxSize[0]
                    ? entry.borderBoxSize[0]
                    : entry.borderBoxSize;
                // ...but old versions of Firefox treat it as a single item
                // https://github.com/mdn/dom-examples/blob/main/resize-observer/resize-observer-text.html#L88
                setSize({
                    width: (0, round_1.default)(borderBoxSize.inlineSize, ROUND_PRECISION),
                    height: (0, round_1.default)(borderBoxSize.blockSize, ROUND_PRECISION),
                });
            }
            else {
                const target = entry.target;
                setSize({
                    width: (0, round_1.default)(target.offsetWidth, ROUND_PRECISION),
                    height: (0, round_1.default)(target.offsetHeight, ROUND_PRECISION),
                });
            }
        };
        const observer = new ResizeObserver((0, throttle_1.default)(handleResize, RESIZE_THROTTLE));
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [ref, key]);
    return size;
}
//# sourceMappingURL=useElementSize.js.map
