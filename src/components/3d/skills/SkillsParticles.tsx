import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillsParticlesProps {
    count?: number;
    spread?: number;
}

const SkillsParticles = ({ count = 500, spread = 8 }: SkillsParticlesProps) => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color('#f59e0b'), // Languages - amber
            new THREE.Color('#06b6d4'), // Frontend - cyan
            new THREE.Color('#10b981'), // Backend - emerald
            new THREE.Color('#8b5cf6'), // Database - violet
            new THREE.Color('#ec4899'), // Tools - pink
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = spread * (0.5 + Math.random() * 0.5);

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);

            // Random velocities for orbital motion
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors, velocities };
    }, [count, spread]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime;
        const positionAttr = pointsRef.current.geometry.attributes.position;
        const positions = positionAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Orbital motion around center
            const x = positions[i3];
            const z = positions[i3 + 2];
            const angle = 0.002;

            positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
            positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

            // Gentle vertical oscillation
            positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
        }

        positionAttr.needsUpdate = true;

        // Rotate entire particle system
        pointsRef.current.rotation.y = time * 0.02;
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
                size={0.05}
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

export default SkillsParticles;
