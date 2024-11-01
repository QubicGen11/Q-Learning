import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const MorphingBlob = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 30]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

const ShaderScene = () => {
  return (
    <div className="h-screen w-full" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 2.5] }}
        gl={{ 
          antialias: true,
          alpha: true,
          premultipliedAlpha: true
        }}
        style={{ background: 'transparent' }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.1} />
        <MorphingBlob />
      </Canvas>
    </div>
  );
};

export default ShaderScene;