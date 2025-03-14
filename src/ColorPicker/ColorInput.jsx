/** @format */

import React, { useEffect, useState } from "react";

import { useEventCallback } from "../hooks/use-event-callback";

import { validHex, validRGB } from "../utils/validate";

const rgbToHex = (rgb) => {
    const rgbMatcher =
        /^rgb(a)?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;
    const match = rgb.match(rgbMatcher);

    if (!match) return null;

    let [, , r, g, b, a] = match;
    r = parseInt(r, 10).toString(16).padStart(2, "0");
    g = parseInt(g, 10).toString(16).padStart(2, "0");
    b = parseInt(b, 10).toString(16).padStart(2, "0");

    if (a !== undefined) {
        a = Math.round(parseFloat(a) * 255)
            .toString(16)
            .padStart(2, "0");
    }

    return `#${r}${g}${b}${a || ""}`;
};

function process(value) {
    if (value.startsWith("rgb")) {
        return rgbToHex(value);
    } else if (value.startsWith("#")) {
        return value;
    }
    return "#ffff";
}

const validate = (value) => {
    if (!value) return false;
    if (value.startsWith("#")) {
        return validHex(value);
    } else if (value.startsWith("rgb")) {
        return validRGB(value);
    }

    return false;
};

export const ColorInput = ({ color = "", onChange }) => {
    const [value, setValue] = useState(color);
    const onChangeCallback = useEventCallback(onChange);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        if (validate(inputValue)) {
            onChangeCallback(process(inputValue));
        }
    };

    useEffect(() => {
        setValue(color);
    }, [color]);

    return <input value={value} spellCheck="false" onChange={handleChange} />;
};
