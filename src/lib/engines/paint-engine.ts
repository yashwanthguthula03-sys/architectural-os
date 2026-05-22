export interface WallDimensions {
  lengthMeters: number;
  heightMeters: number;
}

export interface Deduction {
  widthMeters: number;
  heightMeters: number;
  type: 'door' | 'window';
}

export interface PaintSpec {
  coveragePerLiter: number;
  costPerLiter: number;
  coatsRequired: number;
}

export interface PaintEstimate {
  grossWallArea: number;
  totalDeductions: number;
  netPaintableArea: number;
  litersRequired: number;
  estimatedMaterialCost: number;
}

export const calculatePaintEstimate = (
  walls: WallDimensions[],
  deductions: Deduction[],
  paint: PaintSpec,
  wastagePercent: number = 8 // Refined down to premium calculation tolerances
): PaintEstimate => {
  const grossWallArea = walls.reduce((sum, wall) => sum + (wall.lengthMeters * wall.heightMeters), 0);
  const totalDeductions = deductions.reduce((sum, deduction) => sum + (deduction.widthMeters * deduction.heightMeters), 0);
  const netPaintableArea = Math.max(0, grossWallArea - totalDeductions);

  if (netPaintableArea === 0 || paint.coveragePerLiter <= 0) {
    return { grossWallArea, totalDeductions, netPaintableArea, litersRequired: 0, estimatedMaterialCost: 0 };
  }

  const totalAreaToCover = netPaintableArea * paint.coatsRequired;
  const rawLiters = totalAreaToCover / paint.coveragePerLiter;
  const litersRequired = rawLiters * (1 + wastagePercent / 100);
  const estimatedMaterialCost = Math.ceil(litersRequired) * paint.costPerLiter;

  return {
    grossWallArea,
    totalDeductions,
    netPaintableArea,
    litersRequired,
    estimatedMaterialCost
  };
};