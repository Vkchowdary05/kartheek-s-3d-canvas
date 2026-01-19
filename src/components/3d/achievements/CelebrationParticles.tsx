import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CelebrationParticlesProps {
    count?: number;
    spread?: number;
}

const CelebrationParticles = ({ count = 500, spread = 10 }: CelebrationParticlesProps) => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors, velocities, originalY } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const originalY = new Float32Array(count);

        // Celebration colors - gold, blue, pink, green, purple
        const colorPalette = [
            new THREE.Color('#fcd34d'), // Gold
            new THREE.Color('#60a5fa'), // Blue
            new THREE.Color('#f472b6'), // Pink
            new THREE.Color('#86efac'), // Green
            new THREE.Color('#a78bfa'), // Purple
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread from center
            positions[i3] = (Math.random() - 0.5) * spread * 1.5;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 2;

            originalY[i] = positions[i3 + 1];

            // Upward velocity (anti-gravity celebration)
            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = Math.random() * 0.015 + 0.005;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

            // Random celebration color
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors, velocities, originalY };
    }, [count, spread]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionAttr = pointsRef.current.geometry.attributes.position;
        const posArray = positionAttr.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Floating upward (anti-gravity)
            posArray[i3 + 1] += velocities[i3 + 1];

            // Gentle sway
            posArray[i3] += Math.sin(time + i * 0.1) * 0.003;
            posArray[i3 + 2] += Math.cos(time * 0.5 + i * 0.05) * 0.002;

            // Reset particles that float too high
            if (posArray[i3 + 1] > spread * 0.6) {
                posArray[i3 + 1] = -spread * 0.5;
                posArray[i3] = (Math.random() - 0.5) * spread * 1.5;
            }
        }

        positionAttr.needsUpdate = true;

        // Gentle rotation
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
                size={0.07}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default CelebrationParticles;
