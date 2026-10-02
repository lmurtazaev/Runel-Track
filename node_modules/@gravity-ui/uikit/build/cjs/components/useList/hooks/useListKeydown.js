"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListKeydown = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../../constants.js");
const hooks_1 = require("../../../hooks/index.js");
const findNextIndex_1 = require("../utils/findNextIndex.js");
const scrollToListItem_1 = require("../utils/scrollToListItem.js");
// Use this hook if you need keyboard support for tree structure lists
const useListKeydown = ({ containerRef, onItemClick, enabled, list }) => {
    const activateItem = React.useCallback((index, scrollTo = true) => {
        if (typeof index === 'number' && list.structure.visibleFlattenIds[index]) {
            if (scrollTo) {
                (0, scrollToListItem_1.scrollToListItem)(list.structure.visibleFlattenIds[index], containerRef?.current);
            }
            list.state.setActiveItemId?.(list.structure.visibleFlattenIds[index]);
        }
    }, [list.structure.visibleFlattenIds, list.state, containerRef]);
    const handleKeyMove = React.useCallback((event, step, defaultItemIndex = 0) => {
        event.preventDefault();
        const maybeIndex = typeof list.state.activeItemId === 'string'
            ? list.structure.visibleFlattenIds.findIndex((i) => i === list.state.activeItemId)
            : -1;
        const nextIndex = (0, findNextIndex_1.findNextIndex)({
            list: list.structure.visibleFlattenIds,
            index: (maybeIndex > -1 ? maybeIndex : defaultItemIndex) + step,
            step: Math.sign(step),
            disabledItemsById: list.state.disabledById,
        });
        activateItem(nextIndex);
    }, [
        activateItem,
        list.state.activeItemId,
        list.state.disabledById,
        list.structure.visibleFlattenIds,
    ]);
    (0, hooks_1.useLayoutEffect)(() => {
        const anchor = containerRef?.current;
        if (enabled || !anchor) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            switch (event.key) {
                case constants_1.KeyCode.ARROW_DOWN: {
                    handleKeyMove(event, 1, -1);
                    break;
                }
                case constants_1.KeyCode.ARROW_UP: {
                    handleKeyMove(event, -1);
                    break;
                }
                case constants_1.KeyCode.SPACEBAR:
                case constants_1.KeyCode.ENTER: {
                    if (list.state.activeItemId &&
                        !list.state.disabledById[list.state.activeItemId]) {
                        event.preventDefault();
                        onItemClick?.({ id: list.state.activeItemId });
                    }
                    break;
                }
                default: {
                }
            }
        };
        anchor.addEventListener('keydown', handleKeyDown);
        return () => {
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        containerRef,
        enabled,
        handleKeyMove,
        list.state.activeItemId,
        list.state.disabledById,
        onItemClick,
    ]);
};
exports.useListKeydown = useListKeydown;
//# sourceMappingURL=useListKeydown.js.map
