import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// Tech icons that appear in project showcase
const projectTechs = [
    { name: 'React', color: '#60a5fa', size: 0.15 },
    { name: 'Flutter', color: '#93c5fd', size: 0.15 },
    { name: 'Node.js', color: '#86efac', size: 0.15 },
    { name: 'MongoDB', color: '#86efac', size: 0.12 },
    { name: 'Firebase', color: '#fcd34d', size: 0.12 },
    { name: 'TypeScript', color: '#60a5fa', size: 0.12 },
    { name: 'Tailwind', color: '#5eead4', size: 0.12 },
    { name: 'Express', color: '#e2e8f0', size: 0.1 },
    { name: 'MySQL', color: '#60a5fa', size: 0.1 },
    { name: 'AI/ML', color: '#f472b6', size: 0.14 },
];

// Create connections between related techs
const techConnections: [number, number][] = [
    [0, 2], // React - Node.js
    [0, 3], // React - MongoDB
    [0, 5], // React - TypeScript
    [0, 6], // React - Tailwind
    [1, 4], // Flutter - Firebase
    [2, 3], // Node.js - MongoDB
    [2, 7], // Node.js - Express
    [3, 4], // MongoDB - Firebase
    [5, 0], // TypeScript - React
    [9, 2], // AI/ML - Node.js
];

interface TechNodeProps {
    tech: typeof projectTechs[0];
    position: [number, number, number];
}

const TechNode = ({ tech, position }: TechNodeProps) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        // Gentle floating
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.1;
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[tech.size, 24, 24]} />
                <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={0.4}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
            <Text
                position={[0, tech.size + 0.12, 0]}
                fontSize={0.08}
                color={tech.color}
                anchorX="center"
                anchorY="middle"
                font={undefined}
            >
                {tech.name}
            </Text>
        </group>
    );
};

interface TechConstellationProps {
    position?: [number, number, number];
    spread?: number;
}

const TechConstellation = ({ position = [0, 0, 0], spread = 5 }: TechConstellationProps) => {
    const groupRef = useRef<THREE.Group>(null);

    // Generate positions for tech nodes in a constellation pattern
    const techPositions = useMemo(() => {
        return projectTechs.map((_, index) => {
            const angle = (index / projectTechs.length) * Math.PI * 2;
            const radius = spread * (0.5 + Math.random() * 0.5);
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * spread * 0.6;
            const z = Math.sin(angle) * radius * 0.5;
            return [x, y, z] as [number, number, number];
        });
    }, [spread]);

    // Generate connection line points
    const connectionLines = useMemo(() => {
        return techConnections.map(([from, to]) => ({
            start: techPositions[from],
            end: techPositions[to],
            color: projectTechs[from].color,
        }));
    }, [techPositions]);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Connection lines */}
            {connectionLines.map((line, index) => (
                <Line
                    key={`line-${index}`}
                    points={[line.start, line.end]}
                    color={line.color}
                    lineWidth={0.5}
                    transparent
                    opacity={0.2}
                />
            ))}

            {/* Tech nodes */}
            {projectTechs.map((tech, index) => (
                <TechNode
                    key={tech.name}
                    tech={tech}
                    position={techPositions[index]}
                />
            ))}

            {/* Central glow */}
            <Sphere args={[0.25, 32, 32]}>
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.5}
                />
            </Sphere>
        </group>
    );
};

export default TechConstellation;
