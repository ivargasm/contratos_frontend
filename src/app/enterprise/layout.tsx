"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoutes";
import { useAuthStore } from "../store/Store";
import { LayoutDashboard, FileText, CopyPlus, LogOut, Settings, FileSignature, Menu, X } from "lucide-react";
import { useState } from "react";

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuthStore();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { name: "Dashboard", href: "/enterprise/dashboard", icon: LayoutDashboard },
        { name: "Mis Plantillas", href: "/enterprise/templates", icon: FileText },
        { name: "Generación Masiva", href: "/enterprise/bulk-generate", icon: CopyPlus },
        { name: "Gestión de Contratos", href: "/enterprise/contracts", icon: FileSignature },
        { name: "Configuración", href: "/enterprise/settings", icon: Settings },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 lg:block md:hidden block">
                        EasyContract
                    </h2>
                    <h2 className="text-2xl font-bold text-white hidden md:block lg:hidden text-center w-full">
                        EC
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider font-semibold lg:block md:hidden block">
                        B2B Panel
                    </p>
                    <p className="text-sm opacity-80 mt-1 lg:block md:hidden block">
                        Administración
                    </p>
                </div>
                <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-[#C2A359] text-white font-semibold shadow-sm"
                                : "hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5 min-w-[20px]" />
                            <span className="lg:block md:hidden block">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-red-400 transition-colors text-left font-medium"
                >
                    <LogOut className="w-5 h-5 min-w-[20px]" />
                    <span className="lg:block md:hidden block">Cerrar Sesión</span>
                </button>
            </div>
        </>
    );

    return (
        <ProtectedRoute requireCompany={true}>
            <div className="flex h-screen bg-gray-50 dark:bg-[#141414] pt-[72px]">
                
                {/* Desktop/Tablet Sidebar */}
                <aside className="bg-[#111827] text-gray-300 hidden md:flex flex-col shadow-xl z-10 transition-all duration-300 lg:w-64 md:w-24">
                    <SidebarContent />
                </aside>

                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}

                {/* Mobile Sidebar */}
                <aside className={`fixed inset-y-0 left-0 bg-[#111827] text-gray-300 w-64 flex flex-col shadow-xl z-50 transition-transform duration-300 transform md:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <header className="md:hidden bg-[#111827] text-white p-4 flex justify-between items-center shadow-md z-10">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsMobileOpen(true)} className="p-2 hover:bg-gray-800 rounded transition-colors text-gray-300 hover:text-white">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h2 className="font-bold">EasyContract B2B</h2>
                        </div>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
