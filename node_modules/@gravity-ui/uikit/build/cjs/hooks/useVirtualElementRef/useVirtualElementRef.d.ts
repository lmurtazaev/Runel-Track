import * as React from 'react';
import type { VirtualElement } from '@floating-ui/react';
export type VirtualElementRect = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};
export interface UseVirtualElementRefProps {
    /**
     * Position of virtual element relative to viewport
     */
    rect?: VirtualElementRect | null;
    /**
     * DOM-context of virtual element
     */
    contextElement?: Element;
}
export type UseVirtualElementRefResult = React.MutableRefObject<VirtualElement>;
export declare function useVirtualElementRef(props?: UseVirtualElementRefProps): UseVirtualElementRefResult;
export declare function useVirtualElement(rect: VirtualElementRect): {
    anchor: VirtualElement;
    setContextElement: (node: HTMLDivElement | null) => void;
};
