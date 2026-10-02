declare const _default: ((key: "button_previous" | "button_next" | "button_first" | "label_input-placeholder" | "label_page-of" | "label_select_size", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "button_previous" | "button_next" | "button_first" | "label_input-placeholder" | "label_page-of" | "label_select_size", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "button_previous" | "button_next" | "button_first" | "label_input-placeholder" | "label_page-of" | "label_select_size", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        Pagination: Record<"button_previous" | "button_next" | "button_first" | "label_input-placeholder" | "label_page-of" | "label_select_size", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
