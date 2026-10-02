import { KeyCode } from "../../constants.js";
import { useFocusWithin } from "../../hooks/useFocusWithin/useFocusWithin.js";
import { useDirection } from "../theme/useDirection.js";
export function usePaletteGrid(props) {
    const direction = useDirection();
    const { focusWithinProps } = useFocusWithin({
        onFocusWithin: (event) => props.onFocus?.(event),
        onBlurWithin: (event) => props.onBlur?.(event),
    });
    const whenFocused = props.whenFocused;
    const base = {
        role: 'grid',
        'aria-disabled': props.disabled,
        'aria-readonly': props.disabled,
        tabIndex: whenFocused ? -1 : 0,
        ...focusWithinProps,
    };
    if (!whenFocused) {
        return base;
    }
    return {
        ...base,
        onKeyDown: (event) => {
            if (event.code === KeyCode.ARROW_RIGHT) {
                event.preventDefault();
                if (direction === 'ltr') {
                    whenFocused.nextItem();
                }
                else {
                    whenFocused.previousItem();
                }
            }
            else if (event.code === KeyCode.ARROW_LEFT) {
                event.preventDefault();
                if (direction === 'ltr') {
                    whenFocused.previousItem();
                }
                else {
                    whenFocused.nextItem();
                }
            }
            else if (event.code === KeyCode.ARROW_DOWN) {
                event.preventDefault();
                whenFocused.nextRow();
            }
            else if (event.code === KeyCode.ARROW_UP) {
                event.preventDefault();
                whenFocused.previousRow();
            }
            else if (event.code === KeyCode.SPACE || event.code === KeyCode.ENTER) {
                event.preventDefault();
                whenFocused.selectItem();
            }
        },
    };
}
//# sourceMappingURL=hooks.js.map
