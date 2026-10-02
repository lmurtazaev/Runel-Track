export type UseConditionallyControlledStateResult<T extends unknown> = [
    T,
    React.Dispatch<React.SetStateAction<T>>
];
export declare function useConditionallyControlledState<T>(property?: T, setProperty?: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void), initialState?: T | (() => T), isControlled?: boolean): UseConditionallyControlledStateResult<T>;
