export interface TemplateResponse {
    id: number;
    company_id: number;
    name: string;
    file_path: string;
    fields_schema: {
        variables: string[];
    } | null;
    created_at: string;
}

export async function getTemplates(url: string): Promise<TemplateResponse[]> {
    const res = await fetch(`${url}/enterprise/templates/`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al obtener plantillas");
    }

    return await res.json();
}

export async function uploadTemplate(url: string, name: string, file: File): Promise<TemplateResponse> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    const res = await fetch(`${url}/enterprise/templates/`, {
        method: "POST",
        credentials: "include",
        body: formData, // fetch automáticamente establece el Content-Type para FormData
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al subir plantilla");
    }

    return await res.json();
}

export async function generateBulkContracts(url: string, templateId: number, file: File, templateName: string, autoSignerId?: number | null): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    if (autoSignerId) {
        formData.append("auto_signer_id", autoSignerId.toString());
    }

    const res = await fetch(`${url}/enterprise/templates/${templateId}/generate/bulk/`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error en la generación masiva");
    }

    // Descargar el archivo ZIP
    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `contratos_masivos_${templateName.replace(' ', '_')}.zip`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
}

export async function generateSingleContract(
    url: string, 
    templateId: number, 
    data: Record<string, string | number>, 
    templateName: string,
    signatureMode?: 'tradicional' | 'electronica',
    signers?: {name: string, email: string, role: string}[],
    autoSignerId?: number | null
): Promise<void> {
    const payload = {
        data,
        signature_mode: signatureMode || 'tradicional',
        signers: signers || null,
        auto_signer_id: autoSignerId || null
    };

    const res = await fetch(`${url}/enterprise/templates/${templateId}/generate/single/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al generar el contrato");
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        // En caso de firma electrónica, el backend nos regresará un JSON en lugar de un archivo.
        await res.json();
        return;
    }

    // Descargar el archivo PDF o DOCX
    const blob = await res.blob();

    // Extraer extensión del content-type (PDF o DOCX)
    const ext = contentType.includes("pdf") ? ".pdf" : ".docx";

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `contrato_${templateName.replace(/ /g, '_')}${ext}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
}

export async function updateTemplate(url: string, templateId: number, file: File): Promise<TemplateResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${url}/enterprise/templates/${templateId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al actualizar plantilla");
    }

    return await res.json();
}

export async function deleteTemplate(url: string, templateId: number): Promise<void> {
    const res = await fetch(`${url}/enterprise/templates/${templateId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al eliminar plantilla");
    }
}

export async function downloadTemplate(url: string, templateId: number, templateName: string): Promise<void> {
    const res = await fetch(`${url}/enterprise/templates/${templateId}/download`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al descargar plantilla");
    }

    const data = await res.json();

    // Abrir URL de S3 en una nueva pestaña o descargar
    const downloadUrl = data.url;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = "_blank"; // Para que abra/descargue en nueva pestaña
    link.setAttribute('download', `${templateName}.docx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
}

export interface ActivityResponse {
    id: number;
    type?: string;
    contract_type?: string;
    signature_mode?: string;
    is_signed?: boolean;
    status?: string;
    data?: Record<string, unknown>;
    created_at: string;
    template: TemplateResponse;
    signers?: Record<string, unknown>[];
}

export async function getEnterpriseActivity(url: string): Promise<ActivityResponse[]> {
    const res = await fetch(`${url}/enterprise/activity`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error fetching activity");
    }

    return await res.json();
}

export async function getEnterpriseContracts(url: string): Promise<ActivityResponse[]> {
    const res = await fetch(`${url}/enterprise/contracts`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error fetching contracts");
    }

    return await res.json();
}

export async function resendSignatureInvitation(url: string, signerId: number, newEmail?: string): Promise<{message: string}> {
    const res = await fetch(`${url}/enterprise/signatures/resend/${signerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Error al reenviar invitación");
    }

    return await res.json();
}

export interface CompanySigner {
    id: number;
    name: string;
    role: string;
    signature_data: string;
    created_at: string;
}

export async function getAutoSigners(url: string): Promise<CompanySigner[]> {
    const res = await fetch(`${url}/enterprise/auto-signers`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Error fetching auto signers");
    return await res.json();
}

export async function createAutoSigner(url: string, name: string, role: string, signatureData: string): Promise<CompanySigner> {
    const res = await fetch(`${url}/enterprise/auto-signers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, role, signature_data: signatureData })
    });
    if (!res.ok) throw new Error("Error creating auto signer");
    return await res.json();
}

export async function deleteAutoSigner(url: string, signerId: number): Promise<void> {
    const res = await fetch(`${url}/enterprise/auto-signers/${signerId}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Error deleting auto signer");
}
