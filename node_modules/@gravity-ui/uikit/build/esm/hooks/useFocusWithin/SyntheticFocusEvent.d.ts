export declare class SyntheticFocusEvent<Target = Element> implements React.FocusEvent<Target> {
    nativeEvent: FocusEvent;
    target: EventTarget & Target;
    currentTarget: EventTarget & Target;
    relatedTarget: Element;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    timeStamp: number;
    type: string;
    constructor(type: string, nativeEvent: FocusEvent, override?: Partial<Pick<FocusEvent, 'target' | 'currentTarget'>>);
    isDefaultPrevented(): boolean;
    preventDefault(): void;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
}
