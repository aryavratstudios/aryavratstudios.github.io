"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg, context: "User is browsing Aryavrat Studio portfolio." })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM OFFLINE: Link to neural interface interrupted. Please reconnect via Discord." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-inter">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-glow-primary overflow-hidden flex flex-col backdrop-blur-3xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                                    <Sparkles className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Aryavrat AI</h4>
                                    <p className="text-[10px] text-white font-medium animate-pulse">Neural Interface Active</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-2xl hover:bg-white/5 flex items-center justify-center text-zinc-500 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {messages.length === 0 && (
                                <div className="text-center py-12 space-y-4">
                                    <Bot className="w-12 h-12 text-zinc-800 mx-auto" />
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed px-8">
                                        Greetings. I am the Aryavrat Studio Intelligence. How can I assist your creative mission today?
                                    </p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={cn(
                                    "flex flex-col max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                )}>
                                    <div className={cn(
                                        "p-4 rounded-2xl text-[14px] leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-primary text-black font-semibold"
                                            : "bg-white/5 text-zinc-300 border border-white/10"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-primary">
                                    <div className="flex gap-1">
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                    <span className="text-xs font-semibold">Processing...</span>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-white/5 bg-white/5">
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-sm text-white placeholder:text-zinc-700 font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-all pr-14"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary text-black flex items-center justify-center hover:scale-105 transition-all shadow-glow-primary"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all border",
                    isOpen
                        ? "bg-zinc-950 text-white border-white/10"
                        : "bg-primary text-black border-primary/20 shadow-glow-primary"
                )}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
            </motion.button>
        </div>
    );
}
