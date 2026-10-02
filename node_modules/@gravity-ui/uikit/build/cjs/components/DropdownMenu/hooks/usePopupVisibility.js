"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopupVisibility = usePopupVisibility;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const private_1 = require("../../../hooks/private/index.js");
function usePopupVisibility(visible, onChangeVisibility, disabled) {
    const [isPopupShown, setPopupShown] = (0, private_1.useConditionallyControlledState)(visible, onChangeVisibility, false);
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
