declare const _default: ((key: "label_more" | "breadcrumbs", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_more" | "breadcrumbs", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_more" | "breadcrumbs", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        "lab/Breadcrumbs": Record<"label_more" | "breadcrumbs", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
