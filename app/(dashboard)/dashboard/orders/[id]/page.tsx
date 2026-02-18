import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, MessageSquare, ExternalLink, Zap, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentSection } from "./comment-section";

interface OrderDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsProps) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: project } = await supabase
        .from("projects")
        .select("*, profiles(*)")
        .eq("id", id)
        .single();

    if (!project) notFound();

    // Check if user is owner or admin
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    const isAdmin = profile?.role === "admin";
    const isOwner = project.user_id === user.id;

    if (!isAdmin && !isOwner) {
        redirect("/dashboard/orders");
    }

    const { data: comments } = await supabase
        .from("comments")
        .select("*, profiles(full_name, email, role)")
        .eq("project_id", id)
        .order("created_at", { ascending: true });

    return (
        <div className="space-y-10 pb-24 animate-in fade-in duration-700">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/orders" className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase leading-none mb-1">Production Log</h1>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em]">Detailed pipeline tracking for {project.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <Card className="glass-card border-white/5 bg-zinc-900/40 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border",
                                            project.status === 'completed' ? 'bg-white/10 text-white border-white/20' :
                                                project.status === 'in_progress' ? 'bg-white/5 text-white border-white/10' :
                                                    'bg-white/5 text-zinc-500 border-white/5'
                                        )}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ordered {new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <CardTitle className="text-4xl font-black text-white uppercase tracking-tighter">{project.title}</CardTitle>
                                </div>

                                {project.status === 'pending_review' && isOwner && (
                                    <Button asChild className="h-14 px-8 rounded-2xl bg-primary text-black font-black shadow-glow-primary hover:scale-105 transition-all">
                                        <Link href={`/dashboard/checkout/${project.id}`}>
                                            ACTIVATE PRODUCTION <Zap className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10 text-zinc-400">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Initial Production Brief</h3>
                                <p className="text-lg font-medium leading-relaxed text-zinc-300">{project.description}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Creative Category</span>
                                    <p className="text-white font-bold uppercase text-sm tracking-tight">{project.service_type}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Financial Clearance</span>
                                    <p className="text-white font-bold text-sm font-mono">${project.final_price}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Priority Status</span>
                                    <p className="text-white font-bold uppercase text-sm">High Frequency</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Asset Delivery</span>
                                    <p className="text-white font-bold uppercase text-sm">{project.status === 'completed' ? 'READY' : 'PENDING'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comment Feed Placeholder */}
                    <CommentSection
                        projectId={id}
                        initialComments={comments || []}
                        currentUserId={user.id}
                        isAdmin={isAdmin}
                    />
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {project.deliverable_url && (
                        <Card className="glass-card border-white/20 bg-white/5 rounded-[2.5rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <CardContent className="p-8 space-y-6 text-center">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-white/20 flex items-center justify-center text-white mx-auto border border-white/20 shadow-glow-primary">
                                    <Package className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Production Delivered</h3>
                                    <p className="text-xs text-zinc-500 font-medium">Your assets have cleared quality control and are ready for deployment.</p>
                                </div>
                                <Button asChild className="w-full h-14 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all uppercase tracking-widest text-[10px]">
                                    <a href={project.deliverable_url} target="_blank" rel="noopener noreferrer">
                                        DOWNLOAD ASSETS <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="glass-card border-white/5 bg-zinc-900/40 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">SLA Protection</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Neural link secured</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                                Each production at Aryavrat Studios is covered by our tiered SLA. If results aren't spectacular within the 48-hour revision window, we automatically trigger a priority re-render at no cost.
                            </p>
                        </div>
                    </Card>

                    <Card className="glass-card border-[#5865F2]/20 bg-[#5865F2]/5 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2] border border-[#5865F2]/20">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">Support Ticket</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Discord Priority</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                            Direct communication with our engineers is available 24/7 via your dedicated Discord ticket.
                        </p>
                        <Button asChild variant="outline" className="w-full h-12 rounded-[1rem] border-white/10 glass text-[#5865F2] hover:bg-[#5865F2]/10 font-black uppercase text-[10px] tracking-widest">
                            <a href={process.env.DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
                                OPEN PRIVATE TICKET
                            </a>
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
