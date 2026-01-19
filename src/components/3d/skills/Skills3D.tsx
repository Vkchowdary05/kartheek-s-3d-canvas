import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import SkillNodeNetwork from './SkillNodeNetwork';
import SkillsParticles from './SkillsParticles';

const Skills3DScene = () => {
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
            {/* Accent lights matching skill categories */}
            <pointLight position={[-5, 3, -3]} intensity={0.4} color="#f59e0b" />
            <pointLight position={[5, -2, 2]} intensity={0.4} color="#06b6d4" />
            <pointLight position={[0, 4, 4]} intensity={0.3} color="#10b981" />
            <pointLight position={[-3, -3, 3]} intensity={0.3} color="#8b5cf6" />

            {/* Background stars */}
            <Stars
                radius={70}
                depth={30}
                count={800}
                factor={2}
                saturation={0.2}
                fade
                speed={0.2}
            />

            {/* Orbiting particles */}
            <SkillsParticles count={400} spread={7} />

            {/* Main skill network */}
            <SkillNodeNetwork position={[0, 0, 0]} radius={3.5} />
        </>
    );
};

const Skills3D = () => {
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
                    <Skills3DScene />
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

export default Skills3D;
