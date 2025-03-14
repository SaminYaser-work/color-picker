/** @format */

import { useState } from "react";
import "./App.css";
import { ColorPicker } from "./ColorPicker";
import { GradientPicker } from "./ColorPicker/GradientPicker";

function App() {
    return (
        <div>
            <MyGradientPicker />
            <MyColorPicker />
        </div>
    );
}

function MyGradientPicker() {
    const [gradient, setGradient] = useState(
        "linear-gradient(90deg, #ff0000 0%, #0000ff 100%)"
    );

    return (
        <>
            <h1>Gradient Picker</h1>
            <GradientPicker gradient={gradient} setGradient={setGradient} />
        </>
    );
}

function MyColorPicker() {
    const [color, setColor] = useState("#aabbcc");

    return (
        <>
            <h1>Color Picker</h1>
            <ColorPicker color={color} setColor={setColor} />
        </>
    );
}

export default App;
