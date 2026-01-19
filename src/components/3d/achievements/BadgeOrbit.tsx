import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Badge {
    name: string;
    icon: string;
    color: string;
    orbitRadius: number;
    orbitSpeed: number;
    orbitOffset: number;
    size: number;
}

const badges: Badge[] = [
    { name: 'SIH Finalist', icon: '🏆', color: '#fcd34d', orbitRadius: 3, orbitSpeed: 0.3, orbitOffset: 0, size: 0.25 },
    { name: '10+ Apps', icon: '🚀', color: '#60a5fa', orbitRadius: 3.3, orbitSpeed: 0.25, orbitOffset: Math.PI * 0.4, size: 0.22 },
    { name: 'High CGPA', icon: '⭐', color: '#fbbf24', orbitRadius: 2.7, orbitSpeed: 0.35, orbitOffset: Math.PI * 0.8, size: 0.2 },
    { name: 'Flutter Dev', icon: '📱', color: '#60a5fa', orbitRadius: 3.5, orbitSpeed: 0.28, orbitOffset: Math.PI * 1.2, size: 0.2 },
    { name: 'Full-Stack', icon: '💻', color: '#86efac', orbitRadius: 2.9, orbitSpeed: 0.32, orbitOffset: Math.PI * 1.6, size: 0.22 },
    { name: 'AI Skills', icon: '🧠', color: '#f472b6', orbitRadius: 3.2, orbitSpeed: 0.27, orbitOffset: Math.PI * 2, size: 0.2 },
];

interface OrbitingBadgeProps {
    badge: Badge;
}

const OrbitingBadge = ({ badge }: OrbitingBadgeProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        const angle = time * badge.orbitSpeed + badge.orbitOffset;

        // Elliptical orbit
        const x = Math.cos(angle) * badge.orbitRadius;
        const y = Math.sin(angle * 0.5) * 0.8;
        const z = Math.sin(angle) * badge.orbitRadius * 0.6;

        groupRef.current.position.set(x, y, z);

        // Always face camera (billboarding)
        groupRef.current.rotation.y = -angle;
    });

    return (
        <group ref={groupRef}>
            {/* Badge sphere */}
            <Sphere args={[badge.size, 24, 24]}>
                <meshStandardMaterial
                    color={badge.color}
                    emissive={badge.color}
                    emissiveIntensity={0.5}
                    metalness={0.5}
                    roughness={0.3}
                />
            </Sphere>

            {/* Badge name */}
            <Text
                position={[0, badge.size + 0.15, 0]}
                fontSize={0.1}
                color={badge.color}
                anchorX="center"
                anchorY="middle"
                font={undefined}
            >
                {badge.name}
            </Text>
        </group>
    );
};

interface BadgeOrbitProps {
    position?: [number, number, number];
}

const BadgeOrbit = ({ position = [0, 0, 0] }: BadgeOrbitProps) => {
    const groupRef = useRef<THREE.Group>(null);

    // Create orbit ring points
    const ringPoints = useMemo(() => {
        const points = [];
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                Math.cos(angle) * 3,
                0,
                Math.sin(angle) * 3 * 0.6
            ));
        }
        return points;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle overall rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Central trophy/achievement glow */}
            <Sphere args={[0.4, 32, 32]}>
                <meshStandardMaterial
                    color="#fcd34d"
                    emissive="#fbbf24"
                    emissiveIntensity={0.6}
                    metalness={0.7}
                    roughness={0.2}
                />
            </Sphere>

            {/* Orbit ring */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={ringPoints.length}
                        array={new Float32Array(ringPoints.flatMap(p => [p.x, p.y, p.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#6366f1" transparent opacity={0.2} />
            </line>

            {/* Orbiting badges */}
            {badges.map((badge) => (
                <OrbitingBadge key={badge.name} badge={badge} />
            ))}
        </group>
    );
};

export default BadgeOrbit;
