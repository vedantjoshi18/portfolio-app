"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    description: string;
    className?: string; // For bento grid sizing
}

export default function ProjectCard({ title, category, image, description, className = "" }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ${className}`}
        >
            <div className="block w-full h-full">
                {/* Background Image */}
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    />
                </div>

                {/* Content Overlay */}
                <div
                    style={{ transform: "translateZ(75px)" }}
                    className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                >
                    <p className="text-blue-400 text-xs md:text-sm font-mono mb-1 tracking-wider uppercase">{category}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors mb-2">{title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
