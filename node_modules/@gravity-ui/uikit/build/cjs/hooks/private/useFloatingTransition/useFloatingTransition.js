"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFloatingTransition = useFloatingTransition;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("@floating-ui/react");
const usePrevious_1 = require("../usePrevious/index.js");
function useFloatingTransition({ context, duration, onTransitionIn, onTransitionInComplete, onTransitionOut, onTransitionOutComplete, }) {
    const { isMounted, status } = (0, react_1.useTransitionStatus)(context, {
        duration,
    });
    const previousStatus = (0, usePrevious_1.usePrevious)(status);
    const openDuration = (typeof duration === 'number' ? duration : duration.open) ?? 0;
    const timerIdRef = React.useRef(null);
    React.useEffect(() => {
        if (status === 'open' && previousStatus === 'initial') {
            onTransitionIn?.();
            timerIdRef.current = setTimeout(() => {
                onTransitionInComplete?.();
                timerIdRef.current = null;
            }, openDuration);
        }
        if (status === 'close' && previousStatus === 'open') {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
                timerIdRef.current = null;
            }
            onTransitionOut?.();
        }
        if (status === 'unmounted' && previousStatus === 'close') {
            onTransitionOutComplete?.();
        }
    }, [
        status,
        previousStatus,
        openDuration,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    ]);
    React.useEffect(() => () => {
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    }, []);
    return { isMounted, status };
}
//# sourceMappingURL=useFloatingTransition.js.map
