'use client';
import * as React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { getConfig, subscribeConfigure } from "../../utils/configure.js";
export const defaultLangOptions = { lang: 'en', fallbackLang: 'en' };
export const LangContext = React.createContext(undefined);
export function useLang() {
    const config = useSyncExternalStore(subscribeConfigure, getConfig, getConfig);
    const context = React.useContext(LangContext);
    return context || config;
}
//# sourceMappingURL=useLang.js.map
