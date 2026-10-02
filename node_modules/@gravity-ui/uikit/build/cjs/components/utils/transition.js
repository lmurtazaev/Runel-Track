"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSSTransitionClassNames = getCSSTransitionClassNames;
const cn_1 = require("./cn.js");
function getCSSTransitionClassNames(b) {
    return {
        appear: (0, cn_1.modsClassName)(b({ appear: true })),
        appearActive: (0, cn_1.modsClassName)(b({ appear: 'active' })),
        appearDone: (0, cn_1.modsClassName)(b({ appear: 'done' })),
        enter: (0, cn_1.modsClassName)(b({ enter: true })),
        enterActive: (0, cn_1.modsClassName)(b({ enter: 'active' })),
        enterDone: (0, cn_1.modsClassName)(b({ enter: 'done' })),
        exit: (0, cn_1.modsClassName)(b({ exit: true })),
        exitActive: (0, cn_1.modsClassName)(b({ exit: 'active' })),
        exitDone: (0, cn_1.modsClassName)(b({ exit: 'done' })),
    };
}
//# sourceMappingURL=transition.js.map
