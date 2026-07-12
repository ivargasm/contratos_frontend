"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/Store";

export default function ProtectedRoute({ 
    children, 
    requireCompany = false, 
    requirePersonal = false 
}: { 
    children: React.ReactNode,
    requireCompany?: boolean,
    requirePersonal?: boolean
}) {
    const router = useRouter();
    const { userAuth, userValid, user, refreshSession, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const [showSessionModal, setShowSessionModal] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            await userValid();
            setIsLoading(false);
        };
        checkAuth();
    }, [userValid]);

    useEffect(() => {
        if (!isLoading) {
            if (!userAuth) {
                router.push("/auth/login");
                return;
            }
            
            // Redirect to force password change if required
            if (user?.must_change_password) {
                // Check if already on the page to prevent infinite loops (if this component wraps it)
                if (window.location.pathname !== "/force-password-change") {
                    router.push("/force-password-change");
                    return;
                }
            }

            // RBAC logic
            const hasCompany = !!user?.company_id;
            
            if (requireCompany && !hasCompany) {
                router.push("/contract-selector");
            } else if (requirePersonal && hasCompany) {
                router.push("/enterprise/dashboard");
            }
        }
    }, [userAuth, isLoading, router, requireCompany, requirePersonal, user?.company_id, user?.must_change_password]);

    // Lógica para vigilar la expiración de sesión
    useEffect(() => {
        if (!user || !user.exp) return;

        // user.exp is in seconds, convert to milliseconds
        const expMs = user.exp * 1000;
        
        const checkExpiration = () => {
            const now = Date.now();
            const timeLeft = expMs - now;

            // Si quedan 5 minutos o menos (pero no ha expirado), mostramos modal
            if (timeLeft <= 5 * 60 * 1000 && timeLeft > 0) {
                setShowSessionModal(true);
            } else if (timeLeft <= 0) {
                // Ya expiró, logout forzoso
                setShowSessionModal(false);
                logout();
                router.push("/auth/login?expired=true");
            } else {
                // Todavía hay tiempo, ocultamos modal por si estaba visible
                setShowSessionModal(false);
            }
        };

        // Verificamos inmediatamente
        checkExpiration();

        // Verificamos cada segundo para ser precisos
        const interval = setInterval(checkExpiration, 1000);

        return () => clearInterval(interval);
    }, [user, logout, router]);

    const handleAcceptTerms = async () => {
        try {
            await useAuthStore.getState().acceptTerms("1.0");
            // The state is already updated via userValid() inside acceptTerms, but let's reload to be absolutely sure and clear the modal.
            window.location.reload();
        } catch (error) {
            console.error("Error al aceptar términos:", error);
        }
    };

    const handleRenewSession = async () => {
        await refreshSession();
        setShowSessionModal(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Verificando autenticación...</div>
            </div>
        );
    }

    const showTermsModal = userAuth && user && user.terms_accepted_at === null;

    return (
        <>
            {userAuth ? children : null}
            
            {showTermsModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#252C38] p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 border border-gray-100 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Actualización de Políticas 📜</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Hemos actualizado nuestros <strong>Términos y Condiciones</strong> y <strong>Aviso de Privacidad</strong>. 
                            Para garantizar tu seguridad legal y continuar generando contratos en nuestra plataforma, debes revisarlos y aceptarlos.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <a 
                                    href="/terms" 
                                    target="_blank"
                                    className="flex-1 px-4 py-2 text-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
                                >
                                    Términos y Condiciones
                                </a>
                                <a 
                                    href="/privacy" 
                                    target="_blank"
                                    className="flex-1 px-4 py-2 text-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
                                >
                                    Aviso de Privacidad
                                </a>
                            </div>
                            <button
                                onClick={handleAcceptTerms}
                                className="w-full px-4 py-3 bg-[#C2A359] hover:bg-[#A98D4D] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#C2A359]/20"
                            >
                                Acepto Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {showSessionModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#252C38] p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-gray-100 dark:border-gray-800 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tu sesión expirará pronto</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                            Por seguridad, tu sesión se cerrará en menos de 5 minutos por inactividad. ¿Deseas continuar navegando?
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleRenewSession}
                                className="w-full px-4 py-2.5 bg-[#C2A359] hover:bg-[#A98D4D] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#C2A359]/20"
                            >
                                Sí, continuar
                            </button>
                            <button
                                onClick={() => {
                                    logout();
                                    router.push("/auth/login?expired=true");
                                }}
                                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
                            >
                                Cerrar sesión ahora
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}