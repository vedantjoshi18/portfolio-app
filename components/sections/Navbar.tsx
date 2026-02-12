"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Terminal } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
        >
            <div className="pointer-events-auto flex items-center gap-8 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg hover:border-terminal-green/30 transition-colors">
                <Link href="/" className="text-white hover:text-terminal-green transition-colors">
                    <Terminal size={20} />
                </Link>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex gap-6 text-sm font-medium text-gray-400">
                    <Link href="#" className="hover:text-white transition-colors">Who Am I?</Link>
                    <Link href="#" className="hover:text-white transition-colors">Things I Create</Link>
                    <Link href="#" className="hover:text-white transition-colors">Skills</Link>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex gap-4 text-gray-400">
                    <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">
                        <Github size={18} />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">
                        <Linkedin size={18} />
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
