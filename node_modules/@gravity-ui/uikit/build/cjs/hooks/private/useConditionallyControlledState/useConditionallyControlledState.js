"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConditionallyControlledState = useConditionallyControlledState;
const useStateWithCallback_1 = require("../useStateWithCallback/index.js");
function useConditionallyControlledState(property, setProperty, initialState, isControlled = property !== undefined && setProperty !== undefined) {
    const state = (0, useStateWithCallback_1.useStateWithCallback)((property || initialState), setProperty);
    if (isControlled) {
        return [property, setProperty];
    }
    return state;
}
//# sourceMappingURL=useConditionallyControlledState.js.map
