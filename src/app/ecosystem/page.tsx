import EcosystemDashboard from '@/components/EcosystemDashboard';

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-6 lg:pt-20 pb-12 px-0 lg:px-8">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
        <EcosystemDashboard />
      </div>
    </main>
  );
}