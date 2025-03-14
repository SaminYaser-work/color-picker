/** @format */

import React from "react";

import { AnglePicker } from "./AnglePicker";
import { GradientBar } from "./GradientBar";
import { useGradientPicker } from "./use-gradient-picker";

export const GradientPicker = ({ gradient, setGradient }) => {
    const { steps, angle, type, setSteps, setAngle, setType } =
        useGradientPicker(gradient, setGradient);

    console.log(gradient);

    return (
        <div className="optn-gradient-picker" style={{ marginBottom: "2rem" }}>
            <GradientBar
                steps={steps}
                setSteps={setSteps}
                gradient={gradient}
            />
            <AnglePicker value={angle} onChange={setAngle} />
            <div>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                </select>
            </div>
        </div>
    );
};
