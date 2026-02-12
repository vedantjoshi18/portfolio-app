"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function RotatingSphere({ count = 1100 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    const [particles, velocities] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const vels = new Float32Array(count * 3);
        const radius = 20;

        for (let i = 0; i < count; i++) {
            // Fibonacci Sphere distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / count);
            const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            vels[i * 3] = (Math.random() - 0.5) * 0.02;
            vels[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            vels[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
        return [positions, vels];
    }, [count]);

    // Increase buffer size significantly to avoid "empty sides" (clipping)
    const maxConnections = count * 40;
    const linePositions = useMemo(() => new Float32Array(maxConnections * 3), [maxConnections]);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

        let vertexIndex = 0;
        const connectionDistance = 4.5; // Tuning for 1100 points & R20

        // Update Lines
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = particles[i * 3] - particles[j * 3];
                const dy = particles[i * 3 + 1] - particles[j * 3 + 1];
                const dz = particles[i * 3 + 2] - particles[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < connectionDistance * connectionDistance) {
                    if (vertexIndex < maxConnections * 3 - 6) {
                        linePositions[vertexIndex++] = particles[i * 3];
                        linePositions[vertexIndex++] = particles[i * 3 + 1];
                        linePositions[vertexIndex++] = particles[i * 3 + 2];
                        linePositions[vertexIndex++] = particles[j * 3];
                        linePositions[vertexIndex++] = particles[j * 3 + 1];
                        linePositions[vertexIndex++] = particles[j * 3 + 2];
                    }
                }
            }
        }

        linesRef.current.geometry.setDrawRange(0, vertexIndex / 3);
        linesRef.current.geometry.attributes.position.needsUpdate = true;

        // Constant Rotation
        groupRef.current.rotation.y += 0.002;

        // Breathing Effect
        const time = state.clock.getElapsedTime();
        const scale = 1 + 0.1 * Math.sin(time * 0.5);
        groupRef.current.scale.set(scale, scale, scale);

        // Mouse Interaction
        const x = (mouse.x * viewport.width) / 100;
        const y = (mouse.y * viewport.height) / 100;
        groupRef.current.rotation.x = y * 0.5;
        groupRef.current.rotation.z = x * 0.5;
    });

    return (
        <group ref={groupRef}>
            <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
                {/* @ts-ignore */}
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.12}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#60a5fa"
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

export default function DepthFieldNetwork() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 65], fov: 40 }}>
                <fog attach="fog" args={["black", 40, 90]} />
                <ambientLight intensity={0.5} />
                <RotatingSphere count={1100} />
            </Canvas>
        </div>
    );
}
