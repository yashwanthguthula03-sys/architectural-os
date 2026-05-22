export type LightTemperature = 'daylight' | 'warm-evening' | 'cool-evening';

export interface PaintColor {
  id: string;
  brand: 'Sherwin-Williams' | 'Benjamin Moore' | 'Asian Paints' | 'Farrow & Ball';
  code: string;
  name: string;
  hex: string;
  family: 'warm-neutral' | 'cool-neutral' | 'earth' | 'slate' | 'white';
  description: string;
  undertone: string;
  finish: string;
  mood: string;
  expertAdvice: {
    paragraph1: string;
    paragraph2: string;
    bestSuitedFor: string[];
    orientationAdvice: string;
  };
}

export const ARCHITECTURAL_PALETTE: PaintColor[] = [
  { 
    id: 'ap-8244', brand: 'Asian Paints', code: '8244', name: 'Blue Pearl', hex: '#A8B8C4', family: 'slate', description: 'Deep architectural twilight blue.', undertone: 'Slate Blue', finish: 'Matte',
    mood: 'Calm Modern',
    expertAdvice: {
      paragraph1: 'Blue Pearl introduces a calm architectural softness under daylight conditions while maintaining enough reflectance to prevent compact rooms from feeling enclosed.',
      paragraph2: 'Its muted blue-gray undertones pair naturally with concrete, brushed steel, pale oak, and matte stone finishes.',
      bestSuitedFor: [
        'modern Scandinavian interiors',
        'gallery-inspired living spaces',
        'daylight-rich environments'
      ],
      orientationAdvice: 'In north-facing rooms, additional warm ambient lighting is recommended to preserve softness.'
    }
  },
  { 
    id: 'sw-7008', brand: 'Sherwin-Williams', code: 'SW 7008', name: 'Alabaster', hex: '#EDEAE0', family: 'white', description: 'A soft, warm white that avoids yellowing.', undertone: 'Warm Beige', finish: 'Matte/Eggshell',
    mood: 'Warm Minimalist',
    expertAdvice: {
      paragraph1: 'Alabaster provides a highly reflective but deeply comforting base, acting as a luminous canvas that never feels stark or clinical.',
      paragraph2: 'Its subtle beige undertones harmonize perfectly with warm walnut, natural linen, unlacquered brass, and terracotta accents.',
      bestSuitedFor: [
        'organic modern living rooms',
        'restorative bedroom sanctuaries',
        'spaces with heavy natural wood'
      ],
      orientationAdvice: 'Performs flawlessly across all orientations; captures warm southern light beautifully.'
    }
  },
  { 
    id: 'bm-oc17', brand: 'Benjamin Moore', code: 'OC-17', name: 'White Dove', hex: '#F0EFE6', family: 'white', description: 'Clean and classic, highly reflective.', undertone: 'Luminous Gray', finish: 'Matte',
    mood: 'Gallery Crisp',
    expertAdvice: {
      paragraph1: 'White Dove is the ultimate architectural white, offering maximum luminosity that expands spatial perception dramatically.',
      paragraph2: 'A nearly imperceptible drop of gray prevents it from shifting blue or yellow, making it the perfect backdrop for striking art or dark architectural trims.',
      bestSuitedFor: [
        'high-contrast modern interiors',
        'open-concept living areas',
        'spaces with black steel fixtures'
      ],
      orientationAdvice: 'Maintains clarity in overcast northern light; avoids sterile blue shifts.'
    }
  },
  // Add remaining colors adapting this structure...
];

export const getLightingOverlay = (temp: LightTemperature) => {
  switch (temp) {
    case 'daylight': return 'rgba(255, 255, 255, 0)'; 
    case 'warm-evening': return 'rgba(255, 170, 80, 0.18)'; 
    case 'cool-evening': return 'rgba(120, 160, 255, 0.15)'; 
  }
};