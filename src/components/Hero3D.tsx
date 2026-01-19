import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';

// Import 3D components
import OrbitalTechStack from './3d/hero/OrbitalTechStack';
import ParticleGalaxy from './3d/hero/ParticleGalaxy';
import FloatingGeometry from './3d/hero/FloatingGeometry';
import HolographicGrid from './3d/hero/HolographicGrid';
import EnergyBeams from './3d/hero/EnergyBeams';

const Hero3DScene = () => {
  return (
    <>
      {/* Deep calm navy fog */}
      <fog attach="fog" args={['#0B1020', 8, 40]} />

      {/* Soft ambient lighting */}
      <ambientLight intensity={0.35} color="#E5E7EB" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#C084FC"
      />
      {/* Soft lavender point light */}
      <pointLight
        position={[-10, -10, -5]}
        intensity={0.4}
        color="#C084FC"
      />
      {/* Gentle sky blue point light */}
      <pointLight
        position={[10, 5, -10]}
        intensity={0.4}
        color="#7DD3FC"
      />
      {/* Subtle lavender accent */}
      <pointLight
        position={[0, 0, 5]}
        intensity={0.3}
        color="#A78BFA"
      />

      {/* Background stars - calm */}
      <Stars
        radius={100}
        depth={50}
        count={1200}
        factor={3}
        saturation={0.3}
        fade
        speed={0.3}
      />

      {/* Holographic Grid */}
      <HolographicGrid />

      {/* Particle Galaxy */}
      <ParticleGalaxy count={2500} radius={7} />

      {/* Floating Geometric Shapes */}
      <FloatingGeometry count={6} />

      {/* Energy Beams */}
      <EnergyBeams count={6} radius={10} />

      {/* Orbital Tech Stack */}
      <OrbitalTechStack position={[0, -0.5, -2]} />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />

        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;
