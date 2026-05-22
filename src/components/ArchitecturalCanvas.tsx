"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, SpotLight } from '@react-three/drei';
import { EffectComposer, Noise, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// --- Types ---
type Climate = 'Clear Sunlight' | 'Overcast' | 'Warm Golden Hour';
type PaintFinish = 'Ultra Matte' | 'Eggshell' | 'Limewash';
type FloorMaterial = 'Oak' | 'Concrete' | 'Walnut';

interface CanvasProps {
  colorHex: string;
  climate: Climate;
  finish: PaintFinish;
  floor: FloorMaterial;
}

// --- Geometry ---
function Room({ colorHex, finish, floor }: CanvasProps) {
  const getMaterialProps = () => {
    switch(finish) {
      case 'Ultra Matte': return { roughness: 1.0, metalness: 0.0, clearcoat: 0.0 };
      case 'Eggshell': return { roughness: 0.8, metalness: 0.02, clearcoat: 0.1, clearcoatRoughness: 0.9 };
      case 'Limewash': return { roughness: 1.0, metalness: 0.0, clearcoat: 0.05, clearcoatRoughness: 1.0, transmission: 0.2, thickness: 2.0 }; 
    }
  };

  const getFloorColor = () => {
    switch(floor) {
      case 'Oak': return '#382414'; 
      case 'Concrete': return '#1a1b1c';
      case 'Walnut': return '#080402'; 
    }
  };

  const wallProps = getMaterialProps();

  return (
    <group position={[0, -2.5, 0]}>
      <mesh position={[0, 4.2, -4.9]} receiveShadow castShadow>
        <planeGeometry args={[55, 26]} />
        <meshPhysicalMaterial color={colorHex} {...wallProps} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-22, 4.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[35, 26]} />
        <meshPhysicalMaterial color={colorHex} {...wallProps} side={THREE.DoubleSide} />
      </mesh>
      {/* Environmental Edge Dissolve */}
      <mesh position={[0, 0.05, -5.0]} receiveShadow>
        <boxGeometry args={[55, 0.4, 0.8]} />
        <meshPhysicalMaterial color={getFloorColor()} emissive="#000000" roughness={1.0} transmission={0.9} thickness={5.0} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[55, 40]} />
        <meshStandardMaterial color={getFloorColor()} roughness={0.6} metalness={0.04} />
      </mesh>
    </group>
  );
}

// --- Lighting & Atmosphere ---
function LightingSystem({ climate, colorHex, floor }: { climate: Climate, colorHex: string, floor: FloorMaterial }) {
  const primaryLight = useRef<THREE.SpotLight>(null);
  const radiosityLight = useRef<THREE.PointLight>(null);
  const targetObj = useMemo(() => new THREE.Object3D(), []);

  const getAmbientBounceColor = () => {
    switch(floor) {
      case 'Oak': return '#452b17'; 
      case 'Concrete': return '#212224'; 
      case 'Walnut': return '#0d0603'; 
    }
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.002) * 0.01;
    state.camera.position.y = Math.cos(t * 0.003) * 0.005;
    state.camera.lookAt(0, 0, 0);

    if (primaryLight.current) {
      primaryLight.current.position.x = -32 + Math.sin(t * 0.004) * 4.0; 
      const baseIntensity = climate === 'Overcast' ? 15 : (climate === 'Clear Sunlight' ? 28 : 38);
      primaryLight.current.intensity = baseIntensity + (Math.sin(t * 0.05) * 0.4);
    }
    if (radiosityLight.current) {
      radiosityLight.current.intensity = 1.0 + (Math.sin(t * 0.04) * 0.2);
    }
  });

  return (
    <>
      <primitive object={targetObj} />
      <hemisphereLight skyColor={colorHex} groundColor={getAmbientBounceColor()} intensity={climate === 'Overcast' ? 1.3 : 0.35} />
      <pointLight ref={radiosityLight} color={getAmbientBounceColor()} position={[0, -2, -3]} distance={15} decay={2} />
      
      <SpotLight
        ref={primaryLight} castShadow position={climate === 'Overcast' ? [-25, 35, 30] : (climate === 'Clear Sunlight' ? [-35, 28, 32] : [40, 2, 28])} 
        target={targetObj} penumbra={climate === 'Overcast' ? 1 : 2.0} radiusTop={2.0} radiusBottom={140} distance={170} 
        intensity={30} color={climate === 'Warm Golden Hour' ? '#ff3600' : (climate === 'Overcast' ? '#e8eef2' : '#ffffff')} shadow-mapSize={[2048, 2048]}
      />
      <Environment preset={climate === 'Warm Golden Hour' ? 'sunset' : 'city'} blur={8.0} />
    </>
  );
}

// --- Main Canvas ---
export default function ArchitecturalCanvas(props: CanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 transition-opacity duration-1000">
      <Canvas shadows={{ type: THREE.PCFSoftShadowMap }} camera={{ position: [0, 0, 13.5], fov: 25 }}>
        <fog attach="fog" args={[props.colorHex, 35, 95]} />
        <LightingSystem {...props} />
        <Room {...props} />
        <ContactShadows position={[0, -2.49, 0]} opacity={0.55} scale={120} blur={25} far={30} />
        <EffectComposer disableNormalPass>
          {/* Subtle Perceptual Realism */}
          <Noise opacity={0.04} premultiply blendFunction={BlendFunction.OVERLAY} /> 
          <DepthOfField focusDistance={0.02} focalLength={0.025} bokehScale={1.5} />
          <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.9} intensity={0.15} />
          <Vignette eskil={false} offset={0.35} darkness={0.65} /> 
        </EffectComposer>
      </Canvas>
    </div>
  );
}