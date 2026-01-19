import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyBeam {
    id: number;
    x: number;
    z: number;
    speed: number;
    delay: number;
    color: string;
    height: number;
}

// Soft, pleasant colors
const colors = ['#a78bfa', '#c4b5fd', '#93c5fd', '#5eead4', '#f0abfc'];

const EnergyBeamMesh = ({ beam }: { beam: EnergyBeam }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.elapsedTime;
        const progress = ((time * beam.speed + beam.delay) % 4) / 4; // Slower loop

        // Move beam upward
        const yPos = -10 + progress * 25;
        meshRef.current.position.y = yPos;

        // Gentle fade based on position
        const fadeIn = Math.min(progress * 4, 1);
        const fadeOut = Math.max(0, 1 - (progress - 0.75) * 4);
        materialRef.current.opacity = fadeIn * fadeOut * 0.4; // More subtle

        // Subtle scale pulse
        const scalePulse = 1 + Math.sin(time * 6 + beam.id) * 0.08;
        meshRef.current.scale.x = scalePulse;
        meshRef.current.scale.z = scalePulse;
    });

    return (
        <mesh
            ref={meshRef}
            position={[beam.x, -10, beam.z]}
        >
            <cylinderGeometry args={[0.015, 0.015, beam.height, 8]} />
            <meshBasicMaterial
                ref={materialRef}
                color={beam.color}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

interface EnergyBeamsProps {
    count?: number;
    radius?: number;
}

const EnergyBeams = ({ count = 6, radius = 10 }: EnergyBeamsProps) => {
    const beams = useMemo<EnergyBeam[]>(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * radius * 2,
            z: (Math.random() - 0.5) * radius - 5,
            speed: 0.2 + Math.random() * 0.3, // Slower
            delay: Math.random() * 4,
            color: colors[i % colors.length],
            height: 2.5 + Math.random() * 3,
        }));
    }, [count, radius]);

    return (
        <group>
            {beams.map((beam) => (
                <EnergyBeamMesh key={beam.id} beam={beam} />
            ))}
        </group>
    );
};

export default EnergyBeams;
