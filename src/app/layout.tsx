import './globals.css';
import { PlatformNav } from '@/components/ui/PlatformNav';

export const metadata = {
  title: 'Architectural OS | Environmental Intelligence',
  description: 'Premium spatial planning and atmospheric simulation ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F6] text-[#1C1D1C] font-sans antialiased min-h-screen flex flex-col">
        
        {/* The Global Ecosystem Header */}
        <PlatformNav />
        
        {/* The active tool renders seamlessly here */}
        <div className="flex-grow">
          {children}
        </div>
        
      </body>
    </html>
  );
}