"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
    value: number;
    direction?: "up" | "down";
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

export function Counter({
    value,
    direction = "up",
    duration = 2,
    className = "",
    prefix = "",
    suffix = "",
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView, value, direction]);

    useEffect(
        () =>
            springValue.on("change", (latest) => {
                if (ref.current) {
                    ref.current.textContent = Intl.NumberFormat("en-US").format(
                        Math.floor(latest)
                    );
                }
            }),
        [springValue]
    );

    return (
        <span className={className}>
            {prefix}
            <span ref={ref} />
            {suffix}
        </span>
    );
}
