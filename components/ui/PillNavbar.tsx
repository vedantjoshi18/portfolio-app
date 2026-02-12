"use client";

import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { Home, User, Briefcase, Code, Linkedin, Github, MessageSquare } from "lucide-react";

function NavIcon({ children, mouseX, name }: { children: React.ReactNode; mouseX: MotionValue<number>; name: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square rounded-full flex items-center justify-center relative group"
        >
            <span className="flex flex-col items-center gap-1">
                {children}
                <span className="text-[10px] opacity-0 group-hover:opacity-100 absolute -top-10 px-2 py-1 bg-black/80 rounded border border-white/10 transition-opacity whitespace-nowrap">
                    {name}
                </span>
            </span>
        </motion.div>
    );
}

export default function PillNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const mouseX = useMotionValue(Infinity);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const links = [
        { name: "Home", icon: <Home className="w-5 h-5" />, href: "#home" },
        { name: "About", icon: <User className="w-5 h-5" />, href: "#about" },
        { name: "Projects", icon: <Briefcase className="w-5 h-5" />, href: "#projects" },
        { name: "Skills", icon: <Code className="w-5 h-5" />, href: "#skills" },
        { name: "Contact", icon: <MessageSquare className="w-5 h-5" />, href: "#contact" },
    ];

    const socialLinks = [
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "http://www.linkedin.com/in/vedant-joshi-1237b8315" },
        { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/vedantjoshi18" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: 100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="pointer-events-auto flex items-end gap-2 px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-[15px] border border-white/10 shadow-2xl"
            >
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.querySelector(link.href);
                            if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <NavIcon mouseX={mouseX} name={link.name}>
                            {link.icon}
                        </NavIcon>
                    </Link>
                ))}

                <div className="w-[1px] h-8 bg-white/10 mx-1 self-center" />

                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <NavIcon mouseX={mouseX} name={link.name}>
                            {link.icon}
                        </NavIcon>
                    </Link>
                ))}
            </motion.div>
        </motion.nav>
    );
}