import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleGalaxyProps {
    count?: number;
    radius?: number;
}

const ParticleGalaxy = ({ count = 3000, radius = 8 }: ParticleGalaxyProps) => {
    const pointsRef = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        // Soft, calming color palette - lavender and sky blue
        const colorPalette = [
            new THREE.Color('#C084FC'), // Soft lavender
            new THREE.Color('#A78BFA'), // Light purple
            new THREE.Color('#7DD3FC'), // Gentle sky blue
            new THREE.Color('#67E8F9'), // Cyan
            new THREE.Color('#DDD6FE'), // Very light lavender
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spiral galaxy distribution
            const angle = (i / count) * Math.PI * 6 + Math.random() * 0.3;
            const spiralRadius = (i / count) * radius + Math.random() * 1.5;
            const armOffset = Math.random() * 0.3 - 0.15;

            positions[i3] = Math.cos(angle) * spiralRadius + armOffset;
            positions[i3 + 1] = (Math.random() - 0.5) * 1.5;
            positions[i3 + 2] = Math.sin(angle) * spiralRadius + armOffset - 5;

            // Colors from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 0.06 + 0.02;
        }

        return { positions, colors, sizes };
    }, [count, radius]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime;

        // Slower, more gentle rotation
        pointsRef.current.rotation.y = time * 0.03;
    });

    return (
        <points ref={pointsRef} position={[0, 0, -5]}>
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
                size={0.05}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default ParticleGalaxy;
