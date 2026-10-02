import * as React from 'react';
import { isFunction } from "../../../components/utils/typeCheckers.js";
export function useStateWithCallback(initialValue, callback) {
    const [state, setState] = React.useState(initialValue);
    const setWithCallback = React.useCallback((nextValue) => {
        if (isFunction(nextValue)) {
            setState((previousState) => {
                const newState = nextValue(previousState);
                callback?.(newState);
                return newState;
            });
        }
        else {
            callback?.(nextValue);
            setState(nextValue);
        }
    }, [callback]);
    return [state, setWithCallback];
}
//# sourceMappingURL=useStateWithCallback.js.map
