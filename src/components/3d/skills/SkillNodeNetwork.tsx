import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
    name: string;
    category: string;
    color: string;
    position: [number, number, number];
    connections: number[];
}

// Fibonacci sphere distribution for even node placement
const fibonacciSphere = (index: number, total: number, radius: number): [number, number, number] => {
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const y = 1 - (index / (total - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * index;

    return [
        Math.cos(theta) * radiusAtY * radius,
        y * radius,
        Math.sin(theta) * radiusAtY * radius,
    ];
};

// Skill data with categories
const skillData = [
    { name: 'React', category: 'Frontend', color: '#60a5fa' },
    { name: 'Node.js', category: 'Backend', color: '#86efac' },
    { name: 'TypeScript', category: 'Languages', color: '#60a5fa' },
    { name: 'JavaScript', category: 'Languages', color: '#fcd34d' },
    { name: 'Python', category: 'Languages', color: '#60a5fa' },
    { name: 'Flutter', category: 'Frontend', color: '#93c5fd' },
    { name: 'MongoDB', category: 'Database', color: '#86efac' },
    { name: 'Firebase', category: 'Backend', color: '#fcd34d' },
    { name: 'Next.js', category: 'Frontend', color: '#e2e8f0' },
    { name: 'Express', category: 'Backend', color: '#e2e8f0' },
    { name: 'Tailwind', category: 'Frontend', color: '#5eead4' },
    { name: 'Git', category: 'Tools', color: '#f472b6' },
    { name: 'MySQL', category: 'Database', color: '#60a5fa' },
    { name: 'REST API', category: 'Backend', color: '#a78bfa' },
    { name: 'Dart', category: 'Languages', color: '#60a5fa' },
];

// Generate connections between related skills
const generateConnections = (skills: typeof skillData): number[][] => {
    const connections: number[][] = skills.map(() => []);

    for (let i = 0; i < skills.length; i++) {
        for (let j = i + 1; j < skills.length; j++) {
            // Connect skills in same category
            if (skills[i].category === skills[j].category) {
                connections[i].push(j);
                connections[j].push(i);
            }
        }
    }

    return connections;
};

interface NodeProps {
    node: SkillNode;
    onHover: (name: string | null) => void;
    hoveredNode: string | null;
}

const SkillNodeComponent = ({ node, onHover, hoveredNode }: NodeProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [localHovered, setLocalHovered] = useState(false);

    const isHighlighted = hoveredNode === node.name ||
        (hoveredNode && node.connections.some(
            idx => skillData[idx]?.name === hoveredNode
        ));

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        // Gentle floating
        meshRef.current.position.y = node.position[1] + Math.sin(time * 0.5 + node.position[0]) * 0.05;
    });

    return (
        <group position={node.position}>
            <mesh
                ref={meshRef}
                onPointerOver={() => {
                    setLocalHovered(true);
                    onHover(node.name);
                }}
                onPointerOut={() => {
                    setLocalHovered(false);
                    onHover(null);
                }}
                scale={localHovered ? 1.4 : isHighlighted ? 1.2 : 1}
            >
                <sphereGeometry args={[0.15, 24, 24]} />
                <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={localHovered ? 1 : isHighlighted ? 0.6 : 0.3}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>

            {/* Skill name label */}
            <Text
                position={[0, 0.28, 0]}
                fontSize={localHovered ? 0.14 : 0.1}
                color={localHovered ? '#ffffff' : node.color}
                anchorX="center"
                anchorY="middle"
                font={undefined}
            >
                {node.name}
            </Text>

            {/* Hover tooltip */}
            {localHovered && (
                <Html
                    position={[0, -0.35, 0]}
                    center
                    style={{
                        background: 'rgba(20, 20, 40, 0.95)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${node.color}50`,
                        color: 'white',
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}
                >
                    {node.category}
                </Html>
            )}
        </group>
    );
};

interface ConnectionLineProps {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
    isHighlighted: boolean;
}

const ConnectionLine = ({ start, end, color, isHighlighted }: ConnectionLineProps) => {
    return (
        <Line
            points={[start, end]}
            color={color}
            lineWidth={isHighlighted ? 1.5 : 0.5}
            transparent
            opacity={isHighlighted ? 0.6 : 0.15}
        />
    );
};

interface SkillNodeNetworkProps {
    position?: [number, number, number];
    radius?: number;
}

const SkillNodeNetwork = ({ position = [0, 0, 0], radius = 3 }: SkillNodeNetworkProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Generate node positions using Fibonacci sphere
    const nodes: SkillNode[] = useMemo(() => {
        const connections = generateConnections(skillData);

        return skillData.map((skill, index) => ({
            ...skill,
            position: fibonacciSphere(index, skillData.length, radius),
            connections: connections[index],
        }));
    }, [radius]);

    // Generate connection pairs
    const connectionPairs = useMemo(() => {
        const pairs: { start: [number, number, number]; end: [number, number, number]; color: string; key: string }[] = [];

        nodes.forEach((node, i) => {
            node.connections.forEach(j => {
                if (i < j) { // Avoid duplicate lines
                    pairs.push({
                        start: node.position,
                        end: nodes[j].position,
                        color: node.color,
                        key: `${i}-${j}`,
                    });
                }
            });
        });

        return pairs;
    }, [nodes]);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation of entire network
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Connection lines */}
            {connectionPairs.map(({ start, end, color, key }) => {
                const isHighlighted = hoveredNode && (
                    nodes.find(n => n.name === hoveredNode)?.connections.some(
                        idx => nodes[idx]?.position === start || nodes[idx]?.position === end
                    )
                );

                return (
                    <ConnectionLine
                        key={key}
                        start={start}
                        end={end}
                        color={color}
                        isHighlighted={!!isHighlighted}
                    />
                );
            })}

            {/* Skill nodes */}
            {nodes.map((node) => (
                <SkillNodeComponent
                    key={node.name}
                    node={node}
                    onHover={setHoveredNode}
                    hoveredNode={hoveredNode}
                />
            ))}

            {/* Central glow */}
            <Sphere args={[0.3, 32, 32]}>
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.4}
                />
            </Sphere>
        </group>
    );
};

export default SkillNodeNetwork;
