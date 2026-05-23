"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SoftShadows, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- TYPESCRIPT INTERFACES ---
interface CanvasProps {
  colorHex?: string;
  climate?: string;
  floor?: string;
}

// --- LIGHTING ENGINE ---
function LightingSystem({ colorHex = '#E5E7E6', climate = 'Clear Sunlight', floor = 'concrete' }: CanvasProps) {
  const primaryLight = useRef<THREE.SpotLight>(null);
  const radiosityLight = useRef<THREE.PointLight>(null);

  // Environmental Bounce Physics
  const getAmbientBounceColor = () => {
    return floor === 'oak' ? '#8B5A2B' : '#4A4D51';
  };

  const isOvercast = climate.toLowerCase().includes('overcast');
  const baseIntensity = isOvercast ? 15 : 30;

  // Cinematic Atmospheric Breathing
  useFrame((state) => {
    if (primaryLight.current) {
      primaryLight.current.intensity = baseIntensity + (Math.sin(state.clock.elapsedTime * 0.5) * 2);
    }
    if (radiosityLight.current) {
      radiosityLight.current.intensity = 1.0 + (Math.sin(state.clock.elapsedTime * 0.3) * 0.2);
    }
  });

  return (
    <group>
      {/* 1. Base Ambient Layer (Strictly using 'color' and 'groundColor') */}
      <hemisphereLight 
        color={colorHex} 
        groundColor={getAmbientBounceColor()} 
        intensity={isOvercast ? 0.8 : 0.4} 
      />

      {/* 2. Floor Bounce Radiosity */}
      <pointLight 
        ref={radiosityLight} 
        color={getAmbientBounceColor()} 
        position={[0, -2, -3]} 
        distance={15} 
        intensity={1.5}
      />

      {/* 3. Directional Sculpting (Using native lowercase spotLight to prevent Drei import errors) */}
      <spotLight
        ref={primaryLight}
        castShadow
        position={climate === 'Warm Golden Hour' ? [5, 2, 5] : [0, 5, 5]}
        angle={0.6}
        penumbra={isOvercast ? 1 : 0.5}
        intensity={baseIntensity}
        color={climate === 'Warm Golden Hour' ? '#FFD59E' : '#FFFFFF'}
      />
    </group>
  );
}

// --- ARCHITECTURAL GEOMETRY ---
function RoomGeometry({ colorHex = '#E5E7E6' }: { colorHex?: string }) {
  return (
    <group>
      {/* Primary Wall */}
      <mesh position={[0, 0, -2]} receiveShadow castShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={colorHex} roughness={0.95} metalness={0.05} />
      </mesh>
      
      {/* Corner Wall (Creates Volumetric Depth) */}
      <mesh position={[-4, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={colorHex} roughness={0.95} metalness={0.05} />
      </mesh>
    </group>
  );
}

// --- MAIN CANVAS WRAPPER ---
export default function ArchitecturalCanvas({ colorHex, climate, floor }: CanvasProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-[#1C1D1C]">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Soft shadow map rendering */}
        <SoftShadows size={20} samples={16} focus={0.5} />
        
        {/* Environmental physics */}
        <LightingSystem colorHex={colorHex} climate={climate} floor={floor} />
        <RoomGeometry colorHex={colorHex} />
        
        {/* Grounding shadow plane */}
        <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}