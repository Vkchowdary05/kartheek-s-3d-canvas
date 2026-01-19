import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
    count?: number;
}

interface Shape {
    type: 'torusKnot' | 'octahedron' | 'dodecahedron' | 'tetrahedron' | 'icosahedron';
    position: [number, number, number];
    scale: number;
    color: string;
    wireframe: boolean;
    rotationSpeed: [number, number, number];
}

// Soft, pleasant colors
const shapes: Shape[] = [
    { type: 'torusKnot', position: [-6, 3, -8], scale: 0.35, color: '#a78bfa', wireframe: true, rotationSpeed: [0.2, 0.3, 0.15] },
    { type: 'octahedron', position: [7, -2, -6], scale: 0.5, color: '#c4b5fd', wireframe: false, rotationSpeed: [0.25, 0.2, 0.3] },
    { type: 'dodecahedron', position: [-5, -4, -10], scale: 0.4, color: '#93c5fd', wireframe: true, rotationSpeed: [0.15, 0.25, 0.2] },
    { type: 'tetrahedron', position: [6, 4, -9], scale: 0.45, color: '#f0abfc', wireframe: false, rotationSpeed: [0.3, 0.15, 0.25] },
    { type: 'icosahedron', position: [-8, 0, -7], scale: 0.35, color: '#5eead4', wireframe: true, rotationSpeed: [0.2, 0.3, 0.18] },
    { type: 'octahedron', position: [8, 1, -11], scale: 0.35, color: '#fda4af', wireframe: false, rotationSpeed: [0.18, 0.22, 0.28] },
];

const FloatingShape = ({ shape, index }: { shape: Shape; index: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = shape.position[1];

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Slower, gentler rotation
        meshRef.current.rotation.x += shape.rotationSpeed[0] * 0.005;
        meshRef.current.rotation.y += shape.rotationSpeed[1] * 0.005;
        meshRef.current.rotation.z += shape.rotationSpeed[2] * 0.005;

        // Smooth floating motion
        meshRef.current.position.x = shape.position[0] + Math.sin(time * 0.2 + index) * 0.4;
        meshRef.current.position.y = initialY + Math.sin(time * 0.3 + index * 0.5) * 0.6;
        meshRef.current.position.z = shape.position[2] + Math.cos(time * 0.15 + index) * 0.3;

        // Gentle scale pulse
        const scalePulse = 1 + Math.sin(time * 1.5 + index) * 0.08;
        meshRef.current.scale.setScalar(shape.scale * scalePulse);
    });

    const geometry = useMemo(() => {
        switch (shape.type) {
            case 'torusKnot':
                return <torusKnotGeometry args={[1, 0.3, 100, 16]} />;
            case 'octahedron':
                return <octahedronGeometry args={[1, 0]} />;
            case 'dodecahedron':
                return <dodecahedronGeometry args={[1, 0]} />;
            case 'tetrahedron':
                return <tetrahedronGeometry args={[1, 0]} />;
            case 'icosahedron':
                return <icosahedronGeometry args={[1, 0]} />;
            default:
                return <octahedronGeometry args={[1, 0]} />;
        }
    }, [shape.type]);

    return (
        <mesh ref={meshRef} position={shape.position} scale={shape.scale}>
            {geometry}
            <meshStandardMaterial
                color={shape.color}
                wireframe={shape.wireframe}
                emissive={shape.color}
                emissiveIntensity={shape.wireframe ? 0.3 : 0.15}
                transparent
                opacity={shape.wireframe ? 0.6 : 0.5}
                metalness={0.3}
                roughness={0.5}
            />
        </mesh>
    );
};

const FloatingGeometry = ({ count = 6 }: FloatingGeometryProps) => {
    return (
        <group>
            {shapes.slice(0, count).map((shape, index) => (
                <FloatingShape key={index} shape={shape} index={index} />
            ))}
        </group>
    );
};

export default FloatingGeometry;
