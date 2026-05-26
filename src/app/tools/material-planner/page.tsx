import MaterialPlanner from '@/components/MaterialPlanner'; // Ensure this path matches where you saved it

export const metadata = {
  title: 'Material Planner | Architectural OS',
};

export default function MaterialPlannerPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <div className="animate-in fade-in duration-700">
        <MaterialPlanner />
      </div>
    </main>
  );
}