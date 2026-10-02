'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = exports.FirstDisplayedItemsCount = exports.LastDisplayedItemsCount = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const throttle_1 = tslib_1.__importDefault(require("lodash/throttle.js"));
const cn_1 = require("../../utils/cn.js");
const BreadcrumbsItem_1 = require("./BreadcrumbsItem.js");
const BreadcrumbsMore_1 = require("./BreadcrumbsMore.js");
const BreadcrumbsSeparator_1 = require("./BreadcrumbsSeparator.js");
require("./Breadcrumbs.css");
const RESIZE_THROTTLE = 200;
const MORE_ITEM_WIDTH = 34;
const DEFAULT_POPUP_PLACEMENT = ['bottom', 'top'];
const GAP_WIDTH = 4;
const b = (0, cn_1.block)('breadcrumbs-legacy');
var LastDisplayedItemsCount;
(function (LastDisplayedItemsCount) {
    LastDisplayedItemsCount[LastDisplayedItemsCount["One"] = 1] = "One";
    LastDisplayedItemsCount[LastDisplayedItemsCount["Two"] = 2] = "Two";
})(LastDisplayedItemsCount || (exports.LastDisplayedItemsCount = LastDisplayedItemsCount = {}));
var FirstDisplayedItemsCount;
(function (FirstDisplayedItemsCount) {
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["Zero"] = 0] = "Zero";
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["One"] = 1] = "One";
})(FirstDisplayedItemsCount || (exports.FirstDisplayedItemsCount = FirstDisplayedItemsCount = {}));
/**
 * @deprecated
 */
class Breadcrumbs extends React.Component {
    static defaultProps = {
        popupPlacement: DEFAULT_POPUP_PLACEMENT,
    };
    static prepareInitialState(props) {
        const { firstDisplayedItemsCount } = props;
        return {
            calculated: false,
            rootItem: firstDisplayedItemsCount ? props.items[0] : undefined,
            visibleItems: props.items.slice(firstDisplayedItemsCount),
            hiddenItems: [],
            allItems: props.items,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.allItems !== props.items) {
            return Breadcrumbs.prepareInitialState(props);
        }
        return null;
    }
    container;
    resizeObserver;
    constructor(props) {
        super(props);
        this.handleResize = (0, throttle_1.default)(this.handleResize, RESIZE_THROTTLE);
        if (typeof window !== 'undefined') {
            this.resizeObserver = new ResizeObserver(this.handleResize);
        }
        this.container = React.createRef();
        this.state = Breadcrumbs.prepareInitialState(props);
    }
    componentDidMount() {
        this.recalculate();
        this.resizeObserver?.observe(this.container.current);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.state.allItems) {
            this.recalculate();
        }
    }
    componentWillUnmount() {
        this.resizeObserver?.disconnect();
    }
    render() {
        const { className, qa } = this.props;
        const { calculated } = this.state;
        /*
         *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
         */
        return ((0, jsx_runtime_1.jsx)("div", { className: b({ calculated: calculated ? 'yes' : 'no' }, className), "data-qa": qa, children: (0, jsx_runtime_1.jsxs)("div", { className: b('inner'), ref: this.container, children: [this.renderRootItem(), this.renderMoreItem(), this.renderVisibleItems()] }) }));
    }
    renderItem(item, isCurrent, isPrevCurrent, renderItemContent) {
        return ((0, jsx_runtime_1.jsx)(BreadcrumbsItem_1.BreadcrumbsItem, { item: item, isCurrent: isCurrent, isPrevCurrent: isPrevCurrent, renderItemContent: renderItemContent || this.props.renderItemContent, renderItem: this.props.renderItem }));
    }
    renderItemDivider() {
        const { renderItemDivider } = this.props;
        return (0, jsx_runtime_1.jsx)(BreadcrumbsSeparator_1.BreadcrumbsSeparator, { renderItemDivider: renderItemDivider });
    }
    renderRootItem() {
        const { renderRootContent } = this.props;
        const { rootItem, visibleItems } = this.state;
        const isCurrent = visibleItems.length === 0;
        if (!rootItem) {
            return null;
        }
        return this.renderItem(rootItem, isCurrent, false, renderRootContent);
    }
    renderVisibleItems() {
        const { visibleItems } = this.state;
        return visibleItems.map((item, index, items) => {
            const isCurrent = index === items.length - 1;
            const isPrevCurrent = index === items.length - 2;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [this.renderItemDivider(), this.renderItem(item, isCurrent, isPrevCurrent)] }, index));
        });
    }
    renderMoreItem() {
        const { hiddenItems } = this.state;
        if (hiddenItems.length === 0) {
            return null;
        }
        const { popupStyle, popupPlacement, renderItemDivider } = this.props;
        return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(BreadcrumbsSeparator_1.BreadcrumbsSeparator, { renderItemDivider: renderItemDivider }), (0, jsx_runtime_1.jsx)(BreadcrumbsMore_1.BreadcrumbsMore, { items: hiddenItems, popupPlacement: popupPlacement, popupStyle: popupStyle })] }));
    }
    recalculate() {
        const { items: allItems, lastDisplayedItemsCount, firstDisplayedItemsCount } = this.props;
        let availableWidth = this.container.current?.offsetWidth || 0;
        if (this.container.current && availableWidth > 0) {
            availableWidth += GAP_WIDTH;
            const dividers = Array.from(this.container.current.querySelectorAll(`.${b('divider')}`));
            const items = [
                ...Array.from(this.container.current.querySelectorAll(`.${b('switcher')}`)),
                ...Array.from(this.container.current.querySelectorAll(`.${b('item')}`)),
            ];
            const itemsWidths = items.map((elem, i) => elem.scrollWidth + (i === items.length - 1 ? GAP_WIDTH : GAP_WIDTH * 2));
            const dividersWidths = dividers.map((elem) => elem.offsetWidth);
            const buttonsWidth = itemsWidths.reduce((total, width, index, widths) => {
                const isLastItem = widths.length - 1 === index;
                const isItemBeforeLast = lastDisplayedItemsCount === LastDisplayedItemsCount.Two &&
                    widths.length - 2 === index;
                if (isLastItem || isItemBeforeLast) {
                    return total + Math.min(width, 200);
                }
                return total + width;
            }, 0);
            const dividersWidth = dividersWidths.reduce((total, width) => total + width, 0);
            let totalWidth = buttonsWidth + dividersWidth;
            let visibleItemsStartIndex = 1;
            while (totalWidth > availableWidth &&
                visibleItemsStartIndex < items.length - lastDisplayedItemsCount) {
                if (visibleItemsStartIndex === 1) {
                    totalWidth += MORE_ITEM_WIDTH + dividersWidths[visibleItemsStartIndex];
                }
                totalWidth -=
                    itemsWidths[visibleItemsStartIndex] + dividersWidths[visibleItemsStartIndex];
                visibleItemsStartIndex++;
            }
            this.setState({
                calculated: true,
                visibleItems: allItems.slice(visibleItemsStartIndex - (1 - firstDisplayedItemsCount)),
                hiddenItems: allItems.slice(firstDisplayedItemsCount, visibleItemsStartIndex - (1 - firstDisplayedItemsCount)),
            });
        }
    }
    handleResize = () => {
        const state = Breadcrumbs.prepareInitialState(this.props);
        this.setState(state, this.recalculate);
    };
}
exports.Breadcrumbs = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map
