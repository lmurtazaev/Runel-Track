// webpack checks that namespace import (* as React) has useId
// eslint-disable-next-line no-restricted-syntax
import React from 'react';
import { NAMESPACE } from "../../components/utils/cn.js";
import { getUniqId } from "../../components/utils/common.js";
function useUniqIdFallback() {
    const idRef = React.useRef();
    if (idRef.current === undefined) {
        idRef.current = getUniqId();
    }
    return idRef.current;
}
function useIdNative() {
    // eslint-disable-next-line no-restricted-syntax
    return `${NAMESPACE}${React.useId()}`;
}
export const useUniqId = 
// eslint-disable-next-line no-restricted-syntax
typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
//# sourceMappingURL=useUniqId.js.map
