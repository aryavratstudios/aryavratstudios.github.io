"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    showGlow?: boolean;
    size?: number;
}

export function Logo({ className, showGlow = true, size = 40 }: LogoProps) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {showGlow && (
                <div
                    className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse-slow"
                    style={{ width: size, height: size }}
                />
            )}
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Image
                    src="/logo.jpg"
                    alt="Aryavrat Studios"
                    width={size}
                    height={size}
                    className="relative z-10 object-contain rounded-lg"
                    priority
                />
            </motion.div>
        </div>
    );
}
