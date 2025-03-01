/** @format */

export const EyeDropper = (props) => {
    if (!("EyeDropper" in window)) {
        return null;
    }

    return <EyeDropperBase {...props} />;
};

const EyeDropperBase = (props) => {
    const { setColor } = props;

    const handleClick = async () => {
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            setColor(result.sRGBHex);
        } catch (error) {
            alert("EyeDropper is not supported in your browser");
            console.log(error);
        }
    };

    return <button onClick={handleClick}>E</button>;
};
