/** @format */

import { round } from "./round";

/**
 * Valid CSS <angle> units.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
const angleUnits = {
    grad: 360 / 400,
    turn: 360,
    rad: 360 / (Math.PI * 2),
};

export const hexToHsva = (hex) => rgbaToHsva(hexToRgba(hex));

export const hexToRgba = (hex) => {
    if (hex[0] === "#") hex = hex.substring(1);

    if (hex.length < 6) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a:
                hex.length === 4
                    ? round(parseInt(hex[3] + hex[3], 16) / 255, 2)
                    : 1,
        };
    }

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
        a:
            hex.length === 8
                ? round(parseInt(hex.substring(6, 8), 16) / 255, 2)
                : 1,
    };
};

export const parseHue = (value, unit = "deg") => {
    return Number(value) * (angleUnits[unit] || 1);
};

export const hslaStringToHsva = (hslString) => {
    const matcher =
        /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(hslString);

    if (!match) return { h: 0, s: 0, v: 0, a: 1 };

    return hslaToHsva({
        h: parseHue(match[1], match[2]),
        s: Number(match[3]),
        l: Number(match[4]),
        a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
    });
};

export const hslaToHsva = ({ h, s, l, a }) => {
    s *= (l < 50 ? l : 100 - l) / 100;

    return {
        h: h,
        s: s > 0 ? ((2 * s) / (l + s)) * 100 : 0,
        v: l + s,
        a,
    };
};

export const hsvaToHex = (hsva) => rgbaToHex(hsvaToRgba(hsva));

export const hsvaToHsla = ({ h, s, v, a }) => {
    const hh = ((200 - s) * v) / 100;

    return {
        h: round(h),
        s: round(
            hh > 0 && hh < 200
                ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100
                : 0
        ),
        l: round(hh / 2),
        a: round(a, 2),
    };
};

export const hsvaToHslString = (hsva) => {
    const { h, s, l } = hsvaToHsla(hsva);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

export const hsvaToHslaString = (hsva) => {
    const { h, s, l, a } = hsvaToHsla(hsva);
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

export const hsvaToRgba = ({ h, s, v, a }) => {
    h = (h / 360) * 6;
    s = s / 100;
    v = v / 100;

    const hh = Math.floor(h),
        b = v * (1 - s),
        c = v * (1 - (h - hh) * s),
        d = v * (1 - (1 - h + hh) * s),
        module = hh % 6;

    return {
        r: round([v, c, b, b, d, v][module] * 255),
        g: round([d, v, v, c, b, b][module] * 255),
        b: round([b, b, d, v, v, c][module] * 255),
        a: round(a, 2),
    };
};

export const hsvaStringToHsva = (hsvString) => {
    const matcher =
        /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(hsvString);

    if (!match) return { h: 0, s: 0, v: 0, a: 1 };

    return roundHsva({
        h: parseHue(match[1], match[2]),
        s: Number(match[3]),
        v: Number(match[4]),
        a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
    });
};

export const rgbaStringToHsva = (rgbaString) => {
    const matcher =
        /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(rgbaString);

    if (!match) return { h: 0, s: 0, v: 0, a: 1 };

    return rgbaToHsva({
        r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
        g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
        b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
        a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
    });
};

const format = (number) => {
    const hex = number.toString(16);
    return hex.length < 2 ? "0" + hex : hex;
};

export const rgbaToHex = ({ r, g, b, a }) => {
    const alphaHex = a < 1 ? format(round(a * 255)) : "";
    return "#" + format(r) + format(g) + format(b) + alphaHex;
};

export const rgbaToHsva = ({ r, g, b, a }) => {
    const max = Math.max(r, g, b);
    const delta = max - Math.min(r, g, b);

    // prettier-ignore
    const hh = delta
    ? max === r
      ? (g - b) / delta
      : max === g
        ? 2 + (b - r) / delta
        : 4 + (r - g) / delta
    : 0;

    return {
        h: round(60 * (hh < 0 ? hh + 6 : hh)),
        s: round(max ? (delta / max) * 100 : 0),
        v: round((max / 255) * 100),
        a,
    };
};


export const roundHsva = (hsva) => ({
    h: round(hsva.h),
    s: round(hsva.s),
    v: round(hsva.v),
    a: round(hsva.a, 2),
});

