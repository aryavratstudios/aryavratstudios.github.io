"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, Zap, ArrowLeft, Check, MessageSquare, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { completePayment } from "../actions";

export default function CheckoutPage() {
    const params = useParams();
    const orderId = params.id as string;
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<{ ticketUrl?: string; inviteUrl?: string } | null>(null);

    const items = [
        { label: "Base Project Fee", price: 35 },
        { label: "Priority Creative Research", price: 0 },
        { label: "Commercial Rights", price: 0 },
    ];

    const total = items.reduce((acc, item) => acc + item.price, 0);

    const handlePay = async () => {
        setIsProcessing(true);
        try {
            const res = await completePayment(orderId);
            if (res.success) {
                setResult({ ticketUrl: res.ticketUrl, inviteUrl: res.inviteUrl });
            }
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (result) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 shadow-glow-primary"
                >
                    <Check className="w-12 h-12 text-primary" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 max-w-xl"
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                        Payment <span className="text-primary">Confirmed!</span>
                    </h1>
                    <p className="text-zinc-500 text-lg">
                        Your project is now in production. We have created a dedicated high-priority Discord ticket for your project.
                    </p>

                    <div className="grid gap-4 mt-12 w-full max-w-md mx-auto">
                        {result.ticketUrl && (
                            <Button asChild size="lg" className="h-16 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg shadow-xl hover:scale-105 transition-all">
                                <a href={result.ticketUrl} target="_blank" rel="noopener noreferrer">
                                    <MessageSquare className="mr-3 h-6 w-6" />
                                    Open Project Ticket
                                </a>
                            </Button>
                        )}

                        <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl border-white/10 glass hover:bg-white/10 font-bold text-lg hover:scale-105 transition-all">
                            <a href={result.inviteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-3 h-6 w-6" />
                                Join Discord Server
                            </a>
                        </Button>

                        <Link href="/dashboard" className="inline-flex items-center justify-center text-zinc-500 hover:text-white transition-all mt-4 font-medium group">
                            Back to Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <Link href={`/dashboard/orders`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Back to Order Details
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Checkout</h1>
                            <p className="text-zinc-500">Secure your project and initialize production.</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Order Summary</h3>
                            <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                                {items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-zinc-300">{item.label}</span>
                                        <span className="text-white font-bold">${item.price}</span>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xl">
                                    <span className="font-bold text-white">Total</span>
                                    <span className="font-black text-primary">${total}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-secondary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Escrow Protection</h4>
                                <p className="text-xs text-zinc-500">Payment is held securely and only released upon your satisfaction.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white">Select Payment Method</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col items-center gap-2 transition-all">
                                        <CreditCard className="text-primary" />
                                        <span className="text-xs font-bold text-white">Credit Card</span>
                                    </button>
                                    <button className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center gap-2 grayscale opacity-50 cursor-not-allowed">
                                        <Zap className="text-zinc-500" />
                                        <span className="text-xs font-bold text-zinc-500">Crypto (Coming)</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Card Details</label>
                                    <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center px-4 text-zinc-700">
                                        •••• •••• •••• ••••
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center px-4 text-zinc-700">MM/YY</div>
                                    <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center px-4 text-zinc-700">CVC</div>
                                </div>
                            </div>

                            <Button
                                onClick={handlePay}
                                disabled={isProcessing}
                                className="w-full h-16 rounded-2xl bg-primary text-black font-black text-lg shadow-glow-primary hover:scale-105 transition-all"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                                        Processing...
                                    </span>
                                ) : (
                                    `Pay $${total} & Start Project`
                                )}
                            </Button>

                            <p className="text-[10px] text-zinc-600 text-center">
                                By completing this payment, you agree to our Terms of Service and Privacy Policy.
                                Secure checkout powered by Stripe.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
