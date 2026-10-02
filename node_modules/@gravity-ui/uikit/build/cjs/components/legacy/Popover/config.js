"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayByBehavior = exports.PopoverBehavior = void 0;
var PopoverBehavior;
(function (PopoverBehavior) {
    PopoverBehavior["Immediate"] = "immediate";
    PopoverBehavior["Delayed"] = "delayed";
    PopoverBehavior["DelayedClosing"] = "delayedClosing";
})(PopoverBehavior || (exports.PopoverBehavior = PopoverBehavior = {}));
exports.delayByBehavior = {
    [PopoverBehavior.Immediate]: [0, 0],
    [PopoverBehavior.Delayed]: [300, 300],
    [PopoverBehavior.DelayedClosing]: [0, 300],
};
//# sourceMappingURL=config.js.map
