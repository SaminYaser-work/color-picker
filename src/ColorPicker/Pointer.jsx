/** @format */

import React from "react";

export const Pointer = ({ color, left, top = 0.5 }) => {
    const style = {
        top: `${top * 100}%`,
        left: `${left * 100}%`,
    };

    return (
        <div className={"react-colorful__pointer"} style={style}>
            <div
                className="react-colorful__pointer-fill"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};
