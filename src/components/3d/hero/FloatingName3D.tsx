import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingName3DProps {
    text?: string;
    position?: [number, number, number];
}

const FloatingName3D = ({
    text = "VENKATA KARTHEEK",
    position = [0, 2, 0]
}: FloatingName3DProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Mesh>(null);

    // Animate glow pulse
    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // Gentle floating motion
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;

        // Subtle rotation based on mouse
        groupRef.current.rotation.x = state.mouse.y * 0.1;
        groupRef.current.rotation.y = state.mouse.x * 0.15;
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.5}
        >
            <group ref={groupRef} position={position}>
                {/* Main text */}
                <Text
                    ref={textRef}
                    fontSize={0.8}
                    letterSpacing={0.05}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {text}
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#6366f1"
                        emissiveIntensity={0.4}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </Text>

                {/* Glow sphere behind text */}
                <mesh position={[0, 0, -0.5]} scale={[8, 1.5, 0.5]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshDistortMaterial
                        color="#6366f1"
                        transparent
                        opacity={0.15}
                        distort={0.3}
                        speed={2}
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Subtitle component
export const FloatingSubtitle = ({
    text = "Full-Stack Developer",
    position = [0, 0.8, 0]
}: { text?: string; position?: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.elapsedTime;
        ref.current.position.y = position[1] + Math.sin(time * 0.6 + 1) * 0.1;
    });

    return (
        <group ref={ref} position={position}>
            <Text
                fontSize={0.35}
                letterSpacing={0.1}
                color="#8b5cf6"
                anchorX="center"
                anchorY="middle"
            >
                {text}
                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.3}
                />
            </Text>
        </group>
    );
};

export default FloatingName3D;
