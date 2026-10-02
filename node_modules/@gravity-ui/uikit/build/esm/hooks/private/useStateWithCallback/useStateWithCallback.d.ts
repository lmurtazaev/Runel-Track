export declare function useStateWithCallback<T>(initialValue: T, callback?: (value: T) => void): [T, (nextValue: T | ((prevValue: T) => T)) => void];
