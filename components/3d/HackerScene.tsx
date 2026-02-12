"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Wireframe } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingTorus() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <TorusKnot args={[10, 3, 100, 16]} ref={meshRef}>
            <meshBasicMaterial color="black" />
            <Wireframe
                stroke={"#00ff41"}
                strokeOpacity={0.15}
                fillOpacity={0}
                thickness={0.05}
            />
        </TorusKnot>
    );
}

export default function HackerScene() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                <fog attach="fog" args={["black", 15, 35]} />
                <ambientLight intensity={0.5} />
                <RotatingTorus />
            </Canvas>
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-80 pointer-events-none" />
        </div>
    );
}
