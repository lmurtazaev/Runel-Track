declare const _default: ((key: "label_close" | "label_more", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_close" | "label_more", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_close" | "label_more", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        ActionsPanel: Record<"label_close" | "label_more", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
