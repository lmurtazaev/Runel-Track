'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleContainer = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
function getRefs(count) {
    return Array.from({ length: count }).reduce((acc, _, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {});
}
class SimpleContainer extends React.Component {
    static getDerivedStateFromProps({ itemCount }, prevState) {
        const refsCount = Object.keys(prevState.refsList).length;
        if (itemCount === refsCount) {
            return prevState;
        }
        else {
            return {
                refsList: getRefs(itemCount),
            };
        }
    }
    node = null;
    constructor(props) {
        super(props);
        this.state = {
            refsList: getRefs(props.itemCount),
        };
    }
    render() {
        const children = React.Children.map(this.props.children, (child, index) => React.cloneElement(child, { ref: this.state.refsList[index] }));
        return ((0, jsx_runtime_1.jsx)("div", { ref: this.setRef, role: this.props.role, id: this.props.id, children: children }));
    }
    scrollToItem(index) {
        const listItem = this.state.refsList[index]?.current;
        if (listItem && typeof listItem.getNode === 'function') {
            const node = listItem.getNode();
            if (node) {
                if (!this.props.onScrollToItem?.(node)) {
                    node.scrollIntoView?.({ block: 'nearest' });
                }
            }
        }
    }
    setRef = (node) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };
}
exports.SimpleContainer = SimpleContainer;
//# sourceMappingURL=SimpleContainer.js.map
