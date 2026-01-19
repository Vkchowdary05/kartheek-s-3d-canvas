import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import SocialIconSpheres from './SocialIconSpheres';
import ContactParticles from './ContactParticles';

const Contact3DScene = () => {
    return (
        <>
            {/* Subtle fog for depth */}
            <fog attach="fog" args={['#0a0e27', 10, 40]} />

            {/* Soft lighting setup */}
            <ambientLight intensity={0.4} color="#e2e8f0" />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.6}
                color="#f8fafc"
            />
            {/* Accent lights */}
            <pointLight
                position={[-5, 3, -3]}
                intensity={0.5}
                color="#a78bfa"
            />
            <pointLight
                position={[5, -2, 2]}
                intensity={0.4}
                color="#60a5fa"
            />
            <pointLight
                position={[0, 2, 5]}
                intensity={0.3}
                color="#f0abfc"
            />

            {/* Background stars */}
            <Stars
                radius={80}
                depth={40}
                count={1000}
                factor={2}
                saturation={0.2}
                fade
                speed={0.2}
            />

            {/* Floating particles */}
            <ContactParticles count={600} spread={15} />

            {/* Orbiting social icons */}
            <SocialIconSpheres position={[4, 0, 0]} />
        </>
    );
};

const Contact3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    failIfMajorPerformanceCaveat: false,
                }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

                <Suspense fallback={null}>
                    <Contact3DScene />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.5}
                />
            </Canvas>
        </div>
    );
};

export default Contact3D;
