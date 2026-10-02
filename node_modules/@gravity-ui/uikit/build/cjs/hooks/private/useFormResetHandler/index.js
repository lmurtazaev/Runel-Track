"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormResetHandler = useFormResetHandler;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useFormResetHandler({ initialValue, onReset, }) {
    const [formElement, setFormElement] = React.useState(null);
    const resetValue = React.useRef(initialValue);
    React.useEffect(() => {
        if (!formElement) {
            return undefined;
        }
        const handleReset = () => {
            onReset(resetValue.current);
        };
        formElement.addEventListener('reset', handleReset);
        return () => {
            formElement.removeEventListener('reset', handleReset);
        };
    }, [formElement, onReset]);
    const ref = React.useCallback((node) => {
        setFormElement(node?.form ?? null);
    }, []);
    return ref;
}
//# sourceMappingURL=index.js.map
