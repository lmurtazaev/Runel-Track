import { block } from "../utils/cn.js";
export var Platform;
(function (Platform) {
    Platform["IOS"] = "ios";
    Platform["ANDROID"] = "android";
    Platform["BROWSER"] = "browser";
})(Platform || (Platform = {}));
const b = block('root');
export const rootMobileClassName = b({ mobile: true }).split(/\s+/)[1];
//# sourceMappingURL=constants.js.map
