"use client";

import { motion, Variants } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Hero() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item: Variants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
    };

    return (
        <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1)_0%,_rgba(0,0,0,0)_50%)] animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />

            <motion.div
                className="text-center z-10 max-w-4xl px-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.h2 variants={item} className="text-sm md:text-base text-blue-400 font-mono mb-4 tracking-widest uppercase">
                    Computer Science Engineering • AIML
                </motion.h2>

                <motion.h1 variants={item} className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">
                    Vedant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Joshi</span>
                </motion.h1>

                <motion.p variants={item} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Student at <strong>Christ University</strong>. Building intelligent systems and immersive web experiences.
                </motion.p>

                <motion.div variants={item} className="flex justify-center gap-4">
                    <a href="#projects">
                        <MagneticButton className="group relative px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </MagneticButton>
                    </a>

                    <a href="#contact">
                        <MagneticButton className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium backdrop-blur-sm transition-all hover:bg-white/10">
                            Contact Me
                        </MagneticButton>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
