/** @format */
import { useCallback, useEffect, useRef, useState } from "react";
import { equalColorObjects } from "../utils/compare";
import { useEventCallback } from "./use-event-callback";

export function useColorManipulation(colorModel, color, onChange) {
    // Save onChange callback in the ref for avoiding "useCallback hell"
    const onChangeCallback = useEventCallback(onChange);

    // No matter which color model is used (HEX, RGB(A) or HSL(A)),
    // all internal calculations are based on HSVA model
    const [hsva, updateHsva] = useState(() => colorModel.toHsva(color));

    // By using this ref we're able to prevent extra updates
    // and the effects recursion during the color conversion
    const cache = useRef({ color, hsva });

    // Update local HSVA-value if `color` property value is changed,
    // but only if that's not the same color that we just sent to the parent
    useEffect(() => {
        if (!colorModel.equal(color, cache.current.color)) {
            const newHsva = colorModel.toHsva(color);
            cache.current = { hsva: newHsva, color };
            updateHsva(newHsva);
        }
    }, [color, colorModel]);

    // Trigger `onChange` callback only if an updated color is different from cached one;
    // save the new color to the ref to prevent unnecessary updates
    useEffect(() => {
        let newColor;
        if (
            !equalColorObjects(hsva, cache.current.hsva) &&
            !colorModel.equal(
                (newColor = colorModel.fromHsva(hsva)),
                cache.current.color
            )
        ) {
            cache.current = { hsva, color: newColor };
            onChangeCallback(newColor);
        }
    }, [hsva, colorModel, onChangeCallback]);

    // Merge the current HSVA color object with updated params.
    // For example, when a child component sends `h` or `s` only
    const handleChange = useCallback((params) => {
        updateHsva((current) => Object.assign({}, current, params));
    }, []);

    return [hsva, handleChange];
}
