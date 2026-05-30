"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("Authenticating...");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
        } else {
            setMessage("Access Granted. Initializing Environment...");
            router.push("/"); // Pushes them back to your main OS screen
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("Creating Architectural Identity...");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Check your email to verify your identity.");
        }
        setLoading(false);
    };

    return (
        <main className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#0a0908] text-[#e5e5e5] font-sans antialiased">
            
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent opacity-50"></div>
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            ></div>

            {/* Login Instrument */}
            <div className="relative z-10 w-full max-w-[380px] p-10 border border-white/5 bg-[#0c0b0a]/80 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col">
                
                <div className="mb-10 text-center">
                    <h1 className="text-[11px] uppercase tracking-[0.35em] text-white/80 font-medium mb-2">
                        Architectural OS
                    </h1>
                    <h2 className="text-[9px] uppercase tracking-widest text-white/30 font-light">
                        Identity Verification
                    </h2>
                </div>

                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-md px-4 py-3 text-sm text-white/90 font-light focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="architect@studio.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40">Security Key</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-md px-4 py-3 text-sm text-white/90 font-light tracking-widest focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {message && (
                        <div className="text-[10px] text-center text-white/50 tracking-wide mt-2">
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 mt-4">
                        <button 
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-3 bg-white/10 hover:bg-white/15 text-white/90 text-[11px] uppercase tracking-widest rounded-md transition-all border border-white/5"
                        >
                            {loading ? "Processing..." : "Authenticate"}
                        </button>
                        
                        <button 
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full py-3 bg-transparent hover:bg-white/5 text-white/40 hover:text-white/70 text-[10px] uppercase tracking-widest rounded-md transition-all border border-transparent hover:border-white/5"
                        >
                            Request Access (Sign Up)
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}