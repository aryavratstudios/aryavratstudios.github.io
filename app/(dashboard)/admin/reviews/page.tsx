"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Star, Trash2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteReview, toggleReviewVisibility } from "../actions";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        const { data } = await supabase
            .from('reviews')
            .select('*, profiles(full_name), projects(title)')
            .order('created_at', { ascending: false });
        setReviews(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const formData = new FormData();
        formData.append("id", id);
        try {
            await deleteReview(formData);
            fetchReviews();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleToggle = async (id: string, currentState: boolean) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("currentState", currentState.toString());
        try {
            await toggleReviewVisibility(formData);
            fetchReviews();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading reviews...</div>;

    return (
        <div className="p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Review Management</h1>
                    <p className="text-white/40 font-medium">Moderate client feedback and ratings</p>
                </div>
                <div className="bg-primary/20 p-3 rounded-2xl border border-primary/20">
                    <ShieldCheck className="text-primary w-8 h-8" />
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {reviews.map((review) => (
                    <Card key={review.id} className="bg-stone-900/40 border-stone-800 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-stone-700"} />
                                    ))}
                                </div>
                                <span className="text-white font-bold">{review.profiles?.full_name || "Unknown"}</span>
                                <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{review.projects?.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleToggle(review.id, review.is_public)}
                                    className={review.is_public ? "text-emerald-400 hover:text-emerald-300" : "text-amber-400 hover:text-amber-300"}
                                >
                                    {review.is_public ? <Eye size={18} /> : <EyeOff size={18} />}
                                    <span className="ml-2">{review.is_public ? "Public" : "Hidden"}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(review.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-white/60 leading-relaxed italic">"{review.content}"</p>
                            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mt-4">Submitted {new Date(review.created_at).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                ))}

                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-white/40 font-medium tracking-wide">No reviews found in the system.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
