import { create } from 'zustand';
import { login, fetchUser, logout, register, acceptTermsAPI, refreshSessionAPI } from "../lib/api";

interface AuthState {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
        company_id?: number;
        must_change_password?: boolean;
        terms_accepted_at?: string | null;
        company?: {
            id: number;
            name: string;
            plan_type: string;
            generations_count: number;
            total_contracts_generated: number;
            last_generation_reset: string;
        } | null;
        exp?: number;
    } | null;
    setUser: (user: AuthState['user']) => void;
    logout: () => void;
    url: string;
    loginUser: (email: string, password: string, ur: string) => Promise<void>;
    userAuth: boolean
    userValid: () => Promise<void>;
    registerUser: (username: string, email: string, password: string, accepted_terms: boolean, terms_version: string, company_name?: string) => Promise<{ success: boolean, error?: string }>;
    acceptTerms: (terms_version: string) => Promise<{ success: boolean, error?: string }>;
    refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    userAuth: false,
    // url: 'http://localhost:8000',
    // url: 'https://contratos-backend-hjag.onrender.com',
    url: 'https://api.easycontract.com.mx',
    setUser: (user) => set({ user }),
    loginUser: async (email, password) => {
        const data = await login(email, password, useAuthStore.getState().url);
        if (!data) {
            return;
        }
        const user_data = await fetchUser(useAuthStore.getState().url)
        if (!user_data) {
            return;
        }
        set({ userAuth: true });
        set({ user: user_data });
    },
    userValid: async () => {
        const data = await fetchUser(useAuthStore.getState().url);
        if (!data) {
            set({ userAuth: false, user: null });  // Asegurar que se limpie el estado
            return;
        }
        set({ userAuth: true, user: data });
    },
    refreshSession: async () => {
        try {
            const data = await refreshSessionAPI(useAuthStore.getState().url);
            if (data && data.exp) {
                // Actualizar el user localmente
                const currentUser = useAuthStore.getState().user;
                if (currentUser) {
                    set({ user: { ...currentUser, exp: data.exp } });
                }
            }
        } catch (error) {
            console.error("Error al refrescar la sesión", error);
        }
    },
    // 📌 Cerrar sesión
    logout: async () => {
        try {
            const data = await logout(useAuthStore.getState().url);
            if (!data) {
                return;
            }
            set({ user: null, userAuth: false });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    },
    registerUser: async (username, email, password, accepted_terms, terms_version, company_name?: string) => {
        const result = await register(username, email, password, useAuthStore.getState().url, accepted_terms, terms_version, company_name);
        if (result && result.error) {
            return { success: false, error: result.error };
        }
        if (!result) {
            return { success: false, error: "Error desconocido" };
        }
        return { success: true };
    },
    acceptTerms: async (terms_version: string) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await acceptTermsAPI(useAuthStore.getState().url, true, terms_version);
            // Optionally refresh user or update state
            await useAuthStore.getState().userValid();
            return { success: true };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return { success: false, error: errorMessage };
        }
    },

}));
