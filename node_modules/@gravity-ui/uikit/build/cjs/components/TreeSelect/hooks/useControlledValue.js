"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useControlledValue = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const prepareParams = (selectedById) => Object.entries(selectedById).reduce((acc, [id, value]) => {
    if (value) {
        acc.push(id);
    }
    return acc;
}, []);
const useControlledValue = ({ defaultValue = [], value: valueProps, onUpdate, }) => {
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const value = valueProps ?? innerValue;
    const uncontrolled = !valueProps;
    const result = React.useMemo(() => {
        const selectedById = value.reduce((acc, val) => {
            acc[val] = true;
            return acc;
        }, {});
        const setSelected = (payload) => {
            const nextValue = typeof payload === 'function' ? payload(selectedById) : payload;
            const preparedValue = prepareParams(nextValue);
            if (uncontrolled) {
                setInnerValue(preparedValue);
            }
            else {
                onUpdate?.(preparedValue);
            }
        };
        return {
            value,
            selectedById,
            setSelected,
            /**
             * Available only if `uncontrolled` component valiant
             */
            setInnerValue: uncontrolled ? setInnerValue : undefined,
        };
    }, [onUpdate, uncontrolled, value]);
    return result;
};
exports.useControlledValue = useControlledValue;
//# sourceMappingURL=useControlledValue.js.map
