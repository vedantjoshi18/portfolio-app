"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

interface CardProps {
    title: string;
    description: string;
    tech: string[];
    color: string;
    index: number;
    total: number;
}

function Card({ title, description, tech, color, index, total }: CardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
        <motion.div
            style={{ x, y, rotateX, rotateY, z: index * -50, zIndex: total - index }}
            drag
            dragConstraints={{ left: -1000, right: 1000, top: -500, bottom: 500 }}
            dragElastic={0.1}
            whileHover={{ scale: 1.05, cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
            className={`absolute w-72 h-96 rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-2xl backdrop-blur-md ${color}`}
        >
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                    <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-white/10 text-white border border-white/5"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

const projects = [
    {
        title: "Event Management App",
        description: "A comprehensive platform for organizing and managing events seamlessly.",
        tech: ["Angular", "Node.js", "Express", "MongoDB"],
        color: "bg-zinc-900",
    },
    {
        title: "Prosthetic Arm",
        description: "Smart prosthetic limb with advanced control systems and sensors.",
        tech: ["IoT", "C++", "3D Printing", "Sensors"],
        color: "bg-neutral-900",
    },
];

export default function Deck() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {projects.map((project, index) => (
                <Card
                    key={index}
                    {...project}
                    index={index}
                    total={projects.length}
                />
            ))}
        </div>
    );
}
