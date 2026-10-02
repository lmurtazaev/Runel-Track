import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "../../../Text/Text.js";
import { Flex } from "../../Flex/Flex.js";
export function Box({ children, w = '100%', h = '100%', minHeight, bgc = '#DDBEE1', bc = 'rosybrown', ...props }) {
    return (_jsx(Flex, { ...props, style: {
            padding: 5,
            boxSizing: 'border-box',
            width: w,
            height: h,
            minHeight,
            border: `2px dashed ${bc}`,
            backgroundColor: bgc,
        }, children: _jsx(Text, { variant: "code-1", color: "complementary", children: children }) }));
}
//# sourceMappingURL=Box.js.map
