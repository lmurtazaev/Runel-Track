import type { KeysData, KeysetData, Logger, Params, Pluralizer } from './types';
export * from './types';
type I18NOptions = {
    /**
     * Keysets mapped data.
     * @example
     * ```
        import {I18N} from '@gravity-ui/i18n';

        let i18n = new I18N({
            lang: 'en',
            data: {
                en: {notification: {title: 'New version'}},
                sr: {notification: {title: 'Нова верзија'}},
            },
        });
        // Equivalent approach via public api of i18n instance
        i18n = new I18N();
        i18n.setLang('en');
        i18n.registerKeysets('en', {notification: {title: 'New version'}});
        i18n.registerKeysets('sr', {notification: {title: 'Нова верзија'}});
     * ```
     */
    data?: Record<string, KeysetData>;
    /**
     * Language used as fallback in case there is no translation in the target language.
     * @example
     * ```
        import {I18N} from '@gravity-ui/i18n';

        const i18n = new I18N({
            lang: 'sr',
            fallbackLang: 'en',
            data: {
                en: {notification: {title: 'New version'}},
                sr: {notification: {}},
            },
        });
        i18n.i18n('notification', 'title'); // 'New version'
        // Equivalent approach via public api of i18n instance
        i18n = new I18N();
        i18n.setLang('sr');
        i18n.setFallbackLang('en');
        i18n.registerKeysets('en', {notification: {title: 'New version'}});
        i18n.registerKeysets('sr', {notification: {}});
        i18n.i18n('notification', 'title'); // 'New version'
     * ```
     */
    fallbackLang?: string;
    /**
     * Target language for the i18n instance.
     * @example
     * ```
        import {I18N} from '@gravity-ui/i18n';

        let i18n = new I18N({lang: 'en'});
        // Equivalent approach via public api of i18n instance
        i18n = new I18N();
        i18n.setLang('en');
     * ```
     */
    lang?: string;
    logger?: Logger;
};
export declare class I18N {
    data: Record<string, KeysetData>;
    pluralizers: Record<string, Pluralizer>;
    logger: Logger | null;
    fallbackLang?: string;
    lang?: string;
    constructor(options?: I18NOptions);
    setLang(lang: string): void;
    setFallbackLang(fallbackLang: string): void;
    /**
     * @deprecated Plurals automatically used from Intl.PluralRules. You can safely remove this call. Will be removed in v2.
     */
    configurePluralization(pluralizers: Record<string, Pluralizer>): void;
    registerKeyset(lang: string, keysetName: string, data?: KeysData): void;
    registerKeysets(lang: string, data: KeysetData): void;
    has(keysetName: string, key: string, lang?: string): boolean;
    i18n(keysetName: string, key: string, params?: Params): string;
    keyset<TKey extends string = string>(keysetName: string): (key: TKey, params?: Params) => string;
    warn(msg: string, keyset?: string, key?: string): void;
    getLanguageData(lang?: string): KeysetData | undefined;
    private _i18n;
}
