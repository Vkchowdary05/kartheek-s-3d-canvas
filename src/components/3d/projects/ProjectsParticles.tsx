import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectsParticlesProps {
    count?: number;
    spread?: number;
}

const ProjectsParticles = ({ count = 400, spread = 10 }: ProjectsParticlesProps) => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        const colorPalette = [
            new THREE.Color('#6366f1'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#60a5fa'),
            new THREE.Color('#5eead4'),
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread particles in a wide area
            positions[i3] = (Math.random() - 0.5) * spread * 2;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 3;

            // Random speeds for anti-gravity float
            speeds[i] = 0.01 + Math.random() * 0.02;

            // Random color
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors, speeds };
    }, [count, spread]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionAttr = pointsRef.current.geometry.attributes.position;
        const positions = positionAttr.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Upward floating (anti-gravity)
            positions[i3 + 1] += speeds[i];

            // Gentle horizontal drift
            positions[i3] += Math.sin(time * 0.3 + i * 0.1) * 0.003;
            positions[i3 + 2] += Math.cos(time * 0.2 + i * 0.05) * 0.002;

            // Reset particles that float too high
            if (positions[i3 + 1] > spread * 0.5) {
                positions[i3 + 1] = -spread * 0.5;
                positions[i3] = (Math.random() - 0.5) * spread * 2;
            }
        }

        positionAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.5}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default ProjectsParticles;
