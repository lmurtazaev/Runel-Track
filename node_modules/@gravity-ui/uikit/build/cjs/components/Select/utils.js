"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredFlattenOptions = exports.getActiveItem = exports.getListItems = exports.findItemIndexByQuickSearch = exports.getNextQuickSearch = exports.getOptionsFromChildren = exports.getSelectedOptionsContent = exports.getOptionsHeight = exports.getPopupItemHeight = exports.getFlattenOptions = exports.isSelectGroupTitle = void 0;
exports.scrollToItem = scrollToItem;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../constants.js");
const constants_2 = require("./constants.js");
const isSelectGroupTitle = (option) => {
    return Boolean(option && 'label' in option);
};
exports.isSelectGroupTitle = isSelectGroupTitle;
const getFlattenOptions = (options) => {
    const flatten = options.reduce((acc, option) => {
        if ('label' in option) {
            acc.push({ label: option.label, disabled: true, data: option.data });
            acc.push(...(option.options || []));
        }
        else {
            acc.push(option);
        }
        return acc;
    }, []);
    Object.defineProperty(flatten, constants_2.FLATTEN_KEY, {
        enumerable: false,
        value: {},
    });
    return flatten;
};
exports.getFlattenOptions = getFlattenOptions;
const getPopupItemHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, option, index, mobile } = args;
    let itemHeight = mobile ? constants_2.MOBILE_ITEM_HEIGHT : constants_2.SIZE_TO_ITEM_HEIGHT[size];
    if ((0, exports.isSelectGroupTitle)(option)) {
        const marginTop = index === 0 ? 0 : constants_2.GROUP_ITEM_MARGIN_TOP;
        itemHeight = option.label === '' ? 0 : itemHeight;
        return getOptionGroupHeight ? getOptionGroupHeight(option, index) : itemHeight + marginTop;
    }
    return getOptionHeight ? getOptionHeight(option, index) : itemHeight;
};
exports.getPopupItemHeight = getPopupItemHeight;
const getOptionsHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, options, mobile } = args;
    return options.reduce((height, option, index) => {
        return (height +
            (0, exports.getPopupItemHeight)({ getOptionHeight, getOptionGroupHeight, size, option, index, mobile }));
    }, 0);
};
exports.getOptionsHeight = getOptionsHeight;
const getOptionText = (option) => {
    if (typeof option.content === 'string') {
        return option.content;
    }
    if (typeof option.children === 'string') {
        return option.children;
    }
    if (option.text) {
        return option.text;
    }
    return option.value;
};
const getSelectedOptionsContent = (options, value, renderSelectedOption) => {
    if (value.length === 0) {
        return null;
    }
    const flattenSimpleOptions = options.filter((opt) => !(0, exports.isSelectGroupTitle)(opt));
    const optionsMap = new Map(flattenSimpleOptions.map((opt) => [opt.value, opt]));
    const selectedOptions = value.map((val) => {
        return optionsMap.get(val) || { value: val };
    });
    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return ((0, jsx_runtime_1.jsx)(React.Fragment, { children: renderSelectedOption(option, index) }, option.value));
        });
    }
    else {
        return selectedOptions
            .map((option) => {
            return getOptionText(option);
        })
            .join(', ');
    }
};
exports.getSelectedOptionsContent = getSelectedOptionsContent;
const getTypedChildrenArray = (children) => {
    return React.Children.toArray(children);
};
const getOptionsFromOptgroupChildren = (children) => {
    return React.Children.toArray(children).reduce((acc, { props }) => {
        if ('value' in props) {
            acc.push(props);
        }
        return acc;
    }, []);
};
const getOptionsFromChildren = (children) => {
    return getTypedChildrenArray(children).reduce((acc, { props }) => {
        if ('label' in props) {
            const options = props.options || getOptionsFromOptgroupChildren(props.children);
            acc.push({
                options,
                label: props.label,
            });
        }
        if ('value' in props) {
            acc.push({ ...props });
        }
        return acc;
    }, []);
};
exports.getOptionsFromChildren = getOptionsFromChildren;
const getNextQuickSearch = (keyCode, quickSearch) => {
    // https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
    const writingSystemKeyPressed = keyCode.length === 1;
    const backspacePressed = keyCode === constants_1.KeyCode.BACKSPACE;
    let nextQuickSearch = '';
    if (backspacePressed && quickSearch.length) {
        nextQuickSearch = quickSearch.slice(0, quickSearch.length - 1);
    }
    else if (writingSystemKeyPressed) {
        nextQuickSearch = (quickSearch + keyCode).trim();
    }
    return nextQuickSearch;
};
exports.getNextQuickSearch = getNextQuickSearch;
const getEscapedRegExp = (string) => {
    return new RegExp(string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
};
const findItemIndexByQuickSearch = (quickSearch, items) => {
    if (!items) {
        return -1;
    }
    return items.findIndex((item) => {
        if ((0, exports.isSelectGroupTitle)(item)) {
            return false;
        }
        if (item.disabled) {
            return false;
        }
        const optionText = getOptionText(item);
        return getEscapedRegExp(quickSearch).test(optionText);
    });
};
exports.findItemIndexByQuickSearch = findItemIndexByQuickSearch;
const getListItems = (listRef) => {
    return listRef?.current?.getItems() || [];
};
exports.getListItems = getListItems;
const getActiveItem = (listRef) => {
    const items = (0, exports.getListItems)(listRef);
    const activeItemIndex = listRef?.current?.getActiveItem();
    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};
exports.getActiveItem = getActiveItem;
const isOptionMatchedByFilter = (option, filter) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();
    return lowerOptionText.indexOf(lowerFilter) !== -1;
};
const getFilteredFlattenOptions = (args) => {
    const { options, filter, filterOption } = args;
    const filteredOptions = options.filter((option) => {
        if ((0, exports.isSelectGroupTitle)(option)) {
            return true;
        }
        return filterOption
            ? filterOption(option, filter)
            : isOptionMatchedByFilter(option, filter);
    });
    return filteredOptions.reduce((acc, option, index) => {
        const groupTitle = (0, exports.isSelectGroupTitle)(option);
        const previousGroupTitle = (0, exports.isSelectGroupTitle)(acc[acc.length - 1]);
        const isLastOption = index === filteredOptions.length - 1;
        if (groupTitle && previousGroupTitle) {
            acc.pop();
        }
        if (!groupTitle || (groupTitle && !isLastOption)) {
            acc.push(option);
        }
        return acc;
    }, []);
};
exports.getFilteredFlattenOptions = getFilteredFlattenOptions;
function scrollToItem(node) {
    const container = node.offsetParent;
    if (container instanceof HTMLElement) {
        const height = container.offsetHeight;
        const scrollTop = container.scrollTop;
        const top = node.offsetTop;
        const bottom = top + node.offsetHeight;
        if (bottom >= scrollTop + height) {
            container.scrollTo({ top: top - height + node.offsetHeight });
        }
        else if (top <= scrollTop) {
            container.scrollTo({ top });
        }
    }
    return true;
}
//# sourceMappingURL=utils.js.map
