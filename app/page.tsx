"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />

          <footer className="py-20 text-center border-t border-white/5 mx-10">
            <p className="text-gray-500 text-sm mb-2 font-mono">
              SYSTEM_STATUS: <span className="text-terminal-green">OPERATIONAL</span>
            </p>
            <p className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} Vedant Joshi. Built with Next.js, Three.js & Passion.
            </p>
          </footer>
        </motion.main>
      )}
    </AnimatePresence>
  );
}