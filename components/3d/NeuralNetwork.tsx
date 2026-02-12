"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Simple stable random for purity
const seededRandom = (s: number) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
};

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null);
  const lineMesh = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (seededRandom(i * 1.1) - 0.5) * 40;
      const y = (seededRandom(i * 2.2) - 0.5) * 40;
      const z = (seededRandom(i * 3.3) - 0.5) * 40;
      temp.push({
        x, y, z,
        vx: (seededRandom(i * 4.4) - 0.5) * 0.02,
        vy: (seededRandom(i * 5.5) - 0.5) * 0.02,
        vz: (seededRandom(i * 6.6) - 0.5) * 0.02
      });
    }
    return temp;
  }, [count]);

  const initialPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const initialLinePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  // We use the arrays themselves for mutation in useFrame, 
  // they are stable because they are memoized.
  useFrame(() => {
    if (!mesh.current || !lineMesh.current) return;

    const positions = initialPositions;
    const linePositions = initialLinePositions;
    let lineIndex = 0;
    const maxDist = 8;

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Bounce
      if (Math.abs(p.x) > 20) p.vx *= -1;
      if (Math.abs(p.y) > 20) p.vy *= -1;
      if (Math.abs(p.z) > 20) p.vz *= -1;

      // Mouse interaction
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          linePositions[lineIndex++] = positions[i * 3];
          linePositions[lineIndex++] = positions[i * 3 + 1];
          linePositions[lineIndex++] = positions[i * 3 + 2];
          linePositions[lineIndex++] = positions[j * 3];
          linePositions[lineIndex++] = positions[j * 3 + 1];
          linePositions[lineIndex++] = positions[j * 3 + 2];
        }
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    lineMesh.current.geometry.attributes.position.needsUpdate = true;
    lineMesh.current.geometry.setDrawRange(0, lineIndex / 3);
  });

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={initialPositions.length / 3}
            array={initialPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#4fb3ff" transparent opacity={0.6} />
      </points>
      <lineSegments ref={lineMesh}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={initialLinePositions.length / 3}
            array={initialLinePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4fb3ff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <fog attach="fog" args={["black", 15, 45]} />
        <ambientLight intensity={0.5} />
        <Particles count={120} />
      </Canvas>
    </div>
  );
}
