import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import TechConstellation from './TechConstellation';
import ProjectsParticles from './ProjectsParticles';

const Projects3DScene = () => {
    return (
        <>
            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0e27', 12, 50]} />

            {/* Lighting */}
            <ambientLight intensity={0.4} color="#e2e8f0" />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.5}
                color="#f8fafc"
            />
            {/* Accent lights */}
            <pointLight position={[-5, 3, -3]} intensity={0.4} color="#a78bfa" />
            <pointLight position={[5, -2, 2]} intensity={0.4} color="#60a5fa" />
            <pointLight position={[0, 4, 4]} intensity={0.3} color="#5eead4" />

            {/* Background stars */}
            <Stars
                radius={80}
                depth={40}
                count={600}
                factor={2}
                saturation={0.2}
                fade
                speed={0.2}
            />

            {/* Floating particles */}
            <ProjectsParticles count={350} spread={12} />

            {/* Tech constellation */}
            <TechConstellation position={[0, 0, -2]} spread={5} />
        </>
    );
};

const Projects3D = () => {
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
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />

                <Suspense fallback={null}>
                    <Projects3DScene />
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

export default Projects3D;
