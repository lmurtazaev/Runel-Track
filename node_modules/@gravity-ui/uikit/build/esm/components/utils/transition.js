import { modsClassName } from "./cn.js";
export function getCSSTransitionClassNames(b) {
    return {
        appear: modsClassName(b({ appear: true })),
        appearActive: modsClassName(b({ appear: 'active' })),
        appearDone: modsClassName(b({ appear: 'done' })),
        enter: modsClassName(b({ enter: true })),
        enterActive: modsClassName(b({ enter: 'active' })),
        enterDone: modsClassName(b({ enter: 'done' })),
        exit: modsClassName(b({ exit: true })),
        exitActive: modsClassName(b({ exit: 'active' })),
        exitDone: modsClassName(b({ exit: 'done' })),
    };
}
//# sourceMappingURL=transition.js.map
