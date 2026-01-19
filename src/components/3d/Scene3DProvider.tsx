import { Suspense, createContext, useContext, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import PostProcessing from './PostProcessing';

interface Scene3DContextType {
    scrollProgress: number;
}

const Scene3DContext = createContext<Scene3DContextType>({ scrollProgress: 0 });

export const useScene3D = () => useContext(Scene3DContext);

interface Scene3DProviderProps {
    children: ReactNode;
    className?: string;
    enablePostProcessing?: boolean;
}

const Scene3DProvider = ({
    children,
    className = '',
    enablePostProcessing = true
}: Scene3DProviderProps) => {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                {/* Fog for depth */}
                <fog attach="fog" args={['#0a0e27', 10, 50]} />

                {/* Global Lighting */}
                <ambientLight intensity={0.3} color="#ffffff" />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    color="#ffffff"
                    castShadow
                />
                <pointLight
                    position={[-10, -10, -5]}
                    intensity={0.5}
                    color="#6366f1"
                />
                <spotLight
                    position={[0, 20, 0]}
                    angle={0.3}
                    intensity={1.5}
                    color="#8b5cf6"
                    castShadow
                />

                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                </Suspense>

                {enablePostProcessing && <PostProcessing />}
            </Canvas>
        </div>
    );
};

export default Scene3DProvider;
