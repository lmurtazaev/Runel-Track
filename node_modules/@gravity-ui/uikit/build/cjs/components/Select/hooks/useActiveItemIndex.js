"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveItemIndex = useActiveItemIndex;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useActiveItemIndex({ options, value, open, }) {
    const [activeIndex, setActiveIndex] = React.useState(() => {
        if (open) {
            return getInitialActiveItemIndex(options, value);
        }
        return undefined;
    });
    const [prevOpen, setPrevOpen] = React.useState(open);
    if (prevOpen !== open) {
        setPrevOpen(open);
        if (open) {
            setActiveIndex(getInitialActiveItemIndex(options, value));
        }
    }
    // TODO: save active item if options are changed (e.g. when options are filtered)
    const activeIndexFinal = open &&
        activeIndex !== undefined &&
        activeIndex < options.length &&
        !options[activeIndex].disabled
        ? activeIndex
        : undefined;
    return [activeIndexFinal, setActiveIndex];
}
function getInitialActiveItemIndex(options, value) {
    let itemIndex = -1;
    if (value.length > 0) {
        itemIndex = options.findIndex((item) => 'value' in item && value.includes(item.value) && !item.disabled);
    }
    if (itemIndex === -1) {
        itemIndex = options.findIndex((item) => 'value' in item && !item.disabled);
    }
    return itemIndex === -1 ? undefined : itemIndex;
}
//# sourceMappingURL=useActiveItemIndex.js.map
