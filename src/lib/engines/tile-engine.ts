export interface RoomDimensions {
  lengthMeters: number;
  widthMeters: number;
}

export interface TileSpec {
  sizeMM: number;
  costPerBox: number;
  tilesPerBox: number;
}

export interface TileEstimate {
  netFloorAreaSqm: number;
  pureTileCount: number;
  recommendedTileCount: number; // Includes 10% wastage
  boxesRequired: number;
  estimatedMaterialCost: number;
}

export const calculateTileEstimate = (
  room: RoomDimensions,
  tile: TileSpec,
  wastagePercent: number = 10
): TileEstimate => {
  // 1. Calculate floor space
  const netFloorAreaSqm = room.lengthMeters * room.widthMeters;

  // 2. Calculate individual tile footprint
  const tileSizeMeters = tile.sizeMM / 1000;
  const singleTileAreaSqm = tileSizeMeters * tileSizeMeters;

  // 3. Raw math
  const pureTileCount = netFloorAreaSqm > 0 && singleTileAreaSqm > 0 
    ? Math.ceil(netFloorAreaSqm / singleTileAreaSqm) 
    : 0;
  
  // 4. Real-world planning (Wastage buffer)
  const recommendedTileCount = Math.ceil(pureTileCount * (1 + wastagePercent / 100));

  // 5. Procurement logistics
  const boxesRequired = tile.tilesPerBox > 0 
    ? Math.ceil(recommendedTileCount / tile.tilesPerBox) 
    : 0;
  
  // 6. Financial projection
  const estimatedMaterialCost = boxesRequired * tile.costPerBox;

  return {
    netFloorAreaSqm,
    pureTileCount,
    recommendedTileCount,
    boxesRequired,
    estimatedMaterialCost
  };
};