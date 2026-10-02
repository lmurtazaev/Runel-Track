import { Icon } from "../Icon/index.js";
import { NAMESPACE } from "./cn.js";
import { isOfType } from "./isOfType.js";
let nextUniqueId = 1;
export function getUniqId() {
    return `${NAMESPACE}uniq-${nextUniqueId++}`;
}
export const isSvg = isOfType('svg');
export const isIcon = isOfType(Icon);
//# sourceMappingURL=common.js.map
