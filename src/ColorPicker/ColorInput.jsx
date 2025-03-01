/** @format */

import React, { useCallback, useEffect, useState } from "react";

import { useEventCallback } from "../hooks/use-event-callback";

import { validHex } from "../utils/validate";

/** Adds "#" symbol to the beginning of the string */
const prefix = (value) => "#" + value;

export const ColorInput = (props) => {
    const { prefixed, alpha = true, ...rest } = props;

    /** Escapes all non-hexadecimal characters including "#" */
    const escape = useCallback(
        (value) =>
            value.replace(/([^0-9A-F]+)/gi, "").substring(0, alpha ? 8 : 6),
        [alpha]
    );

    /** Validates hexadecimal strings */
    const validate = useCallback((value) => validHex(value, alpha), [alpha]);

    return (
        <Input
            {...rest}
            escape={escape}
            format={prefixed ? prefix : undefined}
            process={prefix}
            validate={validate}
        />
    );
};

const Input = (props) => {
    const {
        color = "",
        onChange,
        onBlur,
        escape,
        validate,
        format,
        process,
        ...rest
    } = props;
    const [value, setValue] = useState(() => escape(color));
    const onChangeCallback = useEventCallback(onChange);
    const onBlurCallback = useEventCallback(onBlur);

    // Trigger `onChange` handler only if the input value is a valid color
    const handleChange = useCallback(
        (e) => {
            const inputValue = escape(e.target.value);
            setValue(inputValue);
            if (validate(inputValue))
                onChangeCallback(process ? process(inputValue) : inputValue);
        },
        [escape, process, validate, onChangeCallback]
    );

    // Take the color from props if the last typed color (in local state) is not valid
    const handleBlur = useCallback(
        (e) => {
            if (!validate(e.target.value)) setValue(escape(color));
            onBlurCallback(e);
        },
        [color, escape, validate, onBlurCallback]
    );

    // Update the local state when `color` property value is changed
    useEffect(() => {
        setValue(escape(color));
    }, [color, escape]);

    return (
        <input
            {...rest}
            value={format ? format(value) : value}
            // the element should not be checked for spelling errors
            spellCheck="false"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};
