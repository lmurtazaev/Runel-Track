import * as React from 'react';
import { KeyCode } from "../../constants.js";
export function createOnKeyDownHandler(callback) {
    return (event) => {
        if (callback &&
            [KeyCode.ENTER, KeyCode.SPACEBAR, KeyCode.SPACEBAR_OLD].includes(event.key)) {
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
export function useActionHandlers(callback) {
    const onKeyDown = React.useMemo(() => createOnKeyDownHandler(callback), [callback]);
    return { onKeyDown };
}
//# sourceMappingURL=useActionHandlers.js.map
