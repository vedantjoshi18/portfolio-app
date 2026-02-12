"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        title: "Astral Esports Club",
        role: "Valorant Head",
        company: "Christ University",
        date: "2025 - 2026",
        description: "Leading the university's Valorant team, organizing tournaments, and fostering a competitive esports community.",
    },
    {
        title: "CAADS",
        role: "Department Club Volunteer",
        company: "Christite Association of AIML and DS",
        date: "Present",
        description: "Actively volunteering in departmental events, workshops, and technical sessions to promote AI/ML learning.",
    },
    {
        title: "Drishti",
        role: "Core Member",
        company: "Centre for Social Action Street Play Club",
        date: "2025 - 2028",
        description: "Using street plays as a medium to raise social awareness and drive community impact initiatives.",
    },
    {
        title: "University Choir",
        role: "Member",
        company: "Christ University",
        date: "2025 - 2028",
        description: "Contributing to the university's cultural heritage through musical performances and choir events.",
    },
    {
        title: "IEEE",
        role: "Member",
        company: "Computer Society",
        date: "2024 - 2028",
        description: "Active member of the world's largest technical professional organization.",
        subRole: "IEEE Execom Member",
    },
    {
        title: "University Sports Department",
        role: "Class Sports Representative",
        company: "Christ University",
        date: "2025 - 2028",
        description: "Representing the class in various sports events and competitions throughout the University and outside the University.",
    }
];

function TimelineNode({ experience, index, isLast }: { experience: typeof experiences[0]; index: number; isLast: boolean }) {
    return (
        <div className="relative flex gap-8 pb-12">
            {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-transparent opacity-30" />
            )}

            <div className="relative mt-2">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-6 h-6 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center z-10"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
            >
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {experience.title}
                    </h3>
                    <span className="text-sm font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        {experience.date}
                    </span>
                </div>
                <p className="text-gray-300 font-medium mb-2">{experience.role} • {experience.company}</p>
                {experience.subRole && (
                    <div className="mb-3 inline-block">
                        <span className="text-xs font-bold text-terminal-green uppercase tracking-wider border border-terminal-green/30 px-2 py-0.5 rounded bg-terminal-green/10">
                            ➜ {experience.subRole}
                        </span>
                    </div>
                )}
                <p className="text-gray-400 text-sm leading-relaxed">{experience.description}</p>
            </motion.div>
        </div>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-4 md:px-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 tracking-tight">
                    Journey & Experience
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    A timeline of my professional growth, community involvement, and technical contributions in university fests.
                </p>
            </motion.div>

            <div className="relative">
                {experiences.map((exp, index) => (
                    <TimelineNode
                        key={exp.title}
                        experience={exp}
                        index={index}
                        isLast={index === experiences.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
