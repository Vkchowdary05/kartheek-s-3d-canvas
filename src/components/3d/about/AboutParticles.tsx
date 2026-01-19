import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AboutParticlesProps {
    count?: number;
    spread?: number;
}

const AboutParticles = ({ count = 400, spread = 10 }: AboutParticlesProps) => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors, speeds, originalY } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        const originalY = new Float32Array(count);

        const colorPalette = [
            new THREE.Color('#6366f1'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#a78bfa'),
            new THREE.Color('#c4b5fd'),
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread particles
            positions[i3] = (Math.random() - 0.5) * spread * 1.5;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.4 - 2;

            originalY[i] = positions[i3 + 1];
            speeds[i] = 0.5 + Math.random() * 1;

            // Color
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors, speeds, originalY };
    }, [count, spread]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionAttr = pointsRef.current.geometry.attributes.position;
        const posArray = positionAttr.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Gentle floating oscillation
            posArray[i3 + 1] = originalY[i] + Math.sin(time * speeds[i] + i) * 0.3;

            // Slight horizontal sway
            posArray[i3] += Math.sin(time * 0.2 + i * 0.1) * 0.002;
        }

        positionAttr.needsUpdate = true;

        // Gentle overall rotation
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

export default AboutParticles;
