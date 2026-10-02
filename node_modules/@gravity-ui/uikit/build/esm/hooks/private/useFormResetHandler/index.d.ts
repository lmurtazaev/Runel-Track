import type { UseFormResetHandlerParams } from "./types.js";
export declare function useFormResetHandler<T>({ initialValue, onReset, }: {
    initialValue: T;
    onReset: (value: T) => void;
}): (node: UseFormResetHandlerParams | null) => void;
