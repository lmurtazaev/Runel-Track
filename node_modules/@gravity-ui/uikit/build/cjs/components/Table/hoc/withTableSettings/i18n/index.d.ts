declare const _default: ((key: "label_settings", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_settings", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_settings", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        withTableSettings: Record<"label_settings", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
