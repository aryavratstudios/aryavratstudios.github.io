"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Star, MessageSquare, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PublicReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await supabase
                .from('reviews')
                .select('*, profiles(full_name), projects(service_type)')
                .eq('is_public', true)
                .order('created_at', { ascending: false });
            setReviews(data || []);
            setLoading(false);
        };
        fetchReviews();
    }, []);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center pt-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">Client Stories</h1>
                    <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                            <span className="text-white font-bold">{averageRating} Average</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                            <MessageSquare className="text-primary w-4 h-4" />
                            <span className="text-white/60 font-bold">{reviews.length} Reviews</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="bg-stone-900/40 border-stone-800 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Quote size={80} className="text-white" />
                                </div>
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star
                                                key={idx}
                                                size={16}
                                                className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-stone-700"}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-white/80 text-lg leading-relaxed italic mb-8 flex-1">
                                        "{review.content}"
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white font-bold uppercase border border-white/10">
                                            {review.profiles?.full_name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold leading-none">{review.profiles?.full_name || "Verified Client"}</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-bold">
                                                {review.projects?.service_type || "Branding"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
                        <p className="text-white/40 font-medium">No reviews published yet. Be the first!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
