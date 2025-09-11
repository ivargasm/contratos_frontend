"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/Store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { userAuth, userValid } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            await userValid();
            setIsLoading(false);
        };
        checkAuth();
    }, [userValid]);

    useEffect(() => {
        if (!isLoading && !userAuth) {
            router.push("/auth/login");
        }
    }, [userAuth, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Verificando autenticación...</div>
            </div>
        );
    }

    return userAuth ? children : null;
}