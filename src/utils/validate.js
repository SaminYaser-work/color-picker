/** @format */

const matcher = /^#?([0-9A-F]{3,8})$/i;

export const validHex = (value) => {
    const match = matcher.exec(value);
    const length = match ? match[1].length : 0;

    return (
        length === 3 || // '#rgb' format
        length === 6 || // '#rrggbb' format
        length === 4 || // '#rgba' format
        length === 8 // '#rrggbbaa' format
    );
};

export const validRGB = (value) => {
    return /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/.test(
        value
    );
};
