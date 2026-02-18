"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseFollower() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Subtle cursor glow - much smaller and less intrusive */}
            <motion.div
                className="pointer-events-none fixed z-50 hidden md:block"
                animate={{
                    x: mousePosition.x - 100,
                    y: mousePosition.y - 100,
                    opacity: isVisible ? 0.08 : 0,
                }}
                transition={{
                    type: "spring",
                    damping: 35,
                    stiffness: 180,
                    mass: 0.6,
                }}
                style={{
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />
        </>
    );
}
