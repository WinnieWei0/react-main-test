import type { RefObject } from "shared/ReactTypes";
export function createRef(): RefObject {
    const refObject = {
        current: null
    }
    return refObject
}