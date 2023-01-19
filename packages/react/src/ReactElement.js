import { REACT_ELEMENT_TYPE } from "../../shared/ReactSymbols";

// 判断元素是否有效
export function isValidElement(object) {
    return (
        typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
    )
}

export function cloneAndReplaceKey(oldElement, newKey) {
    const newElement = ReactElement(
        oldElement.type,
        newKey,
        oldElement.ref,
        oldElement._self,
        oldElement._source,
        oldElement._owner,
        oldElement.props
    )
    return newElement
}