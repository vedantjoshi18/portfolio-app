"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import TerminalWindow from "../ui/TerminalWindow";

export default function Contact() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ type: "input" | "response"; text: string }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        setHistory((prev) => [...prev, { type: "input", text: input }]);
        setInput("");
        setIsProcessing(true);

        setTimeout(() => {
            let response = "";
            if (cmd.includes("hello") || cmd.includes("hi there")) {
                response = "Greetings, user. How can I assist you today?";
            } else if (cmd == "github") {
                response = "Here is my Github to connect with me: https://github.com/vedantjoshi18. Type 'copy github' to copy.";
            } else if (cmd === "copy github") {
                navigator.clipboard.writeText("https://github.com/vedantjoshi18");
                response = "Github copied to clipboard!";
            } else if (cmd === "email") {
                response = "You can reach me at: vedantjosh5@gmail.com. Type 'copy email' to copy.";
            } else if (cmd === "phone") {
                response = "My contact number is: 9606157692. Type 'copy phone' to copy.";
            } else if (cmd === "copy email") {
                navigator.clipboard.writeText("vedantjosh5@gmail.com");
                response = "Email copied to clipboard!";
            } else if (cmd === "copy phone") {
                navigator.clipboard.writeText("9606157692");
                response = "Phone number copied to clipboard!";
            } else if (cmd.includes("hire") || cmd.includes("work")) {
                response = "Here is my Linkedin to connect with me: https://www.linkedin.com/in/vedant-joshi-1237b8315/. Type 'copy linkedin' to copy.";
            } else if (cmd === "copy linkedin") {
                navigator.clipboard.writeText("https://www.linkedin.com/in/vedant-joshi-1237b8315/");
                response = "Linkedin copied to clipboard!";
            } else if (cmd === "help") {
                response = "Available commands: email, phone, hire, clear, status, github";
            } else if (cmd === "status") {
                response = "I am currently open to new opportunities! Let's build something amazing together.";
            } else if (cmd === "clear") {
                setHistory([]);
                setIsProcessing(false);
                return;
            } else {
                response = `Command not recognized: ${cmd}. Type 'help' for available commands.`;
            }

            setHistory((prev) => [...prev, { type: "response", text: response }]);
            setIsProcessing(false);
        }, 600);
    };

    return (
        <section id="contact" className="py-32 px-4 md:px-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 tracking-tight">
                    Get In Touch
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    Have a question or want to work together? Drop a message in the terminal below.
                </p>
            </motion.div>

            <TerminalWindow title="vedant@portfolio:~/messages">
                <div
                    ref={scrollRef}
                    className="h-[400px] overflow-y-auto font-mono text-sm md:text-base p-2 space-y-4 scrollbar-hide"
                >
                    <div className="text-terminal-green opacity-70">
                        Type &apos;help&apos; to see available commands or try &apos;email&apos; or &apos;phone&apos;!
                    </div>

                    {history.map((item, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {item.type === "input" ? (
                                <div className="flex gap-2 text-white">
                                    <span className="text-terminal-green">➜</span>
                                    <span className="text-blue-400">~/guest</span>
                                    <span>{item.text}</span>
                                </div>
                            ) : (
                                <div className="flex gap-2 text-gray-400">
                                    <span className="text-purple-500">◈</span>
                                    <p>{item.text}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {isProcessing && (
                        <div className="flex gap-2 text-gray-500 animate-pulse">
                            <span>Processing...</span>
                        </div>
                    )}

                    <form onSubmit={handleCommand} className="flex gap-2 group">
                        <span className="text-terminal-green">➜</span>
                        <span className="text-blue-400">~/guest</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white caret-blue-500"
                        />
                    </form>
                </div>
            </TerminalWindow>
        </section>
    );
}
