/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

function buildGradientString(steps, type, angle) {
    const sortedSteps = [...steps].sort((a, b) => a.position - b.position);
    const stepsString = sortedSteps
        .map((step) => `${step.color} ${step.position}%`)
        .join(", ");

    return type === "linear"
        ? `linear-gradient(${angle}deg, ${stepsString})`
        : `radial-gradient(circle, ${stepsString})`;
}

export function useGradientPicker(initValue, setValue) {
    const [steps, setSteps] = useState([
        { color: "#ff0000", position: 0 },
        { color: "#0000ff", position: 1 },
    ]);

    const [angle, setAngle] = useState(90);

    const [type, setType] = useState("linear");

    const firstRender = useRef(true);
    useLayoutEffect(() => {
        if (!firstRender.current) {
            return;
        }

        if (initValue.startsWith("linear-gradient")) {
            const [, angle, stepsString] = initValue.match(
                /linear-gradient\((\d+)deg, (.+)\)/
            );
            setSteps(
                stepsString.split(", ").map((step) => {
                    const [color, position] = step.split(" ");
                    return {
                        color,
                        position: parseInt(position),
                    };
                })
            );
            setAngle(parseInt(angle));
            setType("linear");
        } else if (initValue.startsWith("radial-gradient")) {
            const [, stepsString] = initValue.match(
                /radial-gradient\(circle, (.+)\)/
            );
            setSteps(
                stepsString.split(", ").map((step) => {
                    const [color, position] = step.split(" ");
                    return {
                        color,
                        position: parseInt(position),
                    };
                })
            );
            setType("radial");
        }

        firstRender.current = false;
    }, [initValue]);

    useEffect(() => {
        setValue(buildGradientString(steps, type, angle));
    }, [steps, angle, type, setValue]);

    return {
        steps,
        setSteps,
        angle,
        setAngle,
        type,
        setType,
    };
}
