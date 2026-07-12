"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/Store";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter();
    const { registerUser, userAuth, user } = useAuthStore();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: ""
    });
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [accountType, setAccountType] = useState<"personal" | "empresa">("personal");

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    // useEffect(() => {
    //     const validateUser = async () => {
    //         await userValid();
    //     };
    //     validateUser();
    // }, [userValid]);

    useEffect(() => {
        if (userAuth && user) {
            if (user.company_id) {
                router.push('/enterprise/dashboard');
            } else {
                router.push('/profile');
            }
        }
    }, [user, userAuth, router]);

    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = () => {
        const newErrors = [];

        // Validar nombre de usuario
        if (!/^[a-zA-Z0-9]+$/.test(form.username)) {
            newErrors.push("El nombre de usuario solo puede contener letras y números.");
        }
        if (form.username.length < 3 || form.username.length > 50) {
            newErrors.push("El nombre de usuario debe tener entre 3 y 50 caracteres.");
        }

        // Validar email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.push("El correo electrónico no es válido.");
        }
        if (form.email.length > 50) {
            newErrors.push("El correo electrónico es demasiado largo.");
        }

        // Validar contraseña
        if (form.password.length < 8) {
            newErrors.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
            newErrors.push("La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial.");
        }
        if (form.password.length > 100) {
            newErrors.push("La contraseña es demasiado larga.");
        }

        // Validar confirmación de contraseña
        if (form.password !== form.confirmPassword) {
            newErrors.push("Las contraseñas no coinciden.");
        }

        if (accountType === "empresa" && form.companyName.trim().length === 0) {
            newErrors.push("El nombre de la empresa es obligatorio.");
        }

        if (!acceptTerms) {
            newErrors.push("Debes aceptar los Términos y Condiciones y el Aviso de Privacidad.");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const company_name = accountType === "empresa" ? form.companyName.trim() : undefined;
        // Static version "1.0" for now
        const result = await registerUser(form.username, form.email, form.password, acceptTerms, "1.0", company_name);
        if (result.success) {
            router.push("/auth/login");
        } else {
            setErrors([result.error || "Error al registrar. Inténtalo nuevamente."]);
        }
    };

    return (
        <div className="min-h-screen flex w-full">

            {/* Visual Section (Left) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1C212B] overflow-hidden items-center justify-center">
                {/* Decoración de fondo */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{ backgroundImage: "url('/auth_bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C212B] via-[#1C212B]/40 to-transparent z-10" />

                <div className="relative z-20 max-w-lg p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Únete a la evolución legal</h2>
                    <p className="text-lg text-gray-300">
                        Crea, firma y gestiona tus contratos en la nube con la plataforma líder para profesionales.
                    </p>
                </div>
            </div>

            {/* Form Section (Right) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-[#1C212B] overflow-y-auto">
                <form onSubmit={handleSubmit} className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700 py-8">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Crear cuenta</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Ingresa tus datos para registrarte
                        </p>
                    </div>

                    {errors.length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30 space-y-1">
                            {errors.map((error, index) => (
                                <p key={index} className="flex items-start">
                                    <span className="mr-2 mt-0.5">•</span>
                                    <span>{error}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Tipo de cuenta Segmented Control */}
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setAccountType("personal")}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${accountType === "personal" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                            >
                                Personal
                            </button>
                            <button
                                type="button"
                                onClick={() => setAccountType("empresa")}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${accountType === "empresa" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                            >
                                Empresa
                            </button>
                        </div>

                        {accountType === "empresa" && (
                            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                <Label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="companyName">Nombre de la Empresa</Label>
                                <Input className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl" id="companyName"
                                    placeholder="Mi Empresa S.A. de C.V."
                                    value={form.companyName}
                                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="username">Usuario</Label>
                                <Input className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl" id="username"
                                    placeholder="Tu usuario"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value.trim() })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="email">Correo electrónico</Label>
                                <Input className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl" id="email" type="email"
                                    placeholder="tu@ejemplo.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Input className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl pr-10" id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="confirmPassword">Repetir contraseña</Label>
                                <div className="relative">
                                    <Input className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C2A359] focus:border-transparent transition-all py-6 rounded-xl pr-10"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 mt-6 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 text-[#C2A359] bg-white border-gray-300 rounded focus:ring-[#C2A359] dark:bg-gray-700 dark:border-gray-600 focus:ring-2 cursor-pointer transition-colors"
                            />
                            <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed cursor-pointer">
                                He leído y acepto los <Link href="/terms" className="text-[#C2A359] hover:text-[#b0924e] font-medium hover:underline transition-colors" target="_blank">Términos y Condiciones</Link> y el <Link href="/privacy" className="text-[#C2A359] hover:text-[#b0924e] font-medium hover:underline transition-colors" target="_blank">Aviso de Privacidad</Link>.
                            </Label>
                        </div>

                        <Button
                            className="w-full mt-8 bg-[#C2A359] hover:bg-[#b0924e] text-white py-6 rounded-xl text-lg font-medium transition-all shadow-lg shadow-[#C2A359]/20 hover:shadow-[#C2A359]/40"
                        >
                            Crear cuenta
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/auth/login" className="font-semibold text-[#C2A359] hover:text-[#b0924e] transition-colors">
                            Iniciar sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
