import { hasToast } from "./hasToast.js";
export function removeToast(toasts, name) {
    if (!hasToast(toasts, name)) {
        return toasts;
    }
    return toasts.filter((toast) => toast.name !== name);
}
//# sourceMappingURL=removeToast.js.map
