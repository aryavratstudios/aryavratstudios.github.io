"use client";

import { useState } from "react";
import { 
    Search, 
    Bell, 
    Menu,
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    MessageSquare,
    BarChart3,
    Settings,
    HelpCircle,
    CreditCard,
    FileText,
    TrendingUp,
    TrendingDown,
    Calendar,
    Clock,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    badge?: number;
}

interface Event {
    id: string;
    title: string;
    description: string;
    time: string;
    color: string;
}

interface Activity {
    id: string;
    title: string;
    amount?: string;
    time: string;
    icon: React.ReactNode;
    iconBg: string;
    isPositive?: boolean;
}

interface Sale {
    id: string;
    product: string;
    productId: string;
    customer: string;
    email: string;
    location: string;
    address: string;
    total: string;
    shipping: string;
    status: "shipped" | "processing" | "pending";
    image: string;
}

export default function AdminDashboard() {
    const [activePeriod, setActivePeriod] = useState<"day" | "week" | "month">("day");
    const [salesPeriod, setSalesPeriod] = useState<"day" | "week" | "month">("day");
    
    // Mock data for the dashboard
    const navItems: NavItem[] = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
        { icon: <ShoppingCart size={20} />, label: "Orders", href: "/admin/orders" },
        { icon: <Users size={20} />, label: "Customers", href: "/admin/customers" },
        { icon: <Package size={20} />, label: "Products", href: "/admin/products" },
        { icon: <MessageSquare size={20} />, label: "Messages", href: "/admin/messages", badge: 3 },
        { icon: <BarChart3 size={20} />, label: "Analytics", href: "/admin/analytics" },
        { icon: <FileText size={20} />, label: "Documents", href: "/admin/documents" },
        { icon: <CreditCard size={20} />, label: "Payments", href: "/admin/payments" },
        { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
    ];

    const bottomNavItems: NavItem[] = [
        { icon: <HelpCircle size={20} />, label: "Help Center", href: "/admin/help" },
    ];

    const upcomingEvents: Event[] = [
        { id: "1", title: "Meeting with a client", description: "Tell how to boost website traffic", time: "05:48AM", color: "#5E81F4" },
        { id: "2", title: "New project discussion", description: "Business Cards Does Your Business", time: "10:28AM", color: "#F4BE5E" },
    ];

    const activities: Activity[] = [
        { id: "1", title: "Item sale #340-00", amount: "+$890.00", time: "Just now", icon: <CreditCard size={18} />, iconBg: "#5E81F4", isPositive: true },
        { id: "2", title: "New lead created", time: "30 min ago", icon: <Users size={18} />, iconBg: "#5E81F4" },
        { id: "3", title: "Item sale #360-20", amount: "+$940.00", time: "45 min ago", icon: <CreditCard size={18} />, iconBg: "#5E81F4", isPositive: true },
        { id: "4", title: "Items upload complete", time: "1 hr ago", icon: <Package size={18} />, iconBg: "#5E81F4" },
        { id: "5", title: "Email notifications sent", time: "2 hrs ago", icon: <MessageSquare size={18} />, iconBg: "#5E81F4" },
    ];

    const sales: Sale[] = [
        { id: "1", product: "Macbook Pro", productId: "ID 10-3290-08", customer: "Rodney Cannon", email: "rodney.cannon@gmail.com", location: "United Kingdom", address: "193 Cole Plains Suite 649, 891203", total: "$118.00", shipping: "$18.00", status: "shipped", image: "https://placehold.co/52x52" },
        { id: "2", product: "Dell Laptop", productId: "ID 10-3456-18", customer: "Mike Franklin", email: "mike.franklin@gmail.com", location: "United States", address: "619 Jeffrey Freeway Apt. 273", total: "$208.00", shipping: "$28.00", status: "processing", image: "https://placehold.co/52x52" },
        { id: "3", product: "Macbook Air", productId: "ID 10-3786-23", customer: "Louis Franklin", email: "louis.franklin@gmail.com", location: "Germany", address: "200 Davis Estates Suite 621", total: "$118.00", shipping: "$18.00", status: "processing", image: "https://placehold.co/52x52" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "shipped": return { bg: "rgba(124, 231, 172, 0.10)", text: "#7CE7AC" };
            case "processing": return { bg: "rgba(244, 190, 94, 0.10)", text: "#F4BE5E" };
            default: return { bg: "rgba(129, 129, 165, 0.10)", text: "#8181A5" };
        }
    };

    return (
        <div className="min-h-screen" style={{ background: "#F5F5FA" }}>
            {/* Left Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-[84px] bg-white flex flex-col items-center py-4 z-50" style={{ borderRight: "1px #F0F0F3 solid" }}>
                {/* Logo */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5E81F4] to-[#5E81F4] flex items-center justify-center mb-8">
                    <span className="text-white font-bold text-lg">A</span>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 flex flex-col gap-2 w-full px-3">
                    {navItems.map((item, index) => (
                        <Link 
                            key={item.label} 
                            href={item.href}
                            className={`w-full aspect-square rounded-lg flex items-center justify-center relative group ${index === 0 ? 'bg-[#5E81F4]/10' : 'hover:bg-gray-50'}`}
                            style={index === 0 ? { borderRight: "2px solid #5E81F4" } : {}}
                        >
                            <span className={index === 0 ? "text-[#5E81F4]" : "text-[#8181A5]"}>
                                {item.icon}
                            </span>
                            {item.badge && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#8AF1B9] rounded-full border-2 border-white" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Navigation */}
                <div className="flex flex-col gap-2 w-full px-3">
                    {bottomNavItems.map((item) => (
                        <Link 
                            key={item.label} 
                            href={item.href}
                            className="w-full aspect-square rounded-lg flex items-center justify-center hover:bg-gray-50"
                        >
                            <span className="text-[#8181A5]">{item.icon}</span>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-[84px]">
                {/* Top Bar */}
                <header className="h-[84px] bg-white flex items-center justify-between px-6" style={{ borderBottom: "1px #F0F0F3 solid" }}>
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-lg bg-[#F0F0F3] flex items-center justify-center">
                            <Menu size={18} className="text-[#8181A5]" />
                        </button>
                        <h1 className="text-xl font-bold" style={{ color: "#1C1D21" }}>Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-lg bg-[#F0F0F3] flex items-center justify-center">
                            <Search size={18} className="text-[#8181A5]" />
                        </button>
                        <button className="w-9 h-9 rounded-lg bg-[#F0F0F3] flex items-center justify-center relative">
                            <Bell size={18} className="text-[#8181A5]" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6">
                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Sales Card */}
                        <div className="bg-white rounded-xl p-5" style={{ border: "1px #F0F0F3 solid" }}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-sm font-bold" style={{ color: "#8181A5" }}>Sales</p>
                                    <h3 className="text-xl font-bold mt-1" style={{ color: "#1C1D21" }}>1.345</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp size={16} className="text-[#7CE7AC]" />
                                    <span className="text-sm font-bold" style={{ color: "#7CE7AC" }}>23%</span>
                                </div>
                            </div>
                            <div className="h-1 rounded-full bg-[#F0F0F3] mt-3">
                                <div className="h-1 rounded-full bg-[#7CE7AC]" style={{ width: "83%" }} />
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8181A5" }}>Week comparison</p>
                        </div>

                        {/* Leads Card */}
                        <div className="bg-white rounded-xl p-5" style={{ border: "1px #F0F0F3 solid" }}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-sm font-bold" style={{ color: "#8181A5" }}>Leads</p>
                                    <h3 className="text-xl font-bold mt-1" style={{ color: "#1C1D21" }}>3.820</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingDown size={16} className="text-[#7CE7AC]" />
                                    <span className="text-sm font-bold" style={{ color: "#7CE7AC" }}>8%</span>
                                </div>
                            </div>
                            <div className="h-1 rounded-full bg-[#F5F5FA] mt-3">
                                <div className="h-1 rounded-full bg-[#5E81F4]" style={{ width: "79%" }} />
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8181A5" }}>Month comparison</p>
                        </div>

                        {/* Income Card */}
                        <div className="bg-white rounded-xl p-5" style={{ border: "1px #F0F0F3 solid" }}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-sm font-bold" style={{ color: "#8181A5" }}>Income</p>
                                    <h3 className="text-xl font-bold mt-1" style={{ color: "#1C1D21" }}>$690.00</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp size={16} className="text-[#7CE7AC]" />
                                    <span className="text-sm font-bold" style={{ color: "#7CE7AC" }}>12%</span>
                                </div>
                            </div>
                            <div className="h-1 rounded-full bg-[#F5F5FA] mt-3">
                                <div className="h-1 rounded-full bg-[#FF808B]" style={{ width: "22%" }} />
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8181A5" }}>Week comparison</p>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Orders Chart */}
                        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px #F0F0F3 solid", minHeight: "380px" }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold" style={{ color: "#1C1D21" }}>Orders</h3>
                                <div className="flex items-center gap-2">
                                    {(["day", "week", "month"] as const).map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setActivePeriod(period)}
                                            className={`px-3 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                                                activePeriod === period 
                                                    ? "bg-white border border-[#ECECF2] text-[#1C1D21] shadow-sm" 
                                                    : "text-[#8181A5] hover:bg-gray-50"
                                            }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                    <button className="w-10 h-10 rounded-lg bg-[#8181A5]/10 flex items-center justify-center">
                                        <Calendar size={18} className="text-[#8181A5]" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Chart visualization - simplified bar chart */}
                            <div className="relative h-[228px] flex items-end justify-between gap-2 px-4">
                                {[35, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div 
                                            className="w-full rounded-t-lg transition-all hover:opacity-80" 
                                            style={{ 
                                                height: `${height * 2}px`,
                                                background: index === 5 ? "#8AF1B9" : "linear-gradient(180deg, #5E81F4 0%, rgba(94, 129, 244, 0.3) 100%)"
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {/* X-axis labels */}
                            <div className="flex justify-between mt-4 px-4">
                                {["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
                                    <span 
                                        key={month} 
                                        className="text-xs"
                                        style={{ color: index === 5 ? "#1C1D21" : "#8181A5" }}
                                    >
                                        {month}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Planned Income Chart */}
                        <div className="bg-white rounded-xl p-5" style={{ border: "1px #F0F0F3 solid", minHeight: "380px" }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold" style={{ color: "#1C1D21" }}>Planned Income</h3>
                                <button className="w-10 h-10 rounded-lg bg-[#8181A5]/10 flex items-center justify-center">
                                    <Calendar size={18} className="text-[#8181A5]" />
                                </button>
                            </div>

                            {/* Pie chart visualization */}
                            <div className="relative h-[200px] flex items-center justify-center">
                                <div className="w-[180px] h-[180px] rounded-full border-[20px] border-[#9698D6] border-r-0" style={{ transform: "rotate(-45deg)" }} />
                                <div className="absolute w-[140px] h-[140px] rounded-full border-[20px] border-[#8AF1B9]" style={{ transform: "rotate(45deg)" }} />
                                <div className="absolute flex items-center justify-center">
                                    <span className="text-sm font-bold" style={{ color: "#8181A5" }}>$48.200</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#9698D6]" />
                                    <span className="text-xs" style={{ color: "#8181A5" }}>Income</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#8AF1B9]" />
                                    <span className="text-xs" style={{ color: "#8181A5" }}>Profit</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Latest Sales Table */}
                    <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px #F0F0F3 solid" }}>
                        <div className="flex justify-between items-center p-5" style={{ borderBottom: "1px #F0F0F3 solid" }}>
                            <h3 className="text-lg font-bold" style={{ color: "#1C1D21" }}>Latest sales</h3>
                            <div className="flex items-center gap-2">
                                {(["day", "week", "month"] as const).map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setSalesPeriod(period)}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                                            salesPeriod === period 
                                                ? "bg-white border border-[#ECECF2] text-[#1C1D21] shadow-sm" 
                                                : "text-[#8181A5] hover:bg-gray-50"
                                        }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Table Header */}
                        <div className="flex items-center px-6 py-3 bg-[#F5F5FA]/40">
                            <span className="w-[130px] text-xs font-bold" style={{ color: "#8181A5" }}>Product</span>
                            <span className="w-[200px] text-xs font-bold" style={{ color: "#8181A5" }}>Customer</span>
                            <span className="w-[180px] text-xs font-bold" style={{ color: "#8181A5" }}>Delivery</span>
                            <span className="w-[120px] text-xs font-bold" style={{ color: "#8181A5" }}>Shipping</span>
                            <span className="w-[100px] text-xs font-bold" style={{ color: "#8181A5" }}>Total</span>
                            <span className="flex-1 text-xs font-bold" style={{ color: "#8181A5" }}>Status</span>
                        </div>

                        {/* Table Rows */}
                        {sales.map((sale) => {
                            const statusStyle = getStatusColor(sale.status);
                            return (
                                <div key={sale.id} className="flex items-center px-6 py-4 hover:bg-gray-50 border-b border-[#F0F0F3]/50 last:border-0">
                                    <div className="w-[130px] flex items-center gap-3">
                                        <img 
                                            src={sale.image} 
                                            alt={sale.product}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-bold" style={{ color: "#1C1D21" }}>{sale.product}</p>
                                            <p className="text-xs" style={{ color: "#1C1D21" }}>{sale.productId}</p>
                                        </div>
                                    </div>
                                    <div className="w-[200px]">
                                        <p className="text-sm font-bold" style={{ color: "#1C1D21" }}>{sale.customer}</p>
                                        <p className="text-xs" style={{ color: "#1C1D21" }}>{sale.email}</p>
                                    </div>
                                    <div className="w-[180px]">
                                        <p className="text-sm font-bold" style={{ color: "#1C1D21" }}>{sale.location}</p>
                                        <p className="text-xs" style={{ color: "#1C1D21" }}>{sale.address}</p>
                                    </div>
                                    <div className="w-[120px]">
                                        <p className="text-sm font-bold" style={{ color: "#1C1D21" }}>{sale.shipping}</p>
                                    </div>
                                    <div className="w-[100px]">
                                        <p className="text-sm font-bold" style={{ color: "#1C1D21" }}>{sale.total}</p>
                                    </div>
                                    <div className="flex-1">
                                        <span 
                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold capitalize"
                                            style={{ background: statusStyle.bg, color: statusStyle.text }}
                                        >
                                            {sale.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="fixed right-0 top-0 h-screen w-[365px] bg-white overflow-y-auto" style={{ borderLeft: "1px #F0F0F3 solid" }}>
                <div className="p-6">
                    {/* User Profile */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#5E81F4] to-[#5E81F4] flex items-center justify-center">
                                <Image 
                                    src="/logo.jpg" 
                                    alt="User" 
                                    width={60}
                                    height={60}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold" style={{ color: "#8181A5" }}>Welcome,</p>
                                <h3 className="text-xl font-bold" style={{ color: "#1C1D21" }}>AryavratHQ</h3>
                            </div>
                        </div>
                    </div>

                    {/* Latest Updates */}
                    <div className="mb-8">
                        <h4 className="text-base font-bold mb-4" style={{ color: "#1C1D21" }}>Latest updates</h4>
                        <div className="space-y-3">
                            {activities.map((activity) => (
                                <div 
                                    key={activity.id} 
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                                    style={{ background: "rgba(245, 245, 250, 0.40)" }}
                                >
                                    <div 
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{ background: "rgba(94, 129, 244, 0.10)" }}
                                    >
                                        <span style={{ color: "#5E81F4" }}>{activity.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate" style={{ color: "#1C1D21" }}>{activity.title}</p>
                                        <p className="text-xs" style={{ color: "#8181A5" }}>{activity.time}</p>
                                    </div>
                                    {activity.amount && (
                                        <span className="text-sm font-bold" style={{ color: "#1C1D21" }}>{activity.amount}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div>
                        <h4 className="text-base font-bold mb-4" style={{ color: "#1C1D21" }}>Upcoming events</h4>
                        <div className="space-y-3">
                            {upcomingEvents.map((event) => (
                                <div 
                                    key={event.id} 
                                    className="p-4 rounded-xl relative overflow-hidden"
                                    style={{ background: "rgba(245, 245, 250, 0.40)" }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full" style={{ background: event.color }} />
                                            <span className="text-xs font-bold" style={{ color: event.color }}>{event.time}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-[#8181A5]" />
                                    </div>
                                    <p className="text-sm font-bold mb-1" style={{ color: "#1C1D21" }}>{event.title}</p>
                                    <p className="text-xs line-clamp-1" style={{ color: "#8181A5" }}>{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
