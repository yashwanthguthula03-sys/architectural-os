// --- STRICT TYPESCRIPT INTERFACES ---
// This acts as the master blueprint for all color data in your application.
export interface ColorInfo {
  id: string;
  name: string;
  hex: string;
  collection: string;
  lrv: number;
  undertone: string; // <-- Changed to string to allow descriptive sentences
  profile: string;
  finishRecommended: string[];
  bestFor: string[];
  avoidIn: string[];
  physics: {
    ambientReact: string;
    directionalSheer: string;
    floorBounce: string;
  };
}

// --- DATABASE ---
export const colorDatabase: ColorInfo[] = [
  {
    id: "atm-01",
    name: "Architectural White",
    hex: "#F2F3F1",
    collection: "Atmospheric Neutrals",
    lrv: 78,
    undertone: "Crisp white with a microscopic green-grey drop",
    profile: "A highly reflective, structural white designed to push walls back and maximize volumetric space.",
    finishRecommended: ["Matte", "Limewash"],
    bestFor: ["North-facing rooms", "Minimalist living spaces", "Art gallery walls"],
    avoidIn: ["Rooms with heavy yellow artificial light"],
    physics: {
      ambientReact: "cooling",
      directionalSheer: "high",
      floorBounce: "neutralizing"
    }
  },
  {
    id: "atm-02",
    name: "Shadow Concrete",
    hex: "#8A8D8F",
    collection: "Atmospheric Neutrals",
    lrv: 35,
    undertone: "Deep industrial grey with a warm umber base",
    profile: "A heavy, grounding tone that absorbs light and creates deliberate visual mass.",
    finishRecommended: ["Eggshell", "Matte"],
    bestFor: ["Media rooms", "Industrial lofts", "Accent walls"],
    avoidIn: ["Small enclosed spaces with low natural light"],
    physics: {
      ambientReact: "absorbing",
      directionalSheer: "low",
      floorBounce: "darkening"
    }
  }
  // You can safely add as many colors as you want here, as long as they follow the blueprint above!
];