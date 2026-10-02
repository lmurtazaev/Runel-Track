'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangContext = exports.defaultLangOptions = void 0;
exports.useLang = useLang;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const shim_1 = require("use-sync-external-store/shim");
const configure_1 = require("../../utils/configure.js");
exports.defaultLangOptions = { lang: 'en', fallbackLang: 'en' };
exports.LangContext = React.createContext(undefined);
function useLang() {
    const config = (0, shim_1.useSyncExternalStore)(configure_1.subscribeConfigure, configure_1.getConfig, configure_1.getConfig);
    const context = React.useContext(exports.LangContext);
    return context || config;
}
//# sourceMappingURL=useLang.js.map
