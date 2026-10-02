import type { UseSelectProps, UseSelectResult } from "./types.js";
export declare const useSelect: <T extends unknown>({ defaultOpen, onClose, onOpenChange, open, value: valueProps, defaultValue, multiple, onUpdate, disabled, }: UseSelectProps) => UseSelectResult<T>;
