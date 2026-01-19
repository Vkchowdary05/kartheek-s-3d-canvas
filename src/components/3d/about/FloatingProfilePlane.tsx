import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingProfilePlaneProps {
    position?: [number, number, number];
}

const FloatingProfilePlane = ({ position = [-3, 0, 0] }: FloatingProfilePlaneProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // Gentle levitation
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.15;

        // Subtle tilt
        groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.03;
        groupRef.current.rotation.y = Math.cos(time * 0.2) * 0.05;

        // Glow pulse
        if (glowRef.current) {
            const material = glowRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.15;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Main card plane */}
            <RoundedBox args={[3.5, 4.5, 0.15]} radius={0.2} smoothness={4}>
                <meshStandardMaterial
                    color="#1e1e30"
                    metalness={0.3}
                    roughness={0.7}
                    transparent
                    opacity={0.6}
                />
            </RoundedBox>

            {/* Inner glow ring */}
            <Sphere ref={glowRef} args={[0.3, 32, 32]} position={[0, 1.5, 0.2]}>
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.7}
                />
            </Sphere>

            {/* Corner accent spheres */}
            {[
                [-1.5, 2, 0.1],
                [1.5, 2, 0.1],
                [-1.5, -2, 0.1],
                [1.5, -2, 0.1],
            ].map((pos, i) => (
                <Sphere key={i} args={[0.08, 16, 16]} position={pos as [number, number, number]}>
                    <meshStandardMaterial
                        color="#a78bfa"
                        emissive="#a78bfa"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            ))}

            {/* Edge glow lines simulation */}
            <mesh position={[0, 0, 0.08]}>
                <planeGeometry args={[3.6, 4.6]} />
                <meshBasicMaterial
                    color="#6366f1"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default FloatingProfilePlane;
