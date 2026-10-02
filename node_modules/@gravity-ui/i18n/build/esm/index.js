import { replaceParams } from './replace-params';
import { ErrorCode, getPluralValues, hasNestingTranslations, mapErrorCodeToMessage, } from './translation-helpers';
import { isPluralValue } from './types';
import pluralizerEn from './plural/en';
import pluralizerRu from './plural/ru';
import { getPluralValue } from './plural/general';
import { KEYSET_SEPARATOR, MAX_NESTING_DEPTH, getNestingTranslationsRegExp } from './consts';
export * from './types';
export class I18N {
    constructor(options = {}) {
        this.data = {};
        this.pluralizers = {
            en: pluralizerEn,
            ru: pluralizerRu,
        };
        this.logger = null;
        const { data, fallbackLang, lang, logger = null } = options;
        this.fallbackLang = fallbackLang;
        this.lang = lang;
        this.logger = logger;
        if (data) {
            Object.entries(data).forEach(([keysetLang, keysetData]) => {
                this.registerKeysets(keysetLang, keysetData);
            });
        }
    }
    setLang(lang) {
        this.lang = lang;
    }
    setFallbackLang(fallbackLang) {
        this.fallbackLang = fallbackLang;
    }
    /**
     * @deprecated Plurals automatically used from Intl.PluralRules. You can safely remove this call. Will be removed in v2.
     */
    configurePluralization(pluralizers) {
        this.pluralizers = Object.assign({}, this.pluralizers, pluralizers);
    }
    registerKeyset(lang, keysetName, data = {}) {
        const isAlreadyRegistered = this.data[lang] && Object.prototype.hasOwnProperty.call(this.data[lang], keysetName);
        if (isAlreadyRegistered && process.env.NODE_ENV !== 'production') {
            this.warn(`Keyset '${keysetName}' is already registered.`);
        }
        this.data[lang] = Object.assign({}, this.data[lang], { [keysetName]: data });
    }
    registerKeysets(lang, data) {
        Object.keys(data).forEach((keysetName) => {
            this.registerKeyset(lang, keysetName, data[keysetName]);
        });
    }
    has(keysetName, key, lang) {
        var _a;
        const languageData = this.getLanguageData(lang);
        return Boolean(languageData && languageData[keysetName] && ((_a = languageData[keysetName]) === null || _a === void 0 ? void 0 : _a[key]));
    }
    i18n(keysetName, key, params) {
        if (!this.lang && !this.fallbackLang) {
            throw new Error('Language is not specified. You should set at least one of these: "lang", "fallbackLang"');
        }
        let text;
        if (this.lang) {
            text = this._i18n(keysetName, key, this.lang, params);
        }
        else {
            this.warn('Target language is not specified.');
        }
        if (text === undefined && this.fallbackLang && this.fallbackLang !== this.lang) {
            text = this._i18n(keysetName, key, this.fallbackLang, params);
        }
        return text !== null && text !== void 0 ? text : key;
    }
    keyset(keysetName) {
        return (key, params) => {
            return this.i18n(keysetName, key, params);
        };
    }
    warn(msg, keyset, key) {
        var _a;
        let cacheKey = '';
        if (keyset) {
            cacheKey += keyset;
            if (key) {
                cacheKey += `.${key}`;
            }
        }
        else {
            cacheKey = 'languageData';
        }
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(`I18n: ${msg}`, {
            level: 'info',
            logger: cacheKey,
            extra: {
                type: 'i18n',
            },
        });
    }
    getLanguageData(lang) {
        const langCode = lang || this.lang;
        return langCode ? this.data[langCode] : undefined;
    }
    _i18n(keysetName, key, lang, params) {
        const { text, details } = new I18NTranslation(this, lang, key, keysetName, params).getTranslationData();
        if (details) {
            const message = mapErrorCodeToMessage({
                code: details.code,
                lang,
                fallbackLang: this.fallbackLang === lang ? undefined : this.fallbackLang,
            });
            this.warn(message, details.keysetName, details.key);
        }
        return text;
    }
}
class I18NTranslation {
    constructor(i18n, lang, key, keysetName, params, nestingDepth) {
        this.i18n = i18n;
        this.lang = lang;
        this.key = key;
        this.keysetName = keysetName;
        this.params = params;
        this.nestingDepth = nestingDepth !== null && nestingDepth !== void 0 ? nestingDepth : 0;
    }
    getTranslationData() {
        var _a;
        const { data: keyset, details } = this.getKeyset();
        if (details) {
            return { details };
        }
        const keyValue = keyset && keyset[this.key];
        const result = {};
        if (keyValue === undefined) {
            return this.getTranslationDataError(ErrorCode.MissingKey);
        }
        if (isPluralValue(keyValue)) {
            // Limit nesting plural due to the difficulties of translations inlining
            const isNested = this.nestingDepth > 0;
            const isPluralValueHasNestingTranslations = getPluralValues(keyValue).some((kv) => hasNestingTranslations(kv));
            if (isNested || isPluralValueHasNestingTranslations) {
                return this.getTranslationDataError(ErrorCode.NestedPlural);
            }
            const count = Number((_a = this.params) === null || _a === void 0 ? void 0 : _a.count);
            if (Number.isNaN(count)) {
                return this.getTranslationDataError(ErrorCode.MissingKeyParamsCount);
            }
            result.text = getPluralValue({
                key: this.key,
                value: keyValue,
                count,
                lang: this.lang || 'en',
                pluralizers: this.i18n.pluralizers,
                log: (message) => this.i18n.warn(message, this.keysetName, this.key),
            });
        }
        else {
            result.text = String(keyValue);
        }
        if (this.params) {
            result.text = replaceParams(String(result.text), this.params);
        }
        const replaceTranslationsInheritanceResult = this.replaceTranslationsInheritance({
            keyValue: String(result.text),
        });
        if (!replaceTranslationsInheritanceResult.text) {
            return replaceTranslationsInheritanceResult;
        }
        result.text = replaceTranslationsInheritanceResult.text;
        return result;
    }
    getTranslationDataError(errorCode) {
        return { details: { code: errorCode, keysetName: this.keysetName, key: this.key } };
    }
    getKeyset() {
        const languageData = this.i18n.getLanguageData(this.lang);
        if (typeof languageData === 'undefined') {
            return this.getTranslationDataError(ErrorCode.NoLanguageData);
        }
        if (Object.keys(languageData).length === 0) {
            return this.getTranslationDataError(ErrorCode.EmptyLanguageData);
        }
        const keyset = languageData[this.keysetName];
        if (!keyset) {
            return this.getTranslationDataError(ErrorCode.KeysetNotFound);
        }
        if (Object.keys(keyset).length === 0) {
            return this.getTranslationDataError(ErrorCode.EmptyKeyset);
        }
        return { data: keyset };
    }
    replaceTranslationsInheritance(args) {
        const { keyValue } = args;
        const NESTING_PREGEXP = getNestingTranslationsRegExp();
        let result = '';
        let lastIndex = (NESTING_PREGEXP.lastIndex = 0);
        let match;
        while ((match = NESTING_PREGEXP.exec(keyValue))) {
            if (lastIndex !== match.index) {
                result += keyValue.slice(lastIndex, match.index);
            }
            lastIndex = NESTING_PREGEXP.lastIndex;
            const [all, key] = match;
            if (key) {
                if (this.nestingDepth + 1 > MAX_NESTING_DEPTH) {
                    return this.getTranslationDataError(ErrorCode.ExceedTranslationNestingDepth);
                }
                let [inheritedKey, inheritedKeysetName] = [
                    key,
                    undefined,
                ];
                const parts = key.split(KEYSET_SEPARATOR);
                if (parts.length > 1) {
                    [inheritedKeysetName, inheritedKey] = [parts[0], parts[1]];
                }
                if (!inheritedKey) {
                    return this.getTranslationDataError(ErrorCode.MissingInheritedKey);
                }
                // Not support nested params
                const data = new I18NTranslation(this.i18n, this.lang, inheritedKey, inheritedKeysetName !== null && inheritedKeysetName !== void 0 ? inheritedKeysetName : this.keysetName, undefined, this.nestingDepth + 1).getTranslationData();
                if (data.details) {
                    return this.getTranslationDataError(ErrorCode.MissingInheritedKey);
                }
                result += data.text;
            }
            else {
                result += all;
            }
        }
        if (lastIndex < keyValue.length) {
            result += keyValue.slice(lastIndex);
        }
        return { text: result };
    }
}
