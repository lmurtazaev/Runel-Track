export type UseTimeoutProps = Parameters<(callback: VoidFunction, ms: number | null | undefined) => void>;
export declare function useTimeout(callback: VoidFunction, ms: number | null | undefined): void;
