/** @format */

import { useRef } from "react";

// Saves incoming handler to the ref in order to avoid "useCallback hell"
export function useEventCallback(handler) {
    const callbackRef = useRef(handler);
    const fn = useRef((value) => {
        callbackRef.current && callbackRef.current(value);
    });
    callbackRef.current = handler;

    return fn.current;
}
