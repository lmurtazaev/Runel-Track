import * as React from 'react';
import type { KeyData, KeysData } from '@gravity-ui/i18n';
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
export declare function addComponentKeysets<const T extends KeysData, const Name extends string>(data: Record<string, T>, componentName: Name): ((key: Extract<keyof T, string>, params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: React.ComponentType<{
        children: (props: {
            t: (key: Extract<keyof T, string>, params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: Extract<keyof T, string>, params?: import("@gravity-ui/i18n").Params) => string;
    };
    /**
     * Keyset data is used only for type inference, the value is always undefined.
     */
    keysetData: { [Key in Name]: Record<Extract<keyof T, string>, KeyData>; };
};
