// /src/systems/motion/types.ts

export type LightIntensity = 'neutral' | 'amber' | 'dimmed';
export type SurfaceReflection = 'matte' | 'polished' | 'absorptive';
export type ShadowDensity = 'open' | 'compressed' | 'cooling';

export interface EnvironmentalState {
    uiContrast: string;
    luminanceVector: LightIntensity;
    specularInheritance: SurfaceReflection;
    cornerOcclusion: ShadowDensity;
}