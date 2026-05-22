import { ColorIntelligence } from '@/types/color-intelligence';

export const ARCHITECTURAL_PALETTE: ColorIntelligence[] = [
  // ATMOSPHERIC NEUTRALS
  {
    id: "nordic-fog-n12",
    brand: "Curated",
    name: "Nordic Fog",
    code: "N-12",
    hex: "#E5E7E6",
    collection: "Atmospheric Neutrals",
    lrv: 78,
    undertone: "Crisp white with a microscopic green-grey drop",
    finishRecommended: ["Matte", "Limewash"],
    bestFor: ["North-facing rooms", "Minimalist living spaces", "Art gallery walls"],
    avoidIn: ["Rooms with heavy yellow artificial light"],
    pairingMaterials: ["Light birch wood", "Brushed aluminum", "Matte white ceramics"],
    architecturalSummary: "Nordic Fog acts as a spatial expander. It reflects massive amounts of natural light while maintaining a soft, atmospheric density that pure white lacks.",
    timeBehavior: [
      { time: 'Morning', description: 'Immaculately clean and expansive.' },
      { time: 'Noon', description: 'Flattens out to a pure, brilliant neutral.' },
      { time: 'Evening', description: 'Absorbs golden hour light beautifully.' },
      { time: 'Night', description: 'Holds shadows well without looking dirty under warm lamps.' }
    ],
    directionalBehavior: [
      { direction: 'North', effect: 'Stays surprisingly neutral.' },
      { direction: 'South', effect: 'Can lean slightly warm/creamy.' },
      { direction: 'East', effect: 'Blindingly fresh in the morning.' },
      { direction: 'West', effect: 'Takes on a heavy golden hue at sunset.' }
    ]
  },
  {
    id: "asian-paints-8244",
    brand: "Asian Paints",
    name: "Blue Pearl",
    code: "8244",
    hex: "#AEBFCC",
    collection: "Atmospheric Neutrals",
    lrv: 56,
    undertone: "Cool slate blue with a subtle violet trace",
    finishRecommended: ["Matte", "Eggshell"],
    bestFor: ["South-facing rooms", "Concrete interiors", "Modern Scandinavian spaces"],
    avoidIn: ["Low-light compact rooms without warm ambient lighting"],
    pairingMaterials: ["Brushed steel", "Pale oak", "Matte concrete"],
    architecturalSummary: "Blue Pearl performs best in daylight-rich interiors with cool material palettes. Its mid-level LRV allows balanced illumination without overexposure.",
    timeBehavior: [
      { time: 'Morning', description: 'Soft, airy, and expansive.' },
      { time: 'Noon', description: 'Balanced cool neutrality.' },
      { time: 'Evening', description: 'Turns slightly muted and cinematic.' },
      { time: 'Night', description: 'Adds subtle gray-violet softness under 2700K warm lighting.' }
    ],
    directionalBehavior: [
      { direction: 'North', effect: 'Pulls out the cool gray undertones.' },
      { direction: 'South', effect: 'Balances beautifully, appearing as a true soft blue.' },
      { direction: 'East', effect: 'Crisp and fresh.' },
      { direction: 'West', effect: 'Neutralizes under golden sun.' }
    ]
  },
  // WARM LUXURY
  {
    id: "desert-linen-402",
    brand: "Curated",
    name: "Desert Linen",
    code: "DL-402",
    hex: "#D8CFC4",
    collection: "Warm Luxury",
    lrv: 62,
    undertone: "Complex warm beige with a stone-grey base",
    finishRecommended: ["Eggshell", "Roman Clay"],
    bestFor: ["Master bedrooms", "West-facing living areas", "High-ceiling spaces"],
    avoidIn: ["Rooms with existing heavy yellow trims"],
    pairingMaterials: ["Travertine marble", "Aged brass", "Dark walnut wood"],
    architecturalSummary: "Desert Linen brings immediate thermal warmth to a space. It behaves like a luxury textile on the wall, shifting dynamically as the sun moves.",
    timeBehavior: [
      { time: 'Morning', description: 'Soft, grounded, and welcoming.' },
      { time: 'Noon', description: 'Reads as a solid, expensive stone color.' },
      { time: 'Evening', description: 'Glows with a heavy, enveloping warmth.' },
      { time: 'Night', description: 'Creates a den-like, cozy atmosphere under low light.' }
    ],
    directionalBehavior: [
      { direction: 'North', effect: 'Can appear slightly more grey.' },
      { direction: 'South', effect: 'Enhances the sandy, linen warmth.' },
      { direction: 'East', effect: 'Gentle and uplifting.' },
      { direction: 'West', effect: 'Extremely rich and saturated at sunset.' }
    ]
  },
  // MODERN DARK
  {
    id: "midnight-slate-09",
    brand: "Curated",
    name: "Midnight Slate",
    code: "MS-09",
    hex: "#2C3539",
    collection: "Modern Dark",
    lrv: 12,
    undertone: "Deep charcoal pulling heavily into navy",
    finishRecommended: ["Ultra Matte"],
    bestFor: ["Media rooms", "Library walls", "Dining rooms with dramatic lighting"],
    avoidIn: ["Narrow hallways", "Spaces intended to feel airy"],
    pairingMaterials: ["Smoked glass", "Blackened steel", "Rich mahogany"],
    architecturalSummary: "Midnight Slate is a boundary-eraser. Used correctly in low-light, it makes walls visually recede, creating infinite depth rather than feeling claustrophobic.",
    timeBehavior: [
      { time: 'Morning', description: 'A strong, graphic architectural anchor.' },
      { time: 'Noon', description: 'Deep, ink-like navy.' },
      { time: 'Evening', description: 'Almost completely black, incredibly moody.' },
      { time: 'Night', description: 'Absorbs light seamlessly; makes artificial lamps pop.' }
    ],
    directionalBehavior: [
      { direction: 'North', effect: 'Reads as a true, cold charcoal.' },
      { direction: 'South', effect: 'The navy undertone becomes much more visible.' },
      { direction: 'East', effect: 'Striking contrast against morning light.' },
      { direction: 'West', effect: 'Softens slightly in the afternoon.' }
    ]
  }
];