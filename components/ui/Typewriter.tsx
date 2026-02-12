"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    cursor?: boolean;
}

export default function Typewriter({
    text,
    delay = 0,
    speed = 50,
    className = "",
    cursor = true,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayedText(text.substring(0, i));
            if (i >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started]);

    return (
        <span className={`${className} font-mono`}>
            {displayedText}
            {cursor && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-5 ml-1 align-middle bg-terminal-green"
                />
            )}
        </span>
    );
}
