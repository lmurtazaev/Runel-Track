import * as React from 'react';
import type { Lang } from "../../utils/configure.js";
import type { StringWithSuggest } from "../../utils/types.js";
export interface LangOptions {
    lang: StringWithSuggest<Lang>;
    fallbackLang: StringWithSuggest<Lang>;
}
export declare const defaultLangOptions: LangOptions;
export declare const LangContext: React.Context<LangOptions | undefined>;
export declare function useLang(): LangOptions;
