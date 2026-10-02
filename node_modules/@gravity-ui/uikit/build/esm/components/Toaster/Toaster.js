import { EventEmitter } from "../../utils/EventEmitter/index.js";
import { getToastIndex } from "./utilities/getToastIndex.js";
import { hasToast } from "./utilities/hasToast.js";
import { removeToast } from "./utilities/removeToast.js";
export class Toaster {
    /** We were tried to notify about toaster changes, but no one were listened */
    hasUndelivered = false;
    toasts = [];
    eventEmitter = new EventEmitter();
    destroy() {
        this.removeAll();
        this.eventEmitter.destroy();
    }
    add(toast) {
        let nextToasts = this.toasts;
        if (hasToast(nextToasts, toast.name)) {
            nextToasts = removeToast(nextToasts, toast.name);
        }
        this.toasts = [
            ...nextToasts,
            {
                ...toast,
                addedAt: Date.now(),
                ref: { current: null },
            },
        ];
        this.notify();
    }
    remove(name) {
        this.toasts = removeToast(this.toasts, name);
        this.notify();
    }
    removeAll() {
        this.toasts = [];
        this.notify();
    }
    update(name, overrideOptions) {
        if (!hasToast(this.toasts, name)) {
            return;
        }
        const index = getToastIndex(this.toasts, name);
        this.toasts = [
            ...this.toasts.slice(0, index),
            {
                ...this.toasts[index],
                ...overrideOptions,
            },
            ...this.toasts.slice(index + 1),
        ];
        this.notify();
    }
    has(name) {
        return hasToast(this.toasts, name);
    }
    subscribe(listener) {
        const unsubscribe = this.eventEmitter.subscribe('toasts-change', listener);
        if (this.hasUndelivered) {
            this.notify();
        }
        return unsubscribe;
    }
    notify() {
        const isDelivered = this.eventEmitter.notify('toasts-change', [this.toasts]);
        this.hasUndelivered = !isDelivered;
    }
}
//# sourceMappingURL=Toaster.js.map
