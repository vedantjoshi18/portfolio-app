"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollDimmer() {
    const { scrollY } = useScroll();

    // Map scroll position [0, 600] to opacity [0, 0.8]
    // 0 = Fully transparent (Bright background)
    // 0.8 = Dark overlay (Better readability for sections below)
    const opacity = useTransform(scrollY, [0, 600], [0, 0.8]);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 w-full h-full bg-black pointer-events-none z-[-5]"
            aria-hidden="true"
        />
    );
}
