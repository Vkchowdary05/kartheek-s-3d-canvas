import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader material for holographic grid - softer version
const HolographicGridMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color('#a78bfa'),
        uOpacity: 0.2,
    },
    // Vertex shader
    `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      
      // Gentle wave displacement
      vec3 pos = position;
      float wave1 = sin(pos.x * 0.3 + uTime * 0.5) * 0.2;
      float wave2 = cos(pos.y * 0.3 + uTime * 0.4) * 0.2;
      pos.z += wave1 + wave2;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment shader
    `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uTime;
    
    void main() {
      // Softer grid pattern
      float gridX = step(0.97, fract(vUv.x * 15.0));
      float gridY = step(0.97, fract(vUv.y * 15.0));
      float grid = max(gridX, gridY);
      
      // Gentle distance fade from center
      float dist = distance(vUv, vec2(0.5));
      float fade = 1.0 - smoothstep(0.0, 0.6, dist);
      
      // Combine with softer glow
      float alpha = grid * fade * uOpacity * 0.6;
      
      // Subtle elevation-based brightness
      float glow = (vElevation + 0.4) * 0.4;
      
      gl_FragColor = vec4(uColor * (0.8 + glow * 0.3), alpha);
    }
  `
);

extend({ HolographicGridMaterial });

// TypeScript declaration
declare global {
    namespace JSX {
        interface IntrinsicElements {
            holographicGridMaterial: any;
        }
    }
}

interface HolographicGridProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    size?: number;
}

const HolographicGrid = ({
    position = [0, -5, -5],
    rotation = [-Math.PI / 3.5, 0, 0],
    size = 35
}: HolographicGridProps) => {
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime * 0.4;
        }
    });

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[size, size, 40, 40]} />
            <holographicGridMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
};

export default HolographicGrid;
