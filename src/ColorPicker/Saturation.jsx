/** @format */

import React from "react";
import { clamp } from "../utils/clamp";
import { hsvaToHslString } from "../utils/convert";
import { round } from "../utils/round";
import { Interactive } from "./Interaction";
import { Pointer } from "./Pointer";

const SaturationBase = ({ hsva, onChange }) => {
    const handleMove = (interaction) => {
        onChange({
            s: interaction.left * 100,
            v: 100 - interaction.top * 100,
        });
    };

    const handleKey = (offset) => {
        // Saturation and brightness always fit into [0, 100] range
        onChange({
            s: clamp(hsva.s + offset.left * 100, 0, 100),
            v: clamp(hsva.v - offset.top * 100, 0, 100),
        });
    };

    const containerStyle = {
        backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
    };

    return (
        <div className="react-colorful__saturation" style={containerStyle}>
            <Interactive
                onMove={handleMove}
                onKey={handleKey}
                aria-label="Color"
                aria-valuetext={`Saturation ${round(
                    hsva.s
                )}%, Brightness ${round(hsva.v)}%`}
            >
                <Pointer
                    className="react-colorful__saturation-pointer"
                    top={1 - hsva.v / 100}
                    left={hsva.s / 100}
                    color={hsvaToHslString(hsva)}
                />
            </Interactive>
        </div>
    );
};

export const Saturation = React.memo(SaturationBase);
