import type { FloatingContext, UseTransitionStatusProps } from '@floating-ui/react';
export interface UseFloatingTransitionProps {
    context: FloatingContext;
    duration: NonNullable<UseTransitionStatusProps['duration']>;
    onTransitionIn?: () => void;
    onTransitionInComplete?: () => void;
    onTransitionOut?: () => void;
    onTransitionOutComplete?: () => void;
}
export interface UseFloatingTransitionResult {
    isMounted: boolean;
    status: 'unmounted' | 'initial' | 'open' | 'close';
}
export declare function useFloatingTransition({ context, duration, onTransitionIn, onTransitionInComplete, onTransitionOut, onTransitionOutComplete, }: UseFloatingTransitionProps): UseFloatingTransitionResult;
