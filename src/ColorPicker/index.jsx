/** @format */

import { useLayoutEffect, useState } from "react";
import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";
import { ColorInput } from "./ColorInput";
import { ColorPicker } from "./ColorPicker";
import { EyeDropper } from "./EyeDropper";
import "./style.css";

const colorModel = {
    defaultColor: "0001",
    toHsva: hexToHsva,
    fromHsva: hsvaToHex,
    equal: equalHex,
};

export const MyColorPicker = () => {
    const [color, setColor] = useState("#aabbcc");

    useLayoutEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color]);

    return (
        <>
            <ColorPicker
                color={color}
                onChange={setColor}
                colorModel={colorModel}
            />
            <EyeDropper setColor={setColor} />
            <ColorInput color={color} onChange={setColor} />
        </>
    );
};
