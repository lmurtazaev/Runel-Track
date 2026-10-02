"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnKeyDownHandler = createOnKeyDownHandler;
exports.useActionHandlers = useActionHandlers;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../constants.js");
function createOnKeyDownHandler(callback) {
    return (event) => {
        if (callback &&
            [constants_1.KeyCode.ENTER, constants_1.KeyCode.SPACEBAR, constants_1.KeyCode.SPACEBAR_OLD].includes(event.key)) {
            event.preventDefault();
            callback(event);
        }
    };
}
/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @returns {onKeyDown}
 */
function useActionHandlers(callback) {
    const onKeyDown = React.useMemo(() => createOnKeyDownHandler(callback), [callback]);
    return { onKeyDown };
}
//# sourceMappingURL=useActionHandlers.js.map
