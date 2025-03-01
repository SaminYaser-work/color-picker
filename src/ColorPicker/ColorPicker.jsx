/** @format */

import React, { useRef } from "react";

import { Saturation } from "./Saturation";

import { useColorManipulation } from "../hooks/use-color-manipulation";
import { Hue } from "./Hue";

export const ColorPicker = ({
    colorModel,
    color = colorModel.defaultColor,
    onChange,
    ...rest
}) => {
    const nodeRef = useRef(null);
    // useStyleSheet(nodeRef);

    const [hsva, updateHsva] = useColorManipulation(
        colorModel,
        color,
        onChange
    );

    return (
        <div {...rest} ref={nodeRef} className={"react-colorful"}>
            <Saturation hsva={hsva} onChange={updateHsva} />
            <Hue
                hue={hsva.h}
                onChange={updateHsva}
                className="react-colorful__last-control"
            />
        </div>
    );
};
