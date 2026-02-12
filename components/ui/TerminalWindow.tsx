"use client";

import { motion } from "framer-motion";
import React from "react";

interface TerminalWindowProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function TerminalWindow({
    children,
    title = "zsh",
    className = "",
}: TerminalWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full rounded-xl overflow-hidden border border-[#333] bg-black/90 backdrop-blur-md shadow-2xl ${className}`}
        >
            {/* Title Bar */}
            <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b border-[#333] relative">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-gray-400 opacity-70">
                    {title}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 font-mono text-sm dark:bg-black/90 text-gray-300">
                {children}
            </div>
        </motion.div>
    );
}
