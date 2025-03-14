/** @format */

import { useEffect, useRef, useState } from "react";
import { useEventCallback } from "../hooks/use-event-callback";

export function AnglePicker({ value, onChange }) {
    return (
        <div className="optn-angle-picker">
            <AnglePickerInput value={value} onChange={onChange} />
            <AnglePickerCircle value={value} onChange={onChange} />
        </div>
    );
}

function AnglePickerInput({ value, onChange }) {
    return (
        <input
            type="number"
            min={0}
            max={360}
            value={value}
            onChange={(e) => onChange(e.target.valueAsNumber)}
        />
    );
}

function AnglePickerCircle({ value, onChange }) {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const centerRef = useRef({ x: 0, y: 0 });

    const onChangeCallback = useEventCallback(onChange);

    useEffect(() => {
        if (!isDragging || !ref.current) {
            return;
        }

        const ctrl = new AbortController();

        document.addEventListener(
            "mousemove",
            (e) => {
                e.preventDefault();
                onChangeCallback(
                    getAngle(
                        centerRef.current.x,
                        centerRef.current.y,
                        e.clientX,
                        e.clientY
                    )
                );
            },
            { signal: ctrl.signal }
        );

        document.addEventListener(
            "mouseup",
            () => {
                setIsDragging(false);
            },
            { signal: ctrl.signal }
        );

        return () => ctrl.abort();
    }, [isDragging, onChangeCallback]);

    function handleMouseDown(e) {
        e.preventDefault();

        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        centerRef.current.x = rect.left + rect.width / 2;
        centerRef.current.y = rect.top + rect.height / 2;
        setIsDragging(true);
    }

    return (
        <div
            className="optn-angle-picker-circle"
            onMouseDown={handleMouseDown}
            style={{ transform: `rotate(${value}deg)` }}
            ref={ref}
        >
            <div className="optn-angle-picker-circle-dot"></div>
        </div>
    );
}

function getAngle(centerX, centerY, pointX, pointY) {
    const y = pointY - centerY;
    const x = pointX - centerX;

    const angleInRadians = Math.atan2(y, x);
    const angleInDeg = Math.round(angleInRadians * (180 / Math.PI)) + 90;
    if (angleInDeg < 0) {
        return 360 + angleInDeg;
    }
    return angleInDeg;
}
