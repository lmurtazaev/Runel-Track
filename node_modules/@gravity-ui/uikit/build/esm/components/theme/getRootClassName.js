import { block } from "../utils/cn.js";
import { ROOT_CLASSNAME } from "./constants.js";
const b = block(ROOT_CLASSNAME);
export function getRootClassName({ theme } = {}, className) {
    return b({ theme }, className);
}
//# sourceMappingURL=getRootClassName.js.map
