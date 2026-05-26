// --- STRICT TYPESCRIPT INTERFACES ---
export interface ColorInfo {
  id: string;
  name: string;
  hex: string;
  collection: string;
  lrv: number;
  undertone: string;
  profile: string;
  
  // --- NEW: ENVIRONMENTAL BEHAVIOR ---
  thermalFeel: "warm" | "neutral" | "cool";
  spatialEffect: "expansive" | "grounding" | "compressive";
  lightSensitivity: "low" | "medium" | "high";
  kelvinResponse: {
    2700: string;
    3000: string;
    4000: string;
  };
  pairsBestWith: string[];

  // --- EXISTING METADATA ---
  finishRecommended: string[];
  bestFor: string[];
  avoidIn: string[];
  physics: {
    ambientReact: string;
    directionalSheer: string;
    floorBounce: string;
  };
}

// --- PERCEPTUAL PHYSICS DATABASE ---
export const colorDatabase: ColorInfo[] = [
  {
    id: "sw-7005",
    name: "Pure White (SW 7005)",
    hex: "#EDECE6",
    collection: "Crisp Whites",
    lrv: 84,
    undertone: "Soft white with microscopic warm undertones",
    profile: "A versatile, clean anchor that maximizes light reflection to create an airy, expansive flow without becoming stark or glaring.",
    
    thermalFeel: "neutral",
    spatialEffect: "expansive",
    lightSensitivity: "low",
    kelvinResponse: {
      2700: "Softens into a gentle plaster-like warmth",
      3000: "Maintains high structural clarity with balanced thermal response",
      4000: "Crisp and highly reflective, visually pushing walls outward"
    },
    pairsBestWith: ["Light oak", "Polished concrete", "Matte black hardware"],
    
    finishRecommended: ["Matte", "Eggshell"],
    bestFor: ["Rooms with abundant natural light", "Ceilings for vertical expansion", "Minimalist airy spaces"],
    avoidIn: ["Harshly lit utility rooms"],
    physics: {
      ambientReact: "illuminating",
      directionalSheer: "high",
      floorBounce: "expansive"
    }
  },
  {
    id: "sw-0055",
    name: "Light French Gray (SW 0055)",
    hex: "#C2C0B8",
    collection: "Light Neutrals",
    lrv: 53,
    undertone: "Balanced mid-toned neutral greige",
    profile: "A sophisticated modern anchor. Its perfect balance of warm and cool tones remains highly consistent even in shifting lighting conditions.",
    
    thermalFeel: "neutral",
    spatialEffect: "grounding",
    lightSensitivity: "low",
    kelvinResponse: {
      2700: "Pulls forward subtle umber base notes",
      3000: "Holds a strict, balanced architectural neutrality",
      4000: "Reveals cool, steely undertones with sharp edge definition"
    },
    pairsBestWith: ["Walnut", "Carrara marble", "Brushed nickel"],
    
    finishRecommended: ["Matte", "Satin"],
    bestFor: ["Southern or western exposure rooms", "Modern timeless living areas"],
    avoidIn: ["Extremely dark, windowless corridors"],
    physics: {
      ambientReact: "stabilizing",
      directionalSheer: "diffused",
      floorBounce: "grounding"
    }
  },
  {
    id: "sw-9130",
    name: "Evergreen Fog (SW 9130)",
    hex: "#95978A",
    collection: "Nature-Inspired Hues",
    lrv: 30,
    undertone: "Medium sage green heavily cut with gray",
    profile: "A true 'chameleon' color. Its complex mixture shifts dynamically from green in cool daylight to a warmer greige under artificial indoor lighting.",
    
    thermalFeel: "cool",
    spatialEffect: "grounding",
    lightSensitivity: "high",
    kelvinResponse: {
      2700: "Flattens into a muted, earthy olive-gray",
      3000: "Stabilizes into a calm, biophilic mid-tone",
      4000: "Pulls strong botanical greens and sharpens visual boundaries"
    },
    pairsBestWith: ["White oak", "Aged brass", "Linen textiles"],
    
    finishRecommended: ["Matte", "Eggshell"],
    bestFor: ["Cozy sanctuaries", "Spaces with mixed natural and artificial light"],
    avoidIn: ["Narrow spaces requiring maximum visual expansion"],
    physics: {
      ambientReact: "chameleon (shifts heavily based on Kelvin)",
      directionalSheer: "absorptive",
      floorBounce: "softening"
    }
  },
  {
    id: "sw-6204",
    name: "Sea Salt (SW 6204)",
    hex: "#CDD2CB",
    collection: "Soft Pastels",
    lrv: 63,
    undertone: "Muted blue-green with a gray wash",
    profile: "Creates a receding visual boundary that naturally makes a space feel less cluttered, breathable, and distinctly coastal.",
    
    thermalFeel: "cool",
    spatialEffect: "expansive",
    lightSensitivity: "high",
    kelvinResponse: {
      2700: "Washes out slightly, losing cool edge definition",
      3000: "Maintains a serene, misty equilibrium",
      4000: "Becomes highly active, reflecting crisp oceanic tones"
    },
    pairsBestWith: ["Bleached woods", "White marble", "Matte silver"],
    
    finishRecommended: ["Eggshell"],
    bestFor: ["Serene bedrooms", "Bathrooms", "Bright, sun-drenched rooms"],
    avoidIn: ["Rooms heavily dominated by warm reds/oranges"],
    physics: {
      ambientReact: "cooling",
      directionalSheer: "soft",
      floorBounce: "receding"
    }
  },
  {
    id: "bm-oc-7",
    name: "Creamy White (OC-7)",
    hex: "#F2EFE3",
    collection: "Crisp Whites",
    lrv: 71,
    undertone: "Rich cream with cozy warmth",
    profile: "Counteracts the blue/gray cast of cooler natural lighting, bringing deep thermal warmth to both traditional and contemporary architectures.",
    
    thermalFeel: "warm",
    spatialEffect: "expansive",
    lightSensitivity: "medium",
    kelvinResponse: {
      2700: "Amplifies thermal warmth, risking a yellow shift",
      3000: "Perfectly balances into a rich, glowing cream",
      4000: "Neutralizes warmth, appearing closer to a flat white"
    },
    pairsBestWith: ["Dark espresso woods", "Tumbled limestone", "Unlacquered brass"],
    
    finishRecommended: ["Matte"],
    bestFor: ["North-facing rooms", "Spaces with cool natural light"],
    avoidIn: ["Rooms with heavy southern exposure (can skew yellow)"],
    physics: {
      ambientReact: "warming",
      directionalSheer: "glowing",
      floorBounce: "comforting"
    }
  },
  {
    id: "sw-0016",
    name: "Billiard Green (SW 0016)",
    hex: "#3B4E44",
    collection: "Deep Character",
    lrv: 7,
    undertone: "Rich, dense emerald",
    profile: "A high-character shade perfect for 'color drenching'. Blurs the physical corners of a room to make small, cozy spaces feel infinitely deeper.",
    
    thermalFeel: "cool",
    spatialEffect: "compressive",
    lightSensitivity: "medium",
    kelvinResponse: {
      2700: "Absorbs light heavily, approaching near-black in shadows",
      3000: "Maintains a dense, enveloping library-green depth",
      4000: "Reflects sharp highlights, emphasizing finish texture"
    },
    pairsBestWith: ["Mahogany", "Saddle leather", "Polished brass"],
    
    finishRecommended: ["Matte"],
    bestFor: ["Libraries", "Dining rooms", "Color-drenched cozy spaces"],
    avoidIn: ["Rooms where maximizing light bounce is the primary goal"],
    physics: {
      ambientReact: "absorbing",
      directionalSheer: "heavy",
      floorBounce: "deadening"
    }
  }
];