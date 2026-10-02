export var PopoverBehavior;
(function (PopoverBehavior) {
    PopoverBehavior["Immediate"] = "immediate";
    PopoverBehavior["Delayed"] = "delayed";
    PopoverBehavior["DelayedClosing"] = "delayedClosing";
})(PopoverBehavior || (PopoverBehavior = {}));
export const delayByBehavior = {
    [PopoverBehavior.Immediate]: [0, 0],
    [PopoverBehavior.Delayed]: [300, 300],
    [PopoverBehavior.DelayedClosing]: [0, 300],
};
//# sourceMappingURL=config.js.map
