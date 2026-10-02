import md5 from 'blueimp-md5';
import { formatClass, parseClass } from "./class-transform.js";
export function withoutClassMods(converter = (arg) => arg) {
    return (parsedClass, strClass) => parsedClass.mod ? undefined : converter(parsedClass, strClass);
}
function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}
function getXpathByNode(node, options) {
    if (!node || !isElement(node)) {
        return '';
    }
    const tag = node.tagName.toLowerCase();
    let token = `/${tag}`;
    const convertedId = node.id && !options.withoutId ? options.idConverter(node.id) : undefined;
    if (convertedId) {
        token += `[@id='${convertedId}']`;
    }
    else {
        const classes = [];
        node.classList.forEach((className) => {
            const currentClass = options.classConverter({ ...parseClass(className), tag }, className);
            if (currentClass) {
                classes.push(formatClass(currentClass));
            }
        });
        if (classes.length) {
            token += `[@class='${classes.join(' ')}']`;
        }
    }
    return getXpathByNode(node.parentElement, options) + token;
}
const defaultXpathOptions = {
    classConverter: (arg) => arg,
    idConverter: (arg) => arg,
    withoutId: false,
};
export function getXpath(event, options) {
    const internalOptions = {
        ...defaultXpathOptions,
        ...(options || {}),
    };
    const xpath = getXpathByNode(event.currentTarget || event.target, internalOptions);
    return {
        xpath,
        hash: md5(xpath),
    };
}
//# sourceMappingURL=xpath.js.map
