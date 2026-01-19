import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, MeshDistortMaterial, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface TechItem {
    name: string;
    color: string;
    orbitRadius: number;
    orbitSpeed: number;
    orbitTilt: number;
    orbitAxis: 'X' | 'Y' | 'Z';
}

// Soft, calming colors for tech stack
const techStack: TechItem[] = [
    { name: "React", color: "#7DD3FC", orbitRadius: 2.5, orbitSpeed: 0.4, orbitTilt: 0, orbitAxis: 'Y' },
    { name: "Node.js", color: "#86efac", orbitRadius: 2.8, orbitSpeed: 0.35, orbitTilt: 15, orbitAxis: 'Y' },
    { name: "Flutter", color: "#C084FC", orbitRadius: 3.2, orbitSpeed: 0.5, orbitTilt: 30, orbitAxis: 'X' },
    { name: "MongoDB", color: "#86efac", orbitRadius: 2.3, orbitSpeed: 0.38, orbitTilt: -20, orbitAxis: 'Z' },
    { name: "TypeScript", color: "#7DD3FC", orbitRadius: 2.6, orbitSpeed: 0.45, orbitTilt: 10, orbitAxis: 'Y' },
    { name: "Three.js", color: "#A78BFA", orbitRadius: 3.0, orbitSpeed: 0.3, orbitTilt: 45, orbitAxis: 'X' },
    { name: "Firebase", color: "#fbbf24", orbitRadius: 2.1, orbitSpeed: 0.52, orbitTilt: -30, orbitAxis: 'Z' },
    { name: "Tailwind", color: "#67E8F9", orbitRadius: 3.4, orbitSpeed: 0.36, orbitTilt: 20, orbitAxis: 'Y' },
];

const OrbitingIcon = ({ tech, index }: { tech: TechItem; index: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        const angle = time * tech.orbitSpeed + (index * Math.PI * 2) / techStack.length;
        const tiltRad = (tech.orbitTilt * Math.PI) / 180;

        // Calculate position based on orbit axis
        let x = 0, y = 0, z = 0;

        switch (tech.orbitAxis) {
            case 'Y':
                x = Math.cos(angle) * tech.orbitRadius;
                y = Math.sin(angle) * Math.sin(tiltRad) * tech.orbitRadius * 0.3;
                z = Math.sin(angle) * tech.orbitRadius;
                break;
            case 'X':
                x = Math.sin(tiltRad) * Math.sin(angle) * tech.orbitRadius * 0.3;
                y = Math.cos(angle) * tech.orbitRadius;
                z = Math.sin(angle) * tech.orbitRadius;
                break;
            case 'Z':
                x = Math.cos(angle) * tech.orbitRadius;
                y = Math.sin(angle) * tech.orbitRadius;
                z = Math.sin(tiltRad) * Math.sin(angle) * tech.orbitRadius * 0.3;
                break;
        }

        groupRef.current.position.set(x, y, z);

        // Gentle self rotation
        groupRef.current.rotation.y = time * 1.5;
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Sphere args={[hovered ? 0.22 : 0.16, 16, 16]}>
                <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={hovered ? 0.8 : 0.3}
                    metalness={0.5}
                    roughness={0.4}
                />
            </Sphere>

            <Text
                position={[0, 0.32, 0]}
                fontSize={hovered ? 0.16 : 0.12}
                color={tech.color}
                anchorX="center"
                anchorY="middle"
            >
                {tech.name}
            </Text>

            {hovered && (
                <Html
                    position={[0, -0.45, 0]}
                    center
                    style={{
                        background: 'rgba(30, 30, 50, 0.9)',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: `1px solid ${tech.color}30`,
                        color: 'white',
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}
                >
                    {tech.name}
                </Html>
            )}
        </group>
    );
};

// Orbit ring visualization
const OrbitRing = ({ radius, color, tilt }: { radius: number; color: string; tilt: number }) => {
    const points = [];
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle) * Math.sin((tilt * Math.PI) / 180) * radius * 0.3;
        points.push(new THREE.Vector3(x, y, z));
    }

    return (
        <Line
            points={points}
            color={color}
            lineWidth={0.3}
            transparent
            opacity={0.15}
        />
    );
};

interface OrbitalTechStackProps {
    position?: [number, number, number];
}

const OrbitalTechStack = ({ position = [0, -1, -2] }: OrbitalTechStackProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const centralRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (centralRef.current) {
            const time = state.clock.elapsedTime;
            // Gentle pulse
            const scale = 0.55 + Math.sin(time * 1.5) * 0.08;
            centralRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Central distorted sphere - soft lavender */}
            <mesh ref={centralRef}>
                <icosahedronGeometry args={[0.55, 4]} />
                <MeshDistortMaterial
                    color="#A78BFA"
                    emissive="#C084FC"
                    emissiveIntensity={0.3}
                    distort={0.3}
                    speed={1.5}
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>

            {/* Orbit rings */}
            {techStack.map((tech, index) => (
                <OrbitRing
                    key={`ring-${index}`}
                    radius={tech.orbitRadius}
                    color={tech.color}
                    tilt={tech.orbitTilt}
                />
            ))}

            {/* Orbiting tech icons */}
            {techStack.map((tech, index) => (
                <OrbitingIcon key={tech.name} tech={tech} index={index} />
            ))}
        </group>
    );
};

export default OrbitalTechStack;
