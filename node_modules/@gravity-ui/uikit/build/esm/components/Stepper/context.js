'use client';
import * as React from 'react';
export const StepperContext = React.createContext({
    size: 'm',
    onUpdate: undefined,
    value: undefined,
});
export const useStepperContext = () => {
    const data = React.useContext(StepperContext);
    return data;
};
//# sourceMappingURL=context.js.map
