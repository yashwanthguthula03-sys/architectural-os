"use client"; 

import { useEffect, useRef } from 'react';
import { EnvironmentalMotionKernel } from '@/systems/motion/environmental-kernel';
import ReluctantCommandPalette from '@/components/ui/ReluctantCommandPalette';

export default function EnvironmentalWrapper({ children }: { children: React.ReactNode }) {
    const appRef = useRef<HTMLDivElement>(null);
    const emkRef = useRef<EnvironmentalMotionKernel | null>(null);

    useEffect(() => {
        if (appRef.current && !emkRef.current) {
            emkRef.current = new EnvironmentalMotionKernel(appRef.current);
            if (typeof window !== 'undefined') {
                (window as any).emk = emkRef.current;
            }
        }
    }, []);

    return (
        <div id="app-root" ref={appRef} className="environmental-membrane min-h-screen">
            {/* The Global Instrument */}
            <ReluctantCommandPalette />
            
            {/* The Environment */}
            {children}
        </div>
    );
}