import TileIntelligenceEngine from '@/components/ui/TileIntelligenceEngine';

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-12">
      <div className="w-full max-w-[1400px]">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-12">Tile Intelligence Engine</h1>
        <TileIntelligenceEngine />
      </div>
    </main>
  );
}