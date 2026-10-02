import * as React from 'react';
export function useBoolean(initialState) {
    const [value, setValue] = React.useState(initialState);
    return [
        value,
        React.useCallback(() => setValue(true), []),
        React.useCallback(() => setValue(false), []),
        React.useCallback(() => setValue((val) => !val), []),
    ];
}
//# sourceMappingURL=useBoolean.js.map
