import * as React from 'react';
export function useFormResetHandler({ initialValue, onReset, }) {
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
