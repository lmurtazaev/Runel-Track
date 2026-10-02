import * as React from 'react';
import { useLang } from "../components/theme/useLang.js";
import { i18n } from "./i18n.js";
/**
 * Add component's keysets data
 * @param data - keysets data by languages
 * @param componentName - name of the component
 * @returns function to get keys' translations for current language
 * @example
 * ```
 * import {addComponentKeysets} from '@gravity-ui/uikit/i18n';
 * import en from './en.json';
 * import ru from './ru.json';
 *
 * const t = addComponentKeysets({en, ru}, 'Alert');
 *
 * console.log(t('label_close')); // 'Close'
 * ```
 */
export function addComponentKeysets(data, componentName) {
    Object.entries(data).forEach(([lang, keys]) => i18n.registerKeyset(lang, componentName, keys));
    const translateFunction = i18n.keyset(componentName);
    const useTranslation = () => {
        const langConfig = useLang();
        const { lang = 'en', fallbackLang = 'en' } = i18n;
        const t = React.useCallback((...params) => {
            i18n.setLang(langConfig.lang);
            i18n.setFallbackLang(langConfig.fallbackLang);
            const result = translateFunction(...params);
            i18n.setLang(lang);
            i18n.setFallbackLang(fallbackLang);
            return result;
        }, [fallbackLang, lang, langConfig.fallbackLang, langConfig.lang]);
        return { t };
    };
    Object.assign(translateFunction, {
        useTranslation,
        Translation: ({ children }) => {
            return children(useTranslation());
        },
    });
    return translateFunction;
}
//# sourceMappingURL=addComponentKeysets.js.map
