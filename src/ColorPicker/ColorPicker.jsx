/** @format */

import React from "react";

import { useColorManipulation } from "../hooks/use-color-manipulation";
import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";
import { Alpha } from "./Alpha";
import { ColorInput } from "./ColorInput";
import { EyeDropper } from "./EyeDropper";
import { Hue } from "./Hue";
import { Saturation } from "./Saturation";

const colorModel = {
    defaultColor: "0001",
    toHsva: hexToHsva,
    fromHsva: hsvaToHex,
    equal: equalHex,
};

export const ColorPicker = ({ color, setColor }) => {
    const [hsva, updateHsva] = useColorManipulation(
        colorModel,
        color,
        setColor
    );

    return (
        <div>
            <div className={"react-colorful"}>
                <Saturation hsva={hsva} onChange={updateHsva} />
                <Hue hue={hsva.h} onChange={updateHsva} />
                <Alpha hsva={hsva} onChange={updateHsva} />
            </div>

            <div>
                <EyeDropper setColor={setColor} />
                <ColorInput color={color} onChange={setColor} />
            </div>
        </div>
    );
};
