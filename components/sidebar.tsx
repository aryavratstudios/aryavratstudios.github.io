"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    Shield,
    Briefcase,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        ...(role === 'client' ? [
            { href: "/dashboard/new", label: "New Order", icon: PlusCircle },
            { href: "/dashboard/orders", label: "My Orders", icon: List },
        ] : []),
    ];

    const adminItems = [
        { href: "/admin", label: "All Projects", icon: Shield },
        { href: "/work", label: "Portfolio", icon: Briefcase },
    ];

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 288 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden md:flex flex-col border-r border-white/5 bg-zinc-950 h-screen sticky top-0 z-40 relative"
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-primary text-white p-1.5 rounded-full shadow-glow-primary z-50 hover:bg-accent hover:scale-110 transition-all"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className={cn("p-8 transition-all h-24 flex items-center overflow-hidden", isCollapsed && "px-4 justify-center")}>
                <Link href="/" className="flex items-center gap-3">
                    <Logo size={isCollapsed ? 32 : 44} showGlow={!isCollapsed} />
                    {!isCollapsed && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
                            <span className="text-sm font-black tracking-tighter text-foreground uppercase">AryavratHQ</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Studios</span>
                        </motion.div>
                    )}
                </Link>
            </div>

            <div className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-1">
                    <div className={cn("text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4", isCollapsed && "text-center px-0")}>
                        {isCollapsed ? "•••" : "Workspace"}
                    </div>
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            active={pathname === item.href}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>

                {['admin', 'designer', 'manager'].includes(role) && (
                    <div className="space-y-1">
                        <div className={cn("text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4", isCollapsed && "text-center px-0")}>
                            {isCollapsed ? "•••" : "Administration"}
                        </div>
                        {adminItems.map((item) => (
                            <NavItem
                                key={item.href}
                                item={item}
                                active={pathname === item.href}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-white/5 space-y-4">
                {!isCollapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-primary mb-1 uppercase">
                            <Star className="w-3.5 h-3.5 fill-primary shadow-glow-primary" />
                            Elite Access
                        </div>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest leading-relaxed">Priority production queue active</p>
                    </motion.div>
                )}

                <form action="/auth/signout" method="post">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start text-zinc-500 hover:text-accent hover:bg-accent/10 rounded-2xl group overflow-hidden border border-transparent hover:border-accent/20 transition-all",
                            isCollapsed && "justify-center px-0"
                        )}
                        type="submit"
                    >
                        <LogOut className={cn("h-4 w-4 transition-transform group-hover:-translate-x-1", !isCollapsed && "mr-3")} />
                        {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold uppercase tracking-[0.2em]">Sign Out</motion.span>}
                    </Button>
                </form>
            </div>
        </motion.aside>
    );
}

function NavItem({ item, active, isCollapsed }: { item: any, active: boolean, isCollapsed: boolean }) {
    return (
        <Link
            href={item.href}
            title={isCollapsed ? item.label : ""}
            className={cn(
                "flex items-center group px-4 py-3 rounded-2xl transition-all duration-300 relative",
                active
                    ? "bg-primary text-white font-bold shadow-glow-primary"
                    : "text-zinc-500 hover:text-foreground hover:bg-accent/10 hover:border-accent/20 border border-transparent",
                isCollapsed && "justify-center px-0"
            )}
        >
            <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-black" : "text-zinc-500 group-hover:text-primary transition-colors", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span className="text-sm tracking-tight">{item.label}</span>}

            {active && isCollapsed && (
                <motion.div
                    layoutId="collapsed-active"
                    className="absolute left-0 w-1 h-6 bg-black rounded-r-full"
                />
            )}
        </Link>
    );
}
