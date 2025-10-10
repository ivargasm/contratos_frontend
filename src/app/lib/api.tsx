import { redirect } from "next/navigation";
import { ContratoCompleto } from "@/app/store/useContratoStore";

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
            contract_type: type,
            form_data: data,
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
export async function getContracts(url: string): Promise<ContratoCompleto[]> {
    const res = await fetch(`${url}/contracts/list`, {
        method: "GET", credentials: "include",
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Error al obtener contratos");
    return await res.json();
}

// Generar enlace de pago
export const createPaymentLink = async (
    url: string,
    operation_type: 'new' | 'duplicate' | 'new_version',
    original_contract_id?: number
) => {
    const body: { operation_type: string; original_contract_id?: number } = {
        operation_type,
    };

    if (original_contract_id) {
        body.original_contract_id = original_contract_id;
    }

    const res = await fetch(`${url}/payments/create-payment-link`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "No se pudo generar el enlace de pago");
    }

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

/** @deprecated Reemplazada por getContractDetails, se mantiene por retrocompatibilidad */
export async function getEditableContract(url: string, contractId: number) {
    console.warn("ADVERTENCIA: 'getEditableContract' es una función obsoleta. Usar 'getContractDetails' en su lugar.");
    // Llama a la nueva función
    const fullContract = await getContractDetails(url, contractId);

    // Devuelve el formato que el código antiguo espera
    return {
        type: fullContract.contract_type,
        data: fullContract.form_data,
    };
}

export async function updateContract(
    url: string,
    contractId: number,
    contract_type: string,
    form_data: Record<string, unknown>
): Promise<ContratoCompleto> {
    const response = await fetch(`${url}/contracts/${contractId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ contract_type, form_data }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al actualizar el contrato");
    }
    return await response.json();
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

// --- NUEVAS FUNCIONES DE API PARA VERSIONADO ---
export async function getContractDetails(url: string, contractId: number): Promise<ContratoCompleto> {
    const response = await fetch(`${url}/contracts/${contractId}`, {
        method: "GET", credentials: "include"
    });
    if (!response.ok) throw new Error((await response.json()).detail || "Error al obtener detalles");
    return await response.json();
}

export async function finalizeContract(url: string,contractId: number): Promise<ContratoCompleto> {
    const response = await fetch(`${url}/contracts/${contractId}/finalize`, {
        method: "POST", credentials: "include"
    });
    if (!response.ok) throw new Error((await response.json()).detail || "Error al finalizar");
    return await response.json();
}

export async function createNewVersion(url: string,contractId: number): Promise<ContratoCompleto> {
    const response = await fetch(`${url}/contracts/${contractId}/new-version`, {
        method: "POST", credentials: "include"
    });
    if (!response.ok) throw new Error((await response.json()).detail || "Error al crear nueva versión");
    return await response.json();
}

export async function duplicateContract(url: string,contractId: number): Promise<ContratoCompleto> {
    const response = await fetch(`${url}/contracts/${contractId}/duplicate`, {
        method: "POST", credentials: "include"
    });
    if (!response.ok) throw new Error((await response.json()).detail || "Error al duplicar");
    return await response.json();
}

// --- NUEVA FUNCIÓN DE DESCARGA INTELIGENTE ---
export async function downloadContract(url: string, contractId: number) {
    const response = await fetch(`${url}/contracts/download/${contractId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al descargar el contrato");
    }

    // Verificamos el tipo de contenido para decidir cómo manejar la respuesta
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        // Es un contrato FINALIZADO, el backend nos da una URL de S3
        const data = await response.json();
        if (data.download_url) {
            window.open(data.download_url, '_blank');
        } else {
            throw new Error("No se recibió la URL de descarga.");
        }
    } else if (contentType && contentType.includes("application/pdf")) {
        // Es un BORRADOR, el backend nos da el PDF directamente
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Extraemos el nombre del archivo de los headers
        const disposition = response.headers.get('content-disposition');
        let filename = `borrador-contrato-${contractId}.pdf`; // Nombre por defecto
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl); // Liberar memoria
    } else {
        throw new Error("Tipo de respuesta no soportado desde el servidor.");
    }
}