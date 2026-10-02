import type { InternalToastProps, ToastProps, ToasterImplementation } from "./types.js";
export declare class Toaster implements ToasterImplementation {
    /** We were tried to notify about toaster changes, but no one were listened */
    private hasUndelivered;
    private toasts;
    private eventEmitter;
    destroy(): void;
    add(toast: ToastProps): void;
    remove(name: string): void;
    removeAll(): void;
    update(name: string, overrideOptions: Partial<ToastProps>): void;
    has(name: string): boolean;
    subscribe(listener: (toasts: InternalToastProps[]) => void): () => void;
    private notify;
}
