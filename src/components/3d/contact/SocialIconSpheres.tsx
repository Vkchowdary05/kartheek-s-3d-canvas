import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Html, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface SocialLink {
    name: string;
    icon: string;
    color: string;
    url: string;
    orbitRadius: number;
    orbitSpeed: number;
    orbitOffset: number;
}

const socialLinks: SocialLink[] = [
    {
        name: 'GitHub',
        icon: '⌘',
        color: '#a78bfa',
        url: 'https://github.com/Vkchowdary05',
        orbitRadius: 2.5,
        orbitSpeed: 0.4,
        orbitOffset: 0,
    },
    {
        name: 'LinkedIn',
        icon: 'in',
        color: '#60a5fa',
        url: 'https://linkedin.com/in/kartheek-chowdhary',
        orbitRadius: 2.8,
        orbitSpeed: 0.35,
        orbitOffset: Math.PI * 0.66,
    },
    {
        name: 'Email',
        icon: '@',
        color: '#f472b6',
        url: 'mailto:papasanikarthik@gmail.com',
        orbitRadius: 2.2,
        orbitSpeed: 0.45,
        orbitOffset: Math.PI * 1.33,
    },
];

interface OrbitingSphereProps {
    social: SocialLink;
    onClick?: (url: string) => void;
}

const OrbitingSphere = ({ social, onClick }: OrbitingSphereProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        const angle = time * social.orbitSpeed + social.orbitOffset;

        // Elliptical orbit with some vertical movement
        const x = Math.cos(angle) * social.orbitRadius;
        const y = Math.sin(angle * 0.5) * 0.5;
        const z = Math.sin(angle) * social.orbitRadius * 0.6;

        groupRef.current.position.set(x, y, z);

        // Self rotation
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 1.5;
        }
    });

    const handleClick = () => {
        if (onClick) {
            onClick(social.url);
        } else {
            window.open(social.url, '_blank');
        }
    };

    return (
        <group ref={groupRef}>
            <Trail
                width={0.3}
                length={6}
                color={new THREE.Color(social.color)}
                attenuation={(t) => t * t}
            >
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={handleClick}
                    scale={hovered ? 1.3 : 1}
                >
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial
                        color={social.color}
                        emissive={social.color}
                        emissiveIntensity={hovered ? 1 : 0.4}
                        metalness={0.6}
                        roughness={0.3}
                    />
                </mesh>
            </Trail>

            {/* Icon/Label */}
            <Text
                position={[0, 0, 0]}
                fontSize={0.15}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font={undefined}
            >
                {social.icon}
            </Text>

            {/* Hover tooltip */}
            {hovered && (
                <Html
                    position={[0, 0.5, 0]}
                    center
                    style={{
                        background: 'rgba(20, 20, 40, 0.95)',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: `1px solid ${social.color}50`,
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        boxShadow: `0 0 20px ${social.color}40`,
                    }}
                >
                    {social.name}
                </Html>
            )}
        </group>
    );
};

interface SocialIconSpheresProps {
    position?: [number, number, number];
}

const SocialIconSpheres = ({ position = [0, 0, 0] }: SocialIconSpheresProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle overall rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Central glowing sphere */}
            <Sphere args={[0.4, 32, 32]}>
                <meshStandardMaterial
                    color="#6366f1"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            </Sphere>

            {/* Orbiting social icons */}
            {socialLinks.map((social) => (
                <OrbitingSphere key={social.name} social={social} />
            ))}
        </group>
    );
};

export default SocialIconSpheres;
