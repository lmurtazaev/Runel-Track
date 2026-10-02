import * as React from 'react';
import { useTransitionStatus } from '@floating-ui/react';
import { usePrevious } from "../usePrevious/index.js";
export function useFloatingTransition({ context, duration, onTransitionIn, onTransitionInComplete, onTransitionOut, onTransitionOutComplete, }) {
    const { isMounted, status } = useTransitionStatus(context, {
        duration,
    });
    const previousStatus = usePrevious(status);
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
