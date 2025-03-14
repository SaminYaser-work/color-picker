/** @format */

import { useEffect, useRef, useState } from "react";

export function GradientBar({ steps, setSteps, gradient }) {
    return (
        <div className="optn-gradient-picker-bar">
            <GradientBackground gradient={gradient} />
            <GradientMarkers steps={steps} setSteps={setSteps} />
        </div>
    );
}

function GradientBackground({ gradient }) {
    return (
        <div
            className="optn-gradient-picker-bar-bg"
            style={{
                background: gradient,
            }}
        />
    );
}

function GradientMarkers({ steps, setSteps }) {
    const [selectedStep, setSelectedStep] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorPickerPosition, setColorPickerPosition] = useState({
        x: 0,
        y: 0,
    });

    const canvasRef = useRef(null);

    // Handle click on the gradient canvas to add a new step
    const handleCanvasClick = (e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const position = Math.min(
            Math.max(0, Math.round((x / rect.width) * 100)),
            100
        );

        // Check if we clicked on an existing pointer (with some tolerance)
        const clickedOnPointer = steps.some((step) => {
            const stepX = (step.position / 100) * rect.width;
            return Math.abs(x - stepX) < 15;
        });

        if (!clickedOnPointer) {
            // Add a new step
            const newStep = {
                color: "#ffffff",
                position,
            };
            setSteps([...steps, newStep]);
            setSelectedStep(steps.length);
            setShowColorPicker(true);
            setColorPickerPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
    };

    // Handle pointer drag
    const handlePointerDrag = (index, e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const position = Math.min(
            Math.max(0, Math.round((x / rect.width) * 100)),
            100
        );

        setSteps(
            steps.map((step, i) => (i === index ? { ...step, position } : step))
        );
    };

    // Handle pointer click to show color picker
    const handlePointerClick = (index, e) => {
        e.stopPropagation();
        setSelectedStep(index);
        setShowColorPicker(true);
        setColorPickerPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    // Handle color change
    // const handleColorChange = (color) => {
    //     if (selectedStep !== null) {
    //         setSteps(
    //             steps.map((step, i) =>
    //                 i === selectedStep ? { ...step, color } : step
    //             )
    //         );
    //     }
    // };

    // Handle delete step
    const handleDeleteStep = (index, e) => {
        e.stopPropagation();

        // Don't allow deleting if we only have 2 steps
        if (steps.length <= 2) return;

        setSteps(steps.filter((_, i) => i !== index));
        setSelectedStep(null);
        setShowColorPicker(false);
    };

    // Close color picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showColorPicker && !e.target) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showColorPicker]);

    return (
        <>
            <div
                ref={canvasRef}
                className="optn-gradient-picker-markers"
                onClick={handleCanvasClick}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="optn-pointer"
                        style={{
                            left: `${step.position}%`,
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();

                            const handleMouseMove = (moveEvent) => {
                                handlePointerDrag(index, moveEvent);
                            };

                            const handleMouseUp = () => {
                                document.removeEventListener(
                                    "mousemove",
                                    handleMouseMove
                                );
                                document.removeEventListener(
                                    "mouseup",
                                    handleMouseUp
                                );
                            };

                            document.addEventListener(
                                "mousemove",
                                handleMouseMove
                            );
                            document.addEventListener("mouseup", handleMouseUp);
                        }}
                        onClick={(e) => handlePointerClick(index, e)}
                    >
                        <div
                            className="optn-pointer-handle"
                            style={{
                                backgroundColor: step.color,
                            }}
                        >
                            {steps.length > 2 && (
                                <button
                                    className="optn-delete-btn"
                                    onClick={(e) => handleDeleteStep(index, e)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Color picker */}
            {/* {showColorPicker && selectedStep !== null && (
                <div
                    className="optn-color-picker"
                    style={{
                        left: `${colorPickerPosition.x}px`,
                        top: `${colorPickerPosition.y + 20}px`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ColorPicker
                        color={steps[selectedStep]?.color || "#ffffff"}
                        onChange={handleColorChange}
                    />
                </div>
            )} */}
        </>
    );
}

// Simple color picker component
function ColorPicker({ color, onChange }) {
    const [currentColor, setCurrentColor] = useState(color);

    const handleChange = (e) => {
        setCurrentColor(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="optn-color-picker-container optn-space-y-sm">
            <div className="optn-color-picker-row">
                <input
                    type="color"
                    value={currentColor}
                    onChange={handleChange}
                    className="optn-color-input"
                />
                <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => {
                        setCurrentColor(e.target.value);
                        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                            onChange(e.target.value);
                        }
                    }}
                    className="optn-color-text"
                />
            </div>
        </div>
    );
}
