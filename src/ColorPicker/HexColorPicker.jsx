/** @format */

import "./style.css";

import React from "react";

import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";
import { ColorPicker } from "./ColorPicker";

const colorModel = {
    defaultColor: "000",
    toHsva: hexToHsva,
    fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
    equal: equalHex,
};

export const HexColorPicker = (props) => (
    <ColorPicker {...props} colorModel={colorModel} />
);
