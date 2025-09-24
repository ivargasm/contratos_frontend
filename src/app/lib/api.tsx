import { redirect } from "next/navigation";

export const fetchUser = async (url: string) => {
    const res = await fetch(`${url}/auth/me`, { credentials: 'include' });
    if (!res.ok) redirect("/auth/login");;
    return res.json();
};


export const login = async (email: string, password: string, url: string) => {
    const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciales incorrectas');
    return res;
};

export const logout = async (url: string) => {
    const res = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al cerrar sesión');
    return res;
};

export async function register(username: string, email: string, password: string, url: string) {
    try {
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        return res.json();
    } catch (error) {
        console.error("Error en el registro:", error);
        return false;
    }
}

export async function forgot_password(url: string, email: string) {
    const res = await fetch(`${url}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error('Error al enviar el correo');
    return res;
}

export async function reset_password(url: string, new_password: string, token: string) {
    const res = await fetch(`${url}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password }),
    });

    if (!res.ok) throw new Error('Error al resetear la contraseña');
    return res;
}

export async function generatePurchaseSaleContract(url: string, type: string, data: Record<string, string>) {
    const response = await fetch(`${url}/contracts/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // importante si manejas sesión con cookies
        body: JSON.stringify({
            type,
            data: data,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error generating contract");
    }

    return await response.json(); // { id, message, download_url }
}

export async function previewContract(url: string, type: string, data: Record<string, string>) {
    const res = await fetch(`${url}/contracts/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, data }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al generar vista previa");
    }

    return await res.json(); // { html: "<html>...</html>" }
}


export async function generateContractFromIA(url: string, type: string, message: string) {
    const res = await fetch(`${url}/contracts_ai/generate-with-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, message }),
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || "Error generating contract from IA")
    }

    return res.json() // { data: { ...campos del contrato } }
}

// obtener contratos generados por el usuario
export async function getContracts(url: string) {
    const res = await fetch(`${url}/contracts/list`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al obtener contratos");
    }

    return await res.json(); // { contracts: [...contratos] }
}

// Generar enlace de pago
export const createPaymentLink = async (url: string) => {
    const res = await fetch(`${url}/payments/create-payment-link`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("No se pudo generar el enlace de pago");

    const data = await res.json();
    return data.url;
};

export const getAvailableContracts = async (url: string) => {
    const res = await fetch(`${url}/contracts/available-count`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("No se pudo obtener el contador de contratos");
    const data = await res.json();
    return data.remaining;
};

export const getPresignedUrl = async (url: string, contract_id: number) => {
    try {
        const res = await fetch(`${url}/contracts/download-url/${contract_id}`, {
            credentials: "include",
        });
        const data = await res.json();
        if (data?.url) {
            return data.url;
        }
    } catch (err) {
        alert("Error al generar el link de descarga: " + err);
    }
};

export async function getEditableContract(url: string, contractId: number) {
    const response = await fetch(`${url}/contracts/editable/${contractId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al obtener el contrato editable");
    }

    return await response.json(); // { type, data }
}

export async function updateContract(
    url: string,
    contractId: number,
    type: string,
    data: Record<string, string>
) {
    const response = await fetch(`${url}/contracts/contract-update/${contractId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al actualizar el contrato");
    }

    return await response.json(); // { id, message, download_url }
}

export async function changePassword(url: string, currentPassword: string, newPassword: string) {
    const res = await fetch(`${url}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Error al cambiar la contraseña');
    }
    return res;
}
