import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { KeyCode } from "../../constants.js";
import { FLATTEN_KEY, GROUP_ITEM_MARGIN_TOP, MOBILE_ITEM_HEIGHT, SIZE_TO_ITEM_HEIGHT, } from "./constants.js";
export const isSelectGroupTitle = (option) => {
    return Boolean(option && 'label' in option);
};
export const getFlattenOptions = (options) => {
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
    Object.defineProperty(flatten, FLATTEN_KEY, {
        enumerable: false,
        value: {},
    });
    return flatten;
};
export const getPopupItemHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, option, index, mobile } = args;
    let itemHeight = mobile ? MOBILE_ITEM_HEIGHT : SIZE_TO_ITEM_HEIGHT[size];
    if (isSelectGroupTitle(option)) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        itemHeight = option.label === '' ? 0 : itemHeight;
        return getOptionGroupHeight ? getOptionGroupHeight(option, index) : itemHeight + marginTop;
    }
    return getOptionHeight ? getOptionHeight(option, index) : itemHeight;
};
export const getOptionsHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, options, mobile } = args;
    return options.reduce((height, option, index) => {
        return (height +
            getPopupItemHeight({ getOptionHeight, getOptionGroupHeight, size, option, index, mobile }));
    }, 0);
};
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
export const getSelectedOptionsContent = (options, value, renderSelectedOption) => {
    if (value.length === 0) {
        return null;
    }
    const flattenSimpleOptions = options.filter((opt) => !isSelectGroupTitle(opt));
    const optionsMap = new Map(flattenSimpleOptions.map((opt) => [opt.value, opt]));
    const selectedOptions = value.map((val) => {
        return optionsMap.get(val) || { value: val };
    });
    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return (_jsx(React.Fragment, { children: renderSelectedOption(option, index) }, option.value));
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
export const getOptionsFromChildren = (children) => {
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
export const getNextQuickSearch = (keyCode, quickSearch) => {
    // https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
    const writingSystemKeyPressed = keyCode.length === 1;
    const backspacePressed = keyCode === KeyCode.BACKSPACE;
    let nextQuickSearch = '';
    if (backspacePressed && quickSearch.length) {
        nextQuickSearch = quickSearch.slice(0, quickSearch.length - 1);
    }
    else if (writingSystemKeyPressed) {
        nextQuickSearch = (quickSearch + keyCode).trim();
    }
    return nextQuickSearch;
};
const getEscapedRegExp = (string) => {
    return new RegExp(string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
};
export const findItemIndexByQuickSearch = (quickSearch, items) => {
    if (!items) {
        return -1;
    }
    return items.findIndex((item) => {
        if (isSelectGroupTitle(item)) {
            return false;
        }
        if (item.disabled) {
            return false;
        }
        const optionText = getOptionText(item);
        return getEscapedRegExp(quickSearch).test(optionText);
    });
};
export const getListItems = (listRef) => {
    return listRef?.current?.getItems() || [];
};
export const getActiveItem = (listRef) => {
    const items = getListItems(listRef);
    const activeItemIndex = listRef?.current?.getActiveItem();
    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};
const isOptionMatchedByFilter = (option, filter) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();
    return lowerOptionText.indexOf(lowerFilter) !== -1;
};
export const getFilteredFlattenOptions = (args) => {
    const { options, filter, filterOption } = args;
    const filteredOptions = options.filter((option) => {
        if (isSelectGroupTitle(option)) {
            return true;
        }
        return filterOption
            ? filterOption(option, filter)
            : isOptionMatchedByFilter(option, filter);
    });
    return filteredOptions.reduce((acc, option, index) => {
        const groupTitle = isSelectGroupTitle(option);
        const previousGroupTitle = isSelectGroupTitle(acc[acc.length - 1]);
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
export function scrollToItem(node) {
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
