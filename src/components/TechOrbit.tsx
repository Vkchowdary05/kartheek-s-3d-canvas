import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface TechItem {
  name: string;
  color: string;
  radius: number;
  speed: number;
  offset: number;
}

const techStack: TechItem[] = [
  { name: "React", color: "#61DAFB", radius: 3, speed: 0.5, offset: 0 },
  { name: "Node.js", color: "#339933", radius: 3.5, speed: 0.4, offset: Math.PI * 0.25 },
  { name: "Flutter", color: "#02569B", radius: 4, speed: 0.6, offset: Math.PI * 0.5 },
  { name: "Firebase", color: "#FFCA28", radius: 2.5, speed: 0.45, offset: Math.PI * 0.75 },
  { name: "MongoDB", color: "#47A248", radius: 3.2, speed: 0.55, offset: Math.PI },
  { name: "TypeScript", color: "#3178C6", radius: 3.8, speed: 0.35, offset: Math.PI * 1.25 },
  { name: "Three.js", color: "#ffffff", radius: 2.8, speed: 0.65, offset: Math.PI * 1.5 },
  { name: "Tailwind", color: "#06B6D4", radius: 3.6, speed: 0.42, offset: Math.PI * 1.75 },
];

const TechOrbitItem = ({ tech, index }: { tech: TechItem; index: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const angle = time * tech.speed + tech.offset;

    groupRef.current.position.x = Math.cos(angle) * tech.radius;
    groupRef.current.position.z = Math.sin(angle) * tech.radius;
    groupRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.2}
        color={tech.color}
        anchorX="center"
        anchorY="middle"
      >
        {tech.name}
      </Text>
    </group>
  );
};

const TechOrbit = () => {
  return (
    <group>
      {techStack.map((tech, index) => (
        <TechOrbitItem key={tech.name} tech={tech} index={index} />
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
};

export default TechOrbit;
