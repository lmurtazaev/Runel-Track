import * as React from 'react';
import { useConditionallyControlledState } from "../../../hooks/private/index.js";
export function usePopupVisibility(visible, onChangeVisibility, disabled) {
    const [isPopupShown, setPopupShown] = useConditionallyControlledState(visible, onChangeVisibility, false);
    const togglePopup = React.useCallback((open) => {
        setPopupShown((isShown) => {
            if (typeof open === 'boolean') {
                return open;
            }
            return !isShown;
        });
    }, [setPopupShown]);
    const closePopup = React.useCallback(() => {
        setPopupShown(false);
    }, [setPopupShown]);
    React.useEffect(() => {
        if (disabled && isPopupShown) {
            closePopup();
        }
    }, [closePopup, disabled, isPopupShown]);
    return {
        isPopupShown,
        togglePopup,
        closePopup,
    };
}
//# sourceMappingURL=usePopupVisibility.js.map
