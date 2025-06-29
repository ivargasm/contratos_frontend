"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Menu, X, Home, Folder, LogOut, LogIn, Sun, Moon, File } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../store/Store";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userAuth, logout } = useAuthStore();
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        // En Tailwind v4, podemos alternar la clase 'dark' en el elemento html
        if (darkMode) {
            document.documentElement.classList.remove("dark")
        } else {
            document.documentElement.classList.add("dark")
        }
    }

    const handleLogout = async () => {
        try {
            // Llama a la función del store (que ya no tiene el redirect)
            await logout();

            // Redirige al login DESPUÉS de que el logout se completó
            router.push('/auth/login');

        } catch (error) {
            console.error("Fallo el proceso de logout:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white text-primary dark:bg-foreground dark:text-primary shadow-md z-50">
            <div className="max-w-[90%] mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-slate-700">
                    🧑‍🚀 Contratos
                </Link>

                {/* Botón de menú en móviles */}
                <button
                    className="md:hidden text-slate-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú principal */}
                <ul className="hidden md:flex space-x-6 items-center text-slate-700">
                    <li>
                        <Link href="/" className="flex items-center gap-2 hover:text-primary">
                            <Home size={20} /> Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/contract-selector" className="flex items-center gap-2 hover:text-primary">
                            <File size={20} /> Contratos
                        </Link>
                    </li>
                    {/* si is Autenticates is Treu mostrar menu dashboard */}
                    {userAuth && (
                        <>
                            <li>
                                <Link href="/profile" className="flex items-center gap-2 hover:text-primary">
                                    <Folder size={20} /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="flex items-center gap-2 hover:text-primary">
                                    <LogOut size={20} /> Logout
                                </button>
                            </li>
                        </>
                    )}
                    {!userAuth && (
                        <li>
                            <Link href="/auth/login" className="flex items-center gap-2 hover:text-primary">
                                <LogIn size={20} /> Login
                            </Link>
                        </li>
                    )}
                    <button
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        className="cursor-pointer hover:text-primary"
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </ul>
            </div>

            {/* Menú desplegable en móviles */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li>
                            <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                <Home size={20} /> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/contract-selector" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                <File size={20} /> Contratos
                            </Link>
                        </li>
                        {userAuth && (
                            <>
                                <li>
                                    <Link href="/profile" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                        <Folder size={20} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
                                        <LogOut size={20} /> Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!userAuth && (
                            <li>
                                <Link href="/auth/login" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                    <LogIn size={20} /> Login
                                </Link>
                            </li>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            className="text-slate-700"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </ul>
                </div>
            )}
        </nav>
    );
}
