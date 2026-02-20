"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewPage() {
    const { token } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [valid, setValid] = useState(false);
    const [project, setProject] = useState<any>(null);
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const { data, error } = await supabase
                .from('review_tokens')
                .select('*, projects(*)')
                .eq('token', token)
                .eq('used', false)
                .gt('expires_at', new Date().toISOString())
                .single();

            if (error || !data) {
                setError("This review link is invalid or has expired.");
                setValid(false);
            } else {
                setValid(true);
                setProject(data.projects);
            }
            setLoading(false);
        };
        validateToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const { data: { user } } = await supabase.auth.getUser();

            // Insert review
            const { error: reviewError } = await supabase
                .from('reviews')
                .insert({
                    project_id: project.id,
                    user_id: user?.id || project.user_id,
                    rating,
                    content,
                    is_public: true
                });

            if (reviewError) throw reviewError;

            // Mark token as used
            await supabase
                .from('review_tokens')
                .update({ used: true })
                .eq('token', token);

            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;
    }

    if (!valid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-4">
                <Card className="w-full max-w-md bg-stone-900 border-stone-800">
                    <CardHeader className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-white text-2xl font-bold">Invalid Link</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/')} className="w-full">Back to Home</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <Card className="w-full max-w-md bg-stone-900 border-stone-800 text-center p-12">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
                        <p className="text-stone-400">Your review for <strong>{project.title}</strong> has been submitted. Redirecting you...</p>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-lg">
                <Card className="glass-card bg-stone-900/60 border-stone-800 shadow-2xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                    <CardHeader className="pt-8 text-center">
                        <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">Project Feedback</CardTitle>
                        <CardDescription className="text-stone-500 mt-2">Share your experience with <strong>{project.title}</strong></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 p-10">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/30">Rating</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`transition-all duration-300 transform hover:scale-125 ${rating >= star ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]' : 'text-stone-700'}`}
                                    >
                                        <Star size={36} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Your Review</label>
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tell us what you liked, or how we can improve..."
                                    className="h-32 bg-stone-950 border-stone-800 text-white focus:border-primary transition-all rounded-2xl resize-none p-4"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-glow-primary rounded-2xl"
                            >
                                {submitting ? "Submitting..." : (
                                    <span className="flex items-center gap-2">
                                        Post Review <Send size={18} />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
