/** @format */

import { useState } from "react";
import { HexColorPicker } from "./HexColorPicker";
import "./style.css";

export const MyColorPicker = () => {
    const [color, setColor] = useState("#aabbcc");
    console.log(color);
    return (
        <>
            <HexColorPicker color={color} onChange={setColor} />
        </>
    );
};
