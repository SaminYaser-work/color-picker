/** @format */

import React from "react";

import { Saturation } from "./Saturation";

import { useColorManipulation } from "../hooks/use-color-manipulation";
import { Alpha } from "./Alpha";
import { Hue } from "./Hue";

export const ColorPicker = ({
    colorModel,
    color = colorModel.defaultColor,
    onChange,
    ...rest
}) => {
    const [hsva, updateHsva] = useColorManipulation(
        colorModel,
        color,
        onChange
    );

    return (
        <div {...rest} className={"react-colorful"}>
            <Saturation hsva={hsva} onChange={updateHsva} />
            <Hue hue={hsva.h} onChange={updateHsva} />
            <Alpha
                hsva={hsva}
                onChange={updateHsva}
                className="react-colorful__last-control"
            />
        </div>
    );
};
