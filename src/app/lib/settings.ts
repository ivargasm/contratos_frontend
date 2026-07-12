export interface UserResponse {
    id: number;
    username: string;
    email: string;
    role: string;
    company_id: number | null;
}

export async function updateCompanyName(url: string, name: string) {
    const response = await fetch(`${url}/enterprise/settings/company`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error actualizando empresa");
    }
    return response.json();
}

export async function updatePassword(url: string, current_password: string, new_password: string) {
    const response = await fetch(`${url}/enterprise/settings/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password, new_password }),
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error actualizando contraseña");
    }
    return response.json();
}

export async function getEnterpriseUsers(url: string): Promise<UserResponse[]> {
    const response = await fetch(`${url}/enterprise/settings/users`, {
        method: 'GET',
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error obteniendo usuarios");
    }
    return response.json();
}

export async function addEnterpriseUser(url: string, userData: { username: string, email: string, password: string }): Promise<UserResponse> {
    const response = await fetch(`${url}/enterprise/settings/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error creando usuario");
    }
    return response.json();
}

export async function removeEnterpriseUser(url: string, userId: number) {
    const response = await fetch(`${url}/enterprise/settings/users/${userId}`, {
        method: 'DELETE',
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error eliminando usuario");
    }
    return response.json();
}

export async function createCustomerPortalSession(url: string): Promise<{ url: string }> {
    const response = await fetch(`${url}/payments/customer-portal`, {
        method: 'POST',
        credentials: "include"
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error abriendo el portal de pagos");
    }
    return response.json();
}
