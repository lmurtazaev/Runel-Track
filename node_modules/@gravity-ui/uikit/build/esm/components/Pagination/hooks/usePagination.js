import { getNumberOfPages, getNumerationList } from "../utils.js";
export function usePagination({ page, pageSize, total, mobile, }) {
    const numberOfPages = getNumberOfPages(pageSize, total);
    const hasTotal = numberOfPages !== 0;
    const isNextDisabled = (hasTotal && page === numberOfPages) || total === 0;
    let items;
    if (hasTotal) {
        const numerationList = getNumerationList({ page, numberOfPages, mobile });
        items = numerationList.map((item, index) => {
            if (item === 'ellipsis') {
                return { type: 'ellipsis' };
            }
            if (item === 'pageOf') {
                return { type: 'pageOf' };
            }
            const current = item === page;
            return {
                type: 'page',
                current,
                page: item,
                simple: mobile ? current : false,
                key: mobile ? item + index : item,
            };
        });
    }
    else {
        items = [{ type: 'page', current: true, page, simple: true, key: page }];
    }
    items.unshift({
        type: 'button',
        action: 'previous',
        disabled: page <= 1,
    });
    items.unshift({
        type: 'button',
        action: 'first',
        disabled: page <= 1,
    });
    items.push({
        type: 'button',
        action: 'next',
        disabled: isNextDisabled,
    });
    return { items, numberOfPages };
}
//# sourceMappingURL=usePagination.js.map
