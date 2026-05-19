'use client';

interface RoomVisualizerProps {
  lengthMeters: number;
  widthMeters: number;
  tileSizeMM: number;
}

export default function RoomVisualizer({ lengthMeters, widthMeters, tileSizeMM }: RoomVisualizerProps) {
  // Prevent rendering if inputs are invalid or zero
  if (!lengthMeters || !widthMeters || lengthMeters <= 0 || widthMeters <= 0) {
    return (
      <div className="w-full h-64 bg-[#F5F3F0] rounded-xl border border-[#E8E6E1] flex flex-col items-center justify-center mb-8">
        <svg className="w-8 h-8 text-[#8B9BA8] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <p className="text-sm text-[#8B9BA8] font-medium">Enter dimensions to visualize layout</p>
      </div>
    );
  }

  // SVG Viewport Setup
  const svgSize = 400; 
  const padding = 40;
  const maxUsable = svgSize - padding * 2;

  // Scaling logic to fit the room perfectly inside the canvas
  const scale = Math.min(maxUsable / lengthMeters, maxUsable / widthMeters);
  const roomSvgWidth = lengthMeters * scale;
  const roomSvgHeight = widthMeters * scale;
  
  const tileSizeMeters = tileSizeMM / 1000;
  const tileSvgSize = tileSizeMeters * scale;

  // Center the room in the SVG
  const offsetX = (svgSize - roomSvgWidth) / 2;
  const offsetY = (svgSize - roomSvgHeight) / 2;

  // Generate the tile grid pattern
  const cols = Math.ceil(lengthMeters / tileSizeMeters);
  const rows = Math.ceil(widthMeters / tileSizeMeters);
  const tiles = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Calculate intersection to cut tiles at the boundaries (simulating wall cuts)
      const tileWidth = Math.min(tileSvgSize, roomSvgWidth - c * tileSvgSize);
      const tileHeight = Math.min(tileSvgSize, roomSvgHeight - r * tileSvgSize);
      
      tiles.push(
        <rect
          key={`${r}-${c}`}
          x={offsetX + c * tileSvgSize}
          y={offsetY + r * tileSvgSize}
          width={tileWidth}
          height={tileHeight}
          fill="#FAFAF8"
          stroke="#E8E6E1"
          strokeWidth="1"
        />
      );
    }
  }

  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8B9BA8] mb-4">Spatial Layout Visualization</h3>
      <div className="bg-white rounded-xl border border-[#E8E6E1] shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden flex justify-center items-center p-4">
        <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-auto max-w-sm">
          {/* Background indicating the un-tiled subfloor */}
          <rect x={offsetX} y={offsetY} width={roomSvgWidth} height={roomSvgHeight} fill="#F5F3F0" />
          
          {/* The Tiled Grid */}
          {tiles}
          
          {/* Room Boundary Stroke */}
          <rect x={offsetX} y={offsetY} width={roomSvgWidth} height={roomSvgHeight} fill="none" stroke="#2C3E50" strokeWidth="2.5" />
          
          {/* Dimensions Labels */}
          <text x={svgSize / 2} y={offsetY - 12} textAnchor="middle" className="text-[12px] fill-[#5B7A8C] font-semibold tracking-wide">
            {lengthMeters}m
          </text>
          <text x={offsetX - 12} y={svgSize / 2} textAnchor="middle" transform={`rotate(-90 ${offsetX - 12} ${svgSize / 2})`} className="text-[12px] fill-[#5B7A8C] font-semibold tracking-wide">
            {widthMeters}m
          </text>
        </svg>
      </div>
    </div>
  );
}