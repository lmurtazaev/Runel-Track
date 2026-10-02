import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "../../../Text/Text.js";
import { Col } from "../../Col/Col.js";
import { Box } from "../Box/Box.js";
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
export const ColPresenter = ({ size, ...props }) => (_jsx(Col, { size: size, ...props, children: _jsx(Box, { style: { height: '100%' }, children: _jsx(Text, { variant: "code-1", color: "complementary", children: renderTitle(size) }) }) }));
//# sourceMappingURL=ColPresenter.js.map
