"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "EventHub",
        category: "University Event Management • Full Stack",
        image: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?q=80&w=2670&auto=format&fit=crop",
        description: "A comprehensive platform for managing university events, streamlining registration, tracking attendance, and facilitating real-time communication between organizers and students.",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        title: "Proposition Calculator",
        category: "Logic • Math",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        description: "An advanced tool for evaluating logical propositions, generating truth tables, and simplifying complex boolean expressions for students and professionals.",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        title: "Prosthetic Arm",
        category: "Robotics • Engineering",
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2662&auto=format&fit=crop",
        description: "Designed and 3D-printed a low-cost, functional prosthetic arm with EMG sensor integration for intuitive user control.",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 4,
        title: "Smart Shelter",
        category: "IoT • Automation",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2598&auto=format&fit=crop",
        description: "IoT-enabled shelter system monitoring environmental conditions and managing resources efficiently for sustainable living.",
        className: "md:col-span-2 md:row-span-1",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4 tracking-tight">
                    Selected Works
                </h2>
                <p className="text-gray-400 max-w-xl text-lg">
                    A showcase of my recent projects involving full-stack development, IoT, and creative UI experimentation.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={project.className}
                    >
                        <ProjectCard
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            description={project.description}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}