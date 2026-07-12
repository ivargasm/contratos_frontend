"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../store/Store";
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const expired = searchParams.get('expired');
    
    const { url, loginUser, userValid, userAuth, user } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(expired === 'true' ? "Tu sesión ha expirado por inactividad" : "");

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        const validateUser = async () => {
            await userValid();
        };
        validateUser();
    }, [userValid]);

    useEffect(() => {
        if (userAuth && user) {
            if (user.company_id) {
                router.push('/enterprise/dashboard');
            } else {
                router.push('/profile');
            }
        }
    }, [user, userAuth, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await loginUser(email, password, url);
            const currentUser = useAuthStore.getState().user;
            if (currentUser?.company_id) {
                router.push("/enterprise/dashboard");
            } else {
                router.push("/profile");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="min-h-screen flex w-full">

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-[#1C212B]">
                <form onSubmit={handleLogin} className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Bienvenido de vuelta</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                                Correo electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                                    Contraseña
                                </Label>
                                <Link href="/auth/forgot-password" className="text-sm font-medium text-[#C2A359] hover:text-[#b0924e] transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pr-10 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl"
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#C2A359] hover:bg-[#b0924e] text-white py-6 rounded-xl text-lg font-medium transition-all shadow-lg shadow-[#C2A359]/20 hover:shadow-[#C2A359]/40"
                        >
                            Iniciar sesión
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/auth/register" className="font-semibold text-[#C2A359] hover:text-[#b0924e] transition-colors">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>

            {/* Visual Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1C212B] overflow-hidden items-center justify-center">
                {/* Decoración de fondo */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{ backgroundImage: "url('/auth_bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C212B] via-[#1C212B]/40 to-transparent z-10" />

                <div className="relative z-20 max-w-lg p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Simplifica la gestión de tus contratos</h2>
                    <p className="text-lg text-gray-300">
                        Una plataforma moderna, rápida y segura para redactar y administrar documentos legales de nivel empresarial.
                    </p>
                </div>
            </div>

        </div>
    );
}
