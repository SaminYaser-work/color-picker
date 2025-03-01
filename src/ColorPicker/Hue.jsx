/** @format */

import React from "react";

import { Pointer } from "./Pointer";

import { clamp } from "../utils/clamp";
import { hsvaToHslString } from "../utils/convert";
import { round } from "../utils/round";
import { Interactive } from "./Interaction";

const HueBase = ({ hue, onChange }) => {
    const handleMove = (interaction) => {
        onChange({ h: 360 * interaction.left });
    };

    const handleKey = (offset) => {
        // Hue measured in degrees of the color circle ranging from 0 to 360
        onChange({
            h: clamp(hue + offset.left * 360, 0, 360),
        });
    };

    return (
        <div className={"react-colorful__hue"}>
            <Interactive
                onMove={handleMove}
                onKey={handleKey}
                aria-label="Hue"
                aria-valuenow={round(hue)}
                aria-valuemax="360"
                aria-valuemin="0"
            >
                <Pointer
                    className="react-colorful__hue-pointer"
                    left={hue / 360}
                    color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
                />
            </Interactive>
        </div>
    );
};

export const Hue = React.memo(HueBase);
