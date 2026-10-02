"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateWithCallback = useStateWithCallback;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const typeCheckers_1 = require("../../../components/utils/typeCheckers.js");
function useStateWithCallback(initialValue, callback) {
    const [state, setState] = React.useState(initialValue);
    const setWithCallback = React.useCallback((nextValue) => {
        if ((0, typeCheckers_1.isFunction)(nextValue)) {
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
