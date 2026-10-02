type SetTrue = () => void;
type SetFalse = () => void;
type Toggle = () => void;
export type UseBooleanResult = [boolean, SetTrue, SetFalse, Toggle];
export declare function useBoolean(initialState: boolean | (() => boolean)): [boolean, SetTrue, SetFalse, Toggle];
export {};
