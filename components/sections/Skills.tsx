"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
    "Programming": [
        "Python", "C", "C++", "Java", "JavaScript", "TypeScript", "HTML5", "CSS3"
    ],
    "Backend": [
        "Node.js", "Express.js", "MongoDB", "SQL", "REST APIs", "Next.js"
    ],
    "UI": [
        "Figma", "Tailwind CSS", "Framer Motion", "Adobe XD", "Canva", "Responsive Design"
    ]
};

const tabs = Object.keys(skills) as (keyof typeof skills)[];

function SkillCard({ name, index }: { name: string; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
        >
            {/* Radial Gradient Hover Effect */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                }}
            />
            {/* Spotlight Border */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-transparent transition duration-300 group-hover:border-blue-500/50"
                style={{
                    WebkitMaskImage: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                }}
            />

            <div className="relative z-10 flex items-center justify-between">
                <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors text-lg tracking-wide">
                    {name}
                </span>
                {/* Optional: Add an icon or visual indicator here if desired */}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="skills" className="py-32 px-4 md:px-10 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 tracking-tight">
                    Technical Arsenal
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    A curated collection of technologies and tools I master to build the next generation of digital products.
                </p>
            </motion.div>

            <div className="flex flex-col items-center">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-16 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-blue-600/10 border border-blue-500/30 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Bento Grid Content */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {skills[activeTab].map((skill, index) => (
                                <SkillCard key={skill} name={skill} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}