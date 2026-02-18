"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Heart, TrendingUp, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
    const positions = [
        {
            title: "Senior Video Editor",
            department: "Creative",
            type: "Full-time",
            location: "Remote",
            description: "We're looking for an experienced video editor who can create engaging content for YouTube creators and brands."
        },
        {
            title: "Thumbnail Designer",
            department: "Design",
            type: "Contract",
            location: "Remote",
            description: "Create eye-catching thumbnails that drive clicks and views for top content creators."
        },
        {
            title: "Full-Stack Developer",
            department: "Engineering",
            type: "Full-time",
            location: "Remote",
            description: "Build and maintain our web platform using Next.js, React, and Supabase."
        }
    ];

    const benefits = [
        {
            icon: Rocket,
            title: "Remote First",
            description: "Work from anywhere in the world"
        },
        {
            icon: TrendingUp,
            title: "Growth Opportunities",
            description: "Continuous learning and development"
        },
        {
            icon: Users,
            title: "Amazing Team",
            description: "Collaborate with talented creatives"
        },
        {
            icon: Heart,
            title: "Work-Life Balance",
            description: "Flexible hours and time off"
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        WE'RE HIRING
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Join Our <span className="text-primary">Team</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Help us build the future of creative services. We're always looking for talented individuals who are passionate about their craft.
                    </p>
                </motion.div>

                {/* Benefits */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl p-6 border border-white/5 bg-white/[0.02] text-center"
                        >
                            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                                <benefit.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                            <p className="text-zinc-400 text-sm">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {positions.map((position, index) => (
                            <motion.div
                                key={position.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="glass-card rounded-2xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Briefcase className="h-5 w-5 text-primary" />
                                            <h3 className="text-xl font-bold text-white">{position.title}</h3>
                                        </div>
                                        <p className="text-zinc-400 mb-3">{position.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                                                {position.department}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-xs font-semibold border border-white/5">
                                                {position.type}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-xs font-semibold border border-white/5">
                                                {position.location}
                                            </span>
                                        </div>
                                    </div>
                                    <Button asChild className="rounded-full bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform">
                                        <Link href="/contact">
                                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center glass-card rounded-3xl p-12 border border-primary/20 bg-primary/5"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Don't see a perfect fit?</h2>
                    <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                        We're always interested in hearing from talented people. Send us your portfolio and let's talk about how you can contribute to AryavratHQ.
                    </p>
                    <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 h-12 px-8">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
