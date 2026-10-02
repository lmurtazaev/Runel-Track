"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.subscribeConfigure = exports.configure = exports.Lang = void 0;
var Lang;
(function (Lang) {
    Lang["Ru"] = "ru";
    Lang["En"] = "en";
})(Lang || (exports.Lang = Lang = {}));
let subs = [];
const config = {
    lang: Lang.En,
    fallbackLang: Lang.En,
};
const configure = (newConfig) => {
    Object.assign(config, newConfig);
    subs.forEach((sub) => {
        sub(config);
    });
};
exports.configure = configure;
const subscribeConfigure = (sub) => {
    subs.push(sub);
    return () => {
        subs = subs.filter((item) => item !== sub);
    };
};
exports.subscribeConfigure = subscribeConfigure;
const getConfig = () => config;
exports.getConfig = getConfig;
//# sourceMappingURL=configure.js.map
