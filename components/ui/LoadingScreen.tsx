"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "./TerminalWindow";

interface LoadingScreenProps {
    onComplete: () => void;
}

const bootSequence = [
    "Initializing core systems...",
    "Loading 3D environment modules...",
    "Verifying security protocols...",
    "Optimizing graphical assets...",
    "Establishing secure connection...",
    "Access Granted."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < bootSequence.length) {
                setLogs(prev => [...prev, bootSequence[currentIndex]]);
                currentIndex++;
                setProgress(prev => Math.min(prev + 15, 100));
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 800); // Wait a bit after completion before hiding
            }
        }, 400);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
            <div className="w-full max-w-md px-4">
                <TerminalWindow title="system_boot.sh" className="border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <div className="space-y-2 font-mono text-sm">
                        {logs.map((log, index) => {
                            if (!log) return null;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-blue-400"
                                >
                                    <span className="text-blue-500 mr-2">➜</span>
                                    {log}
                                </motion.div>
                            );
                        })}
                        <motion.div
                            className="h-1 bg-blue-900/30 w-full mt-4 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min((logs.length / bootSequence.length) * 100, 100)}%` }}
                            />
                        </motion.div>
                    </div>
                </TerminalWindow>
            </div>
        </motion.div>
    );
}
