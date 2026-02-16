"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: "Hello! I'm your Aryavrat Studio companion. I can help you with project inquiries, pricing, or technical support. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "View pricing",
        "Recent projects",
        "Contact support"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSend = async (text?: string) => {
        const messageToSend = text || input;
        if (!messageToSend.trim() || loading) return;

        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
        setLoading(true);

        try {
            const agencyContext = `
                Aryavrat Studio (AryavratStudios) is an elite creative agency.
                Services & Pricing: 
                - Thumbnail Design: $35
                - Video Editing: $35
                - Web Development: Custom
                - UI/UX Design: Custom
                - Marketing Strategy: Custom
                Support: Discord (preferred), Email.
                Specialty: High-performance digital craftsmanship, premium aesthetics.
            `;
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: messageToSend,
                    context: agencyContext
                })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "I'm having a brief connection issue. Please join our Discord for immediate help!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[100]">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-16 w-16 rounded-full bg-primary text-white shadow-2xl hover:bg-accent hover:rotate-12 transition-all p-0 flex items-center justify-center group border-2 border-primary/20"
                >
                    {isOpen ? <X size={24} /> : <div className="relative"><Bot size={32} className="group-hover:scale-110 transition-transform" /><div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse"></div></div>}
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(10px)" }}
                        className="fixed bottom-28 right-8 w-[420px] z-[100]"
                    >
                        <div className="glass-card rounded-[32px] border border-foreground/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-[600px] overflow-hidden bg-background/95 backdrop-blur-3xl relative">
                            {/* Header */}
                            <div className="p-6 border-b border-foreground/5 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group border border-primary/20 shadow-inner">
                                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-foreground uppercase tracking-widest">Aryavrat Core</h4>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                                            Autonomous Intelligence
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMessages([{ role: 'ai', content: "Chat cleared. How can I help?" }])}
                                    className="h-8 w-8 rounded-xl hover:bg-foreground/5 text-zinc-500"
                                >
                                    <X size={14} />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                                    >
                                        <div className={cn(
                                            "max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed shadow-sm",
                                            msg.role === 'user'
                                                ? "bg-primary text-white font-bold rounded-tr-none shadow-glow-primary"
                                                : "bg-foreground/5 text-foreground/80 border border-foreground/10 rounded-tl-none backdrop-blur-sm"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}

                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-foreground/5 p-4 rounded-[24px] rounded-tl-none border border-foreground/10 flex gap-1.5">
                                            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce"></div>
                                            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Suggestions */}
                            {!loading && messages.length < 3 && (
                                <div className="px-6 pb-2 flex flex-wrap gap-2">
                                    {suggestions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => handleSend(s)}
                                            className="px-4 py-2 rounded-full border border-foreground/10 text-[10px] font-bold text-foreground/40 hover:text-primary hover:border-primary/50 transition-all uppercase tracking-widest bg-foreground/[0.02]"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input container */}
                            <div className="p-6 pt-2">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="relative group"
                                >
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your inquiry..."
                                        className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl h-14 pl-5 pr-14 text-sm focus:ring-1 focus:ring-primary focus:outline-none focus:bg-foreground/[0.08] transition-all text-foreground placeholder:text-zinc-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-accent hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
