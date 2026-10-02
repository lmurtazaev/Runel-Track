"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColPresenter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Text_1 = require("../../../Text/Text.js");
const Col_1 = require("../../Col/Col.js");
const Box_1 = require("../Box/Box.js");
const renderTitle = (size) => {
    let defaultSize;
    let mediaConfig;
    if (Array.isArray(size)) {
        [defaultSize, mediaConfig] = size;
    }
    else if (typeof size === 'object') {
        mediaConfig = size;
    }
    else {
        defaultSize = size;
    }
    let title = defaultSize || 'auto';
    if (mediaConfig) {
        const mediaPart = Object.entries(mediaConfig)
            .reduce((acc, [media, value]) => {
            if (value) {
                acc.push(`${media}=${value}`);
            }
            return acc;
        }, [])
            .join(' ');
        title = `${title} [${mediaPart}]`;
    }
    return title;
};
const ColPresenter = ({ size, ...props }) => ((0, jsx_runtime_1.jsx)(Col_1.Col, { size: size, ...props, children: (0, jsx_runtime_1.jsx)(Box_1.Box, { style: { height: '100%' }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { variant: "code-1", color: "complementary", children: renderTitle(size) }) }) }));
exports.ColPresenter = ColPresenter;
//# sourceMappingURL=ColPresenter.js.map
