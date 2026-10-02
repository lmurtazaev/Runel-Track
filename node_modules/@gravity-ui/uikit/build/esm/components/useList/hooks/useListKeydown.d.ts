import * as React from 'react';
import type { ListOnItemClick, UseListResult } from "../types.js";
interface UseListKeydownProps<T = unknown> {
    onItemClick?: ListOnItemClick;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    enabled?: boolean;
    list: UseListResult<T>;
}
export declare const useListKeydown: ({ containerRef, onItemClick, enabled, list }: UseListKeydownProps) => void;
export {};
