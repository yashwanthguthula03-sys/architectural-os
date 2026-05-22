export type ColorIntelligence = {
  id: string;
  name: string;
  lrv: number;
  undertone: 'neutral' | 'cool' | 'warm';
  collection: string;
}; // <-- This semicolon is correct here
// Add this new type at the top
export type PaintFinish = 'Ultra Matte' | 'Eggshell' | 'Limewash';

// (Keep your existing types like FloorMaterial, Climate, etc. below)
export type FloorMaterial = 'Oak' | 'Concrete' | 'Walnut';
export type Climate = 'Clear Sunlight' | 'Overcast' | 'Warm Golden Hour';

// (Keep your existing interfaces below this...)
export type LightDirection = 'North' | 'South' | 'East' | 'West';
// ... rest of the file stays the same