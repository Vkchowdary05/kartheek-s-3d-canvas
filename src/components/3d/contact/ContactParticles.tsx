import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactParticlesProps {
    count?: number;
    spread?: number;
}

const ContactParticles = ({ count = 800, spread = 12 }: ContactParticlesProps) => {
    const pointsRef = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Generate particle positions and attributes
    const { positions, colors, sizes, velocities, originalPositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const velocities = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color('#6366f1'), // Indigo
            new THREE.Color('#8b5cf6'), // Violet
            new THREE.Color('#a78bfa'), // Light violet
            new THREE.Color('#60a5fa'), // Blue
            new THREE.Color('#5eead4'), // Teal
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread particles in a box with more toward edges
            const x = (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread * 0.8;
            const z = (Math.random() - 0.5) * spread * 0.5 - 3;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            // Random velocities for floating effect
            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = Math.random() * 0.02 + 0.005; // Upward bias (anti-gravity)
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 3 + 1;
        }

        return { positions, colors, sizes, velocities, originalPositions };
    }, [count, spread]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const positionAttr = pointsRef.current.geometry.attributes.position;
        const positions = positionAttr.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Anti-gravity floating motion
            positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
            positions[i3 + 1] += velocities[i3 + 1] * delta * 30;
            positions[i3 + 2] += Math.cos(time * 0.3 + i * 0.05) * 0.001;

            // Reset particles that float too high
            if (positions[i3 + 1] > spread * 0.5) {
                positions[i3 + 1] = -spread * 0.4;
                positions[i3] = originalPositions[i3] + (Math.random() - 0.5) * 2;
                positions[i3 + 2] = originalPositions[i3 + 2];
            }

            // Gentle attraction to mouse (if hovered)
            const mouseX = mouseRef.current.x * spread * 0.5;
            const mouseY = mouseRef.current.y * spread * 0.4;
            const dx = mouseX - positions[i3];
            const dy = mouseY - positions[i3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 3) {
                positions[i3] += dx * 0.001;
                positions[i3 + 1] += dy * 0.001;
            }
        }

        positionAttr.needsUpdate = true;

        // Gentle rotation of entire particle system
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
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
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

export default ContactParticles;
