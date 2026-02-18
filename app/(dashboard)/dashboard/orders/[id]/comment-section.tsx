"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addComment } from "./actions";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles: {
        full_name: string | null;
        email: string;
        role: string;
    } | null;
}

interface CommentSectionProps {
    projectId: string;
    initialComments: any[];
    currentUserId: string;
    isAdmin: boolean;
}

export function CommentSection({ projectId, initialComments, currentUserId, isAdmin }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await addComment(projectId, content);
            if (res.success) {
                // For a more robust solution, we'd use real-time or re-fetch
                // But for now, we'll manually update local state to avoid delay
                const newComment: Comment = {
                    id: Math.random().toString(), // Temp ID
                    content,
                    created_at: new Date().toISOString(),
                    user_id: currentUserId,
                    profiles: {
                        full_name: "You",
                        email: "",
                        role: isAdmin ? "admin" : "client"
                    }
                };
                setComments([...comments, newComment]);
                setContent("");
            }
        } catch (error) {
            console.error("Failed to post comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <MessageSquare size={18} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Communication Feed</h3>
            </div>

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">No transmissions recorded.</p>
                    </div>
                ) : (
                    comments.map((comment, i) => {
                        const isAssistant = comment.profiles?.role === 'admin' || comment.profiles?.role === 'manager';
                        return (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "flex items-start gap-4 p-6 rounded-3xl border transition-all",
                                    isAssistant
                                        ? "bg-primary/5 border-primary/10 ml-0 mr-12"
                                        : "bg-white/5 border-white/5 ml-12 mr-0"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl shrink-0 flex items-center justify-center border",
                                    isAssistant
                                        ? "bg-primary/20 border-primary/20 text-primary shadow-glow-primary-small"
                                        : "bg-zinc-800 border-white/5 text-zinc-500"
                                )}>
                                    {isAssistant ? <Shield size={18} /> : <User size={18} />}
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            isAssistant ? "text-primary" : "text-zinc-500"
                                        )}>
                                            {isAssistant ? "ARYAVRAT COMMAND" : comment.profiles?.full_name || "PRODUCER"}
                                        </span>
                                        <span className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">
                                            {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed text-zinc-300">{comment.content}</p>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative group p-2 bg-white/5 border border-white/10 rounded-[2rem] focus-within:ring-1 focus-within:ring-primary transition-all shadow-2xl">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ENTER MESSAGE..."
                    className="w-full h-32 bg-transparent border-none rounded-[1.5rem] px-6 py-4 text-sm text-white focus:ring-0 outline-none resize-none placeholder:text-zinc-800 font-medium"
                />
                <div className="flex items-center justify-between p-4 border-t border-white/5">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest pl-2">Neural link active</p>
                    <Button
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                        className="h-12 w-12 rounded-2xl bg-primary text-black flex items-center justify-center hover:scale-105 transition-all shadow-glow-primary"
                    >
                        {isSubmitting ? (
                            <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Send size={18} />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
