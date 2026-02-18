import { createClient } from "@/lib/supabase/server";
import { ExternalLink, LayoutGrid, Globe, Video, Palette } from "lucide-react";
import ProjectGrid from "@/components/project-grid";

// revalidate every hour
export const revalidate = 3600;

export default async function WorkPage() {
    const supabase = await createClient();

    // Fetch both completed projects and dedicated portfolio items
    const [
        { data: clientProjects },
        { data: portfolioItems }
    ] = await Promise.all([
        supabase.from("projects")
            .select("*")
            .eq("status", "completed")
            .eq("show_in_portfolio", true)
            .order("created_at", { ascending: false }),
        supabase.from("portfolio")
            .select("*")
            .order("created_at", { ascending: false })
    ]);

    const allWork = [
        ...(clientProjects || []).map(p => ({ ...p, source: 'project' })),
        ...(portfolioItems || []).map(p => ({ ...p, source: 'portfolio' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="py-24 md:py-48 bg-black min-h-screen relative overflow-hidden">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="container-tight relative z-10">
                <div className="max-w-4xl mx-auto mb-24 space-y-8 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-500 text-xs font-semibold backdrop-blur-md shadow-2xl mx-auto">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-glow-emerald animate-ping"></div>
                        Portfolio Exhibition
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mix-blend-difference">
                            The <span className="text-primary relative inline-block">
                                Spectacle
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
                            </span>
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
                            A curated archival of high-end creative research and specialized digital production outcomes for elite creators.
                        </p>
                    </div>
                </div>

                <ProjectGrid projects={allWork} />
            </div>
        </div>
    );
}
