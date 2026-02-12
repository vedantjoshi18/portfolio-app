"use client";

import { motion } from "framer-motion";
import TerminalWindow from "../ui/TerminalWindow";

const bioLines = [
    { prefix: ">", text: "NAME: Vedant Joshi", color: "text-white" },
    { prefix: ">", text: "ROLE: Full Stack Developer", color: "text-white" },
    { prefix: ">", text: "LOCATION: Earth (For now)", color: "text-gray-400" },
    { prefix: ">", text: "---", color: "text-gray-600" },
    {
        prefix: ">",
        text: "BIO: Passionate about building scalable applications and exploring AI/ML.",
        color: "text-gray-300",
    },
    {
        prefix: ">",
        text: "CURRENT_STACK: [Next.js, Three.js, Python, TypeScript, MongoDB]",
        color: "text-terminal-green",
    },
];

export default function About() {
    return (
        <section className="w-full py-20 px-4 md:px-20 flex flex-col items-center justify-center bg-transparent relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl"
            >
                <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-10 text-center">
                    <span className="text-terminal-green">&gt;</span> ./whoami
                </h2>

                <TerminalWindow title="user@vedant:~/profile">
                    <div className="space-y-4 font-mono text-sm md:text-base">
                        {bioLines.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex gap-4"
                            >
                                <span className="text-terminal-dim select-none">{line.prefix}</span>
                                <span className={line.color}>{line.text}</span>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: bioLines.length * 0.1 + 0.5 }}
                            className="mt-4 animate-pulse text-terminal-green"
                        >
                            _
                        </motion.div>
                    </div>
                </TerminalWindow>
            </motion.div>
        </section>
    );
}
