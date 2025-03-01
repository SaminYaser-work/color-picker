/** @format */

import React from "react";

import { clamp } from "../utils/clamp";
import { hsvaToHslaString } from "../utils/convert";
import { round } from "../utils/round";
import { Interactive } from "./Interaction";
import { Pointer } from "./Pointer";

export const Alpha = ({ hsva, onChange }) => {
    const handleMove = (interaction) => {
        onChange({ a: interaction.left });
    };

    const handleKey = (offset) => {
        onChange({ a: clamp(hsva.a + offset.left) });
    };

    const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
    const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));

    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
    };

    const ariaValue = round(hsva.a * 100);

    return (
        <div className={"react-colorful__alpha"}>
            <div
                className="react-colorful__alpha-gradient"
                style={gradientStyle}
            />
            <Interactive
                onMove={handleMove}
                onKey={handleKey}
                aria-label="Alpha"
                aria-valuetext={`${ariaValue}%`}
                aria-valuenow={ariaValue}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <Pointer
                    className="react-colorful__alpha-pointer"
                    left={hsva.a}
                    color={hsvaToHslaString(hsva)}
                />
            </Interactive>
        </div>
    );
};
