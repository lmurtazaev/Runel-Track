export type UseIntersectionProps = {
    element: Element | null;
    options?: IntersectionObserverInit;
    onIntersect?: () => void;
};
export declare const useIntersection: ({ element, options, onIntersect }: UseIntersectionProps) => void;
