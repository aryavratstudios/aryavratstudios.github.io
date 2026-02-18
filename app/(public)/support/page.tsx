"use client";

import { motion } from "framer-motion";
import { Headphones, MessageCircle, Mail, Clock, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
    const supportOptions = [
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Get instant help from our support team",
            action: "Start Chat",
            href: "/contact",
            available: "Mon-Fri, 9AM-6PM IST"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us a detailed message about your issue",
            action: "Send Email",
            href: "/contact",
            available: "24/7 - Response within 24h"
        },
        {
            icon: FileText,
            title: "Documentation",
            description: "Browse our comprehensive guides and tutorials",
            action: "View Docs",
            href: "/dashboard",
            available: "Always available"
        }
    ];

    const faqs = [
        {
            question: "How long does it take to complete a project?",
            answer: "Turnaround times vary by service. Thumbnails typically take 24-48 hours, while video editing can take 3-7 days depending on complexity."
        },
        {
            question: "Do you offer revisions?",
            answer: "Yes! All our packages include revisions. The number of revisions depends on your chosen plan, with our Professional plan offering unlimited revisions."
        },
        {
            question: "What file formats do you deliver?",
            answer: "We deliver high-resolution files in industry-standard formats (PNG, JPG for images; MP4, MOV for videos). Source files are included in Professional and Enterprise plans."
        },
        {
            question: "Can I cancel or modify my order?",
            answer: "You can modify or cancel your order before we start working on it. Once work has begun, modifications are handled through our revision process."
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer refunds on a case-by-case basis. If you're not satisfied with the final result after revisions, please contact our support team to discuss options."
        }
    ];

    return (
        <div className="py-16 md:py-20 bg-black min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        How Can We <span className="text-primary">Help?</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Our support team is here to assist you with any questions or issues you may have.
                    </p>
                </motion.div>

                {/* Support Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {supportOptions.map((option, index) => (
                        <motion.div
                            key={option.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <option.icon className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                            <p className="text-zinc-400 mb-4">{option.description}</p>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                                <Clock className="h-3 w-3" />
                                {option.available}
                            </div>
                            <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90">
                                <Link href={option.href}>{option.action}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 bg-white/[0.02]"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                            <HelpCircle className="h-6 w-6 text-accent" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                className="border-b border-white/5 pb-6 last:border-0 last:pb-0"
                            >
                                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                                <p className="text-zinc-400">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center glass-card rounded-3xl p-12 border border-primary/20 bg-primary/5"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
                    <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our support team is ready to assist you.
                    </p>
                    <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 h-12 px-8">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
