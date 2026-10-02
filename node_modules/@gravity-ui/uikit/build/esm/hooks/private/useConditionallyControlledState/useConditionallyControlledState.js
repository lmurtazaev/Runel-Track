import { useStateWithCallback } from "../useStateWithCallback/index.js";
export function useConditionallyControlledState(property, setProperty, initialState, isControlled = property !== undefined && setProperty !== undefined) {
    const state = useStateWithCallback((property || initialState), setProperty);
    if (isControlled) {
        return [property, setProperty];
    }
    return state;
}
//# sourceMappingURL=useConditionallyControlledState.js.map
