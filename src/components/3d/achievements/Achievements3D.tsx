import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import BadgeOrbit from './BadgeOrbit';
import CelebrationParticles from './CelebrationParticles';

const Achievements3DScene = () => {
    return (
        <>
            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0e27', 10, 45]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} color="#e2e8f0" />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.6}
                color="#f8fafc"
            />
            {/* Celebration accent lights */}
            <pointLight position={[-4, 2, 2]} intensity={0.5} color="#fcd34d" />
            <pointLight position={[4, -1, 3]} intensity={0.4} color="#60a5fa" />
            <pointLight position={[0, 3, 4]} intensity={0.3} color="#f472b6" />

            {/* Background stars */}
            <Stars
                radius={70}
                depth={35}
                count={500}
                factor={2}
                saturation={0.3}
                fade
                speed={0.2}
            />

            {/* Celebration particles */}
            <CelebrationParticles count={400} spread={12} />

            {/* Orbiting badges */}
            <BadgeOrbit position={[0, 0, -1]} />
        </>
    );
};

const Achievements3D = () => {
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
                    <Achievements3DScene />
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

export default Achievements3D;
