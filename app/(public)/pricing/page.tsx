"use client";

import { motion } from "framer-motion";
import { Check, Zap, Rocket, Crown, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        icon: Zap,
        price: "$49",
        period: "per project",
        description: "Perfect for individual creators and small projects",
        features: [
            "1 YouTube Thumbnail",
            "2 Revisions included",
            "24-hour delivery",
            "High-resolution files",
            "Commercial license"
        ],
        cta: "Get Started",
        popular: false
    },
    {
        name: "Professional",
        icon: Rocket,
        price: "$199",
        period: "per project",
        description: "Ideal for content creators and growing brands",
        features: [
            "Video editing (up to 10 min)",
            "Custom thumbnails included",
            "Unlimited revisions",
            "48-hour delivery",
            "Priority support",
            "Source files included"
        ],
        cta: "Start Project",
        popular: true
    },
    {
        name: "Enterprise",
        icon: Crown,
        price: "Custom",
        period: "tailored pricing",
        description: "For agencies and businesses with ongoing needs",
        features: [
            "Dedicated account manager",
            "Custom workflow integration",
            "Bulk project discounts",
            "24/7 priority support",
            "Brand guidelines setup",
            "Monthly retainer options"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

const comparisonFeatures = [
    { name: "Thumbnail Design", starter: "1", professional: "3", enterprise: "Unlimited" },
    { name: "Video Editing", starter: false, professional: "10 min", enterprise: "Unlimited" },
    { name: "Revisions", starter: "2", professional: "Unlimited", enterprise: "Unlimited" },
    { name: "Delivery Time", starter: "24 hours", professional: "48 hours", enterprise: "Custom" },
    { name: "Source Files", starter: false, professional: true, enterprise: true },
    { name: "Priority Support", starter: false, professional: true, enterprise: true },
    { name: "Commercial License", starter: true, professional: true, enterprise: true },
    { name: "Dedicated Manager", starter: false, professional: false, enterprise: true },
];

const faqs = [
    {
        question: "How do I get started?",
        answer: "Simply click on any plan and you'll be guided through our seamless booking process. We typically respond within 2 hours."
    },
    {
        question: "Can I upgrade my plan later?",
        answer: "Absolutely! You can upgrade or downgrade your plan at any time. We'll prorate the difference."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise clients."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with the initial concepts, we offer full refunds."
    }
];

export default function PricingPage() {
    return (
        <div className="py-16 md:py-20 bg-black min-h-screen">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                        <Crown className="w-4 h-4" />
                        Pricing Plans
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Simple, <span className="text-primary">Transparent</span> Pricing
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. All plans include our premium quality guarantee.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-card rounded-3xl p-8 border ${plan.popular
                                    ? 'border-primary/50 bg-primary/5 relative'
                                    : 'border-white/5 bg-white/[0.02]'
                                } hover:bg-white/[0.04] transition-all`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`h-14 w-14 rounded-2xl ${plan.popular ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10'
                                } border flex items-center justify-center mb-6`}>
                                <plan.icon className={`h-7 w-7 ${plan.popular ? 'text-primary' : 'text-zinc-400'}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>

                            <div className="mb-6">
                                <span className="text-5xl font-black text-white">{plan.price}</span>
                                <span className="text-zinc-500 ml-2">/ {plan.period}</span>
                            </div>

                            <Button
                                asChild
                                className={`w-full rounded-full h-12 mb-8 ${plan.popular
                                        ? 'bg-primary hover:bg-primary/90 text-white'
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                    }`}
                            >
                                <Link href={plan.name === "Enterprise" ? "/contact" : "/dashboard/new"}>
                                    {plan.cta}
                                </Link>
                            </Button>

                            <div className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check className={`h-5 w-5 ${plan.popular ? 'text-primary' : 'text-accent'} flex-shrink-0 mt-0.5`} />
                                        <span className="text-sm text-zinc-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center glass-card rounded-3xl p-12 border border-white/5 bg-white/[0.02]"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Have questions?</h2>
                    <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Our team is here to help you choose the right plan and answer any questions about our services.
                    </p>
                    <Button asChild size="lg" variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl border border-white/5 overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-semibold text-white pr-4">{question}</span>
                <HelpCircle className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="px-6 pb-6 text-zinc-400">{answer}</p>
            </motion.div>
        </motion.div>
    );
}
