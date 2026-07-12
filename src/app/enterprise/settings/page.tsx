"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/Store";
import {
    updateCompanyName,
    updatePassword,
    getEnterpriseUsers,
    addEnterpriseUser,
    removeEnterpriseUser,
    createCustomerPortalSession,
    UserResponse
} from "../../lib/settings";
import { Settings, Users, CreditCard, Shield, Plus, Trash2, PenTool, Upload } from "lucide-react";
import Image from "next/image";
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';
import { getAutoSigners, createAutoSigner, deleteAutoSigner, CompanySigner } from '../../lib/enterprise';

export default function EnterpriseSettings() {
    const { user, url, userValid } = useAuthStore();
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        // Read initial tab from URL hash if present
        if (typeof window !== 'undefined' && window.location.hash) {
            const hashTab = window.location.hash.replace('#', '');
            if (['general', 'security', 'team', 'billing', 'signers'].includes(hashTab)) {
                setActiveTab(hashTab);
            }
        }
    }, []);

    const isFree = user?.company?.plan_type === "free";
    const currentPlan = user?.company?.plan_type || "free";
    const isAdmin = user?.role === "admin" || user?.role === "enterprise_admin";

    // Form states
    const [companyName, setCompanyName] = useState(user?.company?.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Team states
    const [team, setTeam] = useState<UserResponse[]>([]);
    const [loadingTeam, setLoadingTeam] = useState(false);

    // UI states
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteData, setInviteData] = useState({ username: "", email: "", password: "" });

    // Auto Signers states
    const [autoSigners, setAutoSigners] = useState<CompanySigner[]>([]);
    const [loadingSigners, setLoadingSigners] = useState(false);
    const [showSignerModal, setShowSignerModal] = useState(false);
    const [signerData, setSignerData] = useState({ name: "", role: "" });
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [signatureMode, setSignatureMode] = useState<'draw' | 'upload'>('draw');
    const [uploadedSignature, setUploadedSignature] = useState<string>('');

    useEffect(() => {
        const loadTeam = async () => {
            setLoadingTeam(true);
            try {
                const users = await getEnterpriseUsers(url);
                setTeam(users);
            } catch (error: unknown) {
                console.error(error);
            } finally {
                setLoadingTeam(false);
            }
        };

        const loadSigners = async () => {
            setLoadingSigners(true);
            try {
                const signers = await getAutoSigners(url);
                setAutoSigners(signers);
            } catch (error: unknown) {
                console.error(error);
            } finally {
                setLoadingSigners(false);
            }
        };

        if (activeTab === "team" && isAdmin) {
            loadTeam();
        }
        if (activeTab === "signers") {
            loadSigners();
        }
    }, [activeTab, isAdmin, url]);

    const showMessage = (text: string, type: "success" | "error") => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    };

    const handleUpdateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateCompanyName(url, companyName);
            showMessage("Empresa actualizada correctamente", "success");
            userValid(); // Refresh global state
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updatePassword(url, currentPassword, newPassword);
            showMessage("Contraseña actualizada correctamente", "success");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addEnterpriseUser(url, inviteData);
            showMessage("Usuario agregado correctamente", "success");
            setShowInviteModal(false);
            setInviteData({ username: "", email: "", password: "" });
            // Cannot easily call loadTeam here if moved into useEffect. Let's just fetch it again
            getEnterpriseUsers(url).then(setTeam).catch(console.error);
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (id: number) => {
        if (!confirm("¿Seguro que deseas eliminar este usuario de la empresa?")) return;
        try {
            await removeEnterpriseUser(url, id);
            showMessage("Usuario eliminado", "success");
            getEnterpriseUsers(url).then(setTeam).catch(console.error);
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        }
    };

    const handleAddSigner = async (e: React.FormEvent) => {
        e.preventDefault();

        let signatureData = "";
        if (signatureMode === 'draw') {
            if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
                showMessage("Por favor dibuja la firma.", "error");
                return;
            }
            signatureData = sigCanvas.current.toDataURL("image/png");
        } else {
            if (!uploadedSignature) {
                showMessage("Por favor sube una imagen de la firma.", "error");
                return;
            }
            signatureData = uploadedSignature;
        }

        setLoading(true);
        try {
            await createAutoSigner(url, signerData.name, signerData.role, signatureData);
            showMessage("Perfil de firma creado correctamente", "success");
            setShowSignerModal(false);
            setSignerData({ name: "", role: "" });
            setUploadedSignature('');
            sigCanvas.current?.clear();
            getAutoSigners(url).then(setAutoSigners).catch(console.error);
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showMessage("La imagen no debe superar los 2MB", "error");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedSignature(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveSigner = async (id: number) => {
        if (!confirm("¿Seguro que deseas eliminar este perfil de firma?")) return;
        try {
            await deleteAutoSigner(url, id);
            showMessage("Perfil eliminado", "success");
            getAutoSigners(url).then(setAutoSigners).catch(console.error);
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
        }
    };

    const handleManageBilling = async () => {
        try {
            setLoading(true);
            const { url: portalUrl } = await createCustomerPortalSession(url);
            window.location.href = portalUrl;
        } catch (error: unknown) {
            showMessage((error as Error).message, "error");
            setLoading(false);
        }
    };

    const handleUpgrade = async (plan: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/payments/create-payment-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ operation_type: `upgrade_${plan}` }),
            });
            const data = await response.json();
            if (response.ok) {
                window.location.href = data.url;
            } else {
                showMessage(data.detail || "Error al procesar el pago", "error");
                setLoading(false);
            }
        } catch {
            showMessage("Error de conexión", "error");
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configuración</h1>
            <p className="text-gray-500 mb-8">Administra los datos de tu empresa, tu equipo y tu suscripción.</p>

            {/* Notification */}
            {message.text && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <nav className="flex flex-col space-y-1">
                        <button
                            onClick={() => setActiveTab("general")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "general" ? "bg-[#C2A359] text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                        >
                            <Settings className="w-5 h-5" />
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab("security")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "security" ? "bg-[#C2A359] text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                        >
                            <Shield className="w-5 h-5" />
                            Seguridad
                        </button>
                        {isAdmin && (
                            <button
                                onClick={() => setActiveTab("team")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "team" ? "bg-[#C2A359] text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                            >
                                <Users className="w-5 h-5" />
                                Miembros del Equipo
                            </button>
                        )}
                        {isAdmin && (
                            <button
                                onClick={() => setActiveTab("billing")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "billing" ? "bg-[#C2A359] text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                            >
                                <CreditCard className="w-5 h-5" />
                                Facturación
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab("signers")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "signers" ? "bg-[#C2A359] text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
                        >
                            <PenTool className="w-5 h-5" />
                            Firmas Automáticas
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 md:p-8">

                    {/* GENERAL TAB */}
                    {activeTab === "general" && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Perfil de la Empresa</h2>

                            <form onSubmit={handleUpdateCompany} className="space-y-6 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de la Empresa</label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                        disabled={!isAdmin}
                                    />
                                    {!isAdmin && <p className="text-xs text-gray-500 mt-1">Solo el administrador puede cambiar este valor.</p>}
                                </div>
                                {isAdmin && (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                    >
                                        {loading ? "Guardando..." : "Guardar Cambios"}
                                    </button>
                                )}
                            </form>
                        </div>
                    )}

                    {/* SECURITY TAB */}
                    {activeTab === "security" && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Seguridad</h2>

                            <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña Actual</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                >
                                    {loading ? "Actualizando..." : "Actualizar Contraseña"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* TEAM TAB */}
                    {activeTab === "team" && isAdmin && (
                        <div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Miembros del Equipo</h2>
                                <button
                                    onClick={() => setShowInviteModal(true)}
                                    className="flex items-center gap-2 bg-[#C2A359] hover:bg-[#b0924e] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Añadir Miembro
                                </button>
                            </div>

                            {loadingTeam ? (
                                <p className="text-gray-500">Cargando equipo...</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-500">
                                                <th className="pb-3 font-medium">Usuario</th>
                                                <th className="pb-3 font-medium">Email</th>
                                                <th className="pb-3 font-medium">Rol</th>
                                                <th className="pb-3 font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                            {team.map((member) => (
                                                <tr key={member.id}>
                                                    <td className="py-4 font-medium">{member.username}</td>
                                                    <td className="py-4 text-sm">{member.email}</td>
                                                    <td className="py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                            {member.role === 'enterprise_admin' ? 'Administrador' : 'Usuario'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4">
                                                        {member.id.toString() !== user?.id && (
                                                            <button
                                                                onClick={() => handleRemoveMember(member.id)}
                                                                className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                title="Eliminar usuario"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* BILLING TAB */}
                    {activeTab === "billing" && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Facturación y Suscripción</h2>

                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between items-start gap-4 mb-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        Plan Actual:
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${isFree ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 'bg-[#C2A359] text-white'}`}>
                                            {currentPlan}
                                        </span>
                                    </h3>
                                    <p className="text-gray-500 mt-2 text-sm">
                                        {isFree
                                            ? 'Estás en el plan gratuito con límite de 2 plantillas y 10 contratos por mes.'
                                            : 'Tienes una suscripción activa. Puedes gestionarla desde el portal de Stripe.'}
                                    </p>
                                </div>

                                {!isFree && (
                                    <div className="w-full mt-4">
                                        <button
                                            onClick={handleManageBilling}
                                            disabled={loading}
                                            className="whitespace-nowrap bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 font-medium py-2.5 px-6 rounded-lg transition-colors"
                                        >
                                            {loading ? "Abriendo Portal..." : "Administrar Suscripción en Stripe"}
                                        </button>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Serás redirigido al portal seguro donde podrás actualizar tu método de pago o cancelar.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pricing Plans */}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mejora tu plan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Starter Plan */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col bg-white dark:bg-gray-800 shadow-sm relative">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Starter</h4>
                                    <p className="text-gray-500 text-sm mt-1 mb-4">Para pequeñas empresas</p>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$999</span>
                                        <span className="text-gray-500">/mes</span>
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Límite de 10 plantillas</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> 50 contratos por mes</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Firma electrónica avanzada</li>
                                        <li className="flex items-center text-sm text-gray-400 dark:text-gray-500 line-through"><span className="mr-2">✗</span> Generación masiva (CSV)</li>
                                    </ul>
                                    <button
                                        onClick={() => handleUpgrade("starter")}
                                        disabled={loading || currentPlan === "starter"}
                                        className={`w-full py-2 rounded-lg font-medium transition-colors ${currentPlan === "starter" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#111827] hover:bg-gray-800 text-white"}`}
                                    >
                                        {currentPlan === "starter" ? "Plan Actual" : "Elegir Starter"}
                                    </button>
                                </div>

                                {/* Business Plan */}
                                <div className="border-2 border-[#C2A359] rounded-xl p-6 flex flex-col bg-white dark:bg-gray-800 shadow-md relative transform scale-105">
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C2A359] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Recomendado
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Business</h4>
                                    <p className="text-gray-500 text-sm mt-1 mb-4">Para equipos en crecimiento</p>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$2,599</span>
                                        <span className="text-gray-500">/mes</span>
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Límite de 30 plantillas</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> 300 contratos por mes</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Firma electrónica avanzada</li>
                                        <li className="flex items-center text-sm text-gray-900 dark:text-white font-semibold"><span className="text-green-500 mr-2">✓</span> Generación masiva (CSV)</li>
                                    </ul>
                                    <button
                                        onClick={() => handleUpgrade("business")}
                                        disabled={loading || currentPlan === "business"}
                                        className={`w-full py-2 rounded-lg font-medium transition-colors ${currentPlan === "business" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#C2A359] hover:bg-[#b0924e] text-white"}`}
                                    >
                                        {currentPlan === "business" ? "Plan Actual" : "Elegir Business"}
                                    </button>
                                </div>

                                {/* Enterprise Plan */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col bg-white dark:bg-gray-800 shadow-sm relative">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Enterprise</h4>
                                    <p className="text-gray-500 text-sm mt-1 mb-4">Sin límites</p>
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$5,499</span>
                                        <span className="text-gray-500">/mes</span>
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Plantillas ilimitadas</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Contratos ilimitados</li>
                                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><span className="text-green-500 mr-2">✓</span> Firma electrónica avanzada</li>
                                        <li className="flex items-center text-sm text-gray-900 dark:text-white font-semibold"><span className="text-green-500 mr-2">✓</span> Generación masiva (CSV)</li>
                                    </ul>
                                    <button
                                        onClick={() => handleUpgrade("enterprise")}
                                        disabled={loading || currentPlan === "enterprise"}
                                        className={`w-full py-2 rounded-lg font-medium transition-colors ${currentPlan === "enterprise" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#111827] hover:bg-gray-800 text-white"}`}
                                    >
                                        {currentPlan === "enterprise" ? "Plan Actual" : "Elegir Enterprise"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SIGNERS TAB */}
                    {activeTab === "signers" && (
                        <div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Firmas Automáticas</h2>
                                    <p className="text-sm text-gray-500 mt-1">Configura perfiles de firmas pre-guardadas para inyectar automáticamente en tus contratos.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSignatureMode('draw');
                                        setUploadedSignature('');
                                        setShowSignerModal(true);
                                    }}
                                    className="flex items-center gap-2 bg-[#C2A359] hover:bg-[#b0924e] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap shrink-0"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nuevo Perfil
                                </button>
                            </div>

                            {loadingSigners ? (
                                <p className="text-gray-500">Cargando perfiles...</p>
                            ) : autoSigners.length === 0 ? (
                                <div className="text-center py-8">
                                    <PenTool className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No tienes firmas automáticas guardadas.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {autoSigners.map((signer) => (
                                        <div key={signer.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between bg-gray-50 dark:bg-gray-800/50">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{signer.name}</h3>
                                                    <p className="text-sm text-gray-500">{signer.role}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveSigner(signer.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    title="Eliminar perfil"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="bg-white dark:bg-gray-700 rounded-lg p-2 flex justify-center border border-gray-100 dark:border-gray-600 h-20 relative">
                                                <Image src={signer.signature_data} alt={`Firma de ${signer.name}`} fill className="object-contain p-2" unoptimized />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}


                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Añadir Miembro</h3>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    value={inviteData.username}
                                    onChange={(e) => setInviteData({ ...inviteData, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={inviteData.email}
                                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña Temporal</label>
                                <input
                                    type="text"
                                    value={inviteData.password}
                                    onChange={(e) => setInviteData({ ...inviteData, password: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">El usuario estará obligado a cambiarla en su primer inicio de sesión.</p>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#C2A359] hover:bg-[#b0924e] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    {loading ? "Creando..." : "Crear Usuario"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Signer Modal */}
            {showSignerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nuevo Perfil de Firma</h3>
                        <form onSubmit={handleAddSigner} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={signerData.name}
                                    onChange={(e) => setSignerData({ ...signerData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol / Puesto</label>
                                <input
                                    type="text"
                                    value={signerData.role}
                                    onChange={(e) => setSignerData({ ...signerData, role: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#C2A359] focus:border-[#C2A359] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Ej. Representante Legal"
                                    required
                                />
                            </div>
                            <div>
                                <div className="flex gap-4 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setSignatureMode('draw')}
                                        className={`text-sm font-medium pb-1 ${signatureMode === 'draw' ? 'text-[#C2A359] border-b-2 border-[#C2A359]' : 'text-gray-500'}`}
                                    >
                                        Dibujar Firma
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSignatureMode('upload')}
                                        className={`text-sm font-medium pb-1 ${signatureMode === 'upload' ? 'text-[#C2A359] border-b-2 border-[#C2A359]' : 'text-gray-500'}`}
                                    >
                                        Subir Imagen
                                    </button>
                                </div>

                                {signatureMode === 'draw' ? (
                                    <>
                                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white overflow-hidden">
                                            <SignatureCanvas
                                                ref={sigCanvas}
                                                canvasProps={{ className: 'w-full h-32 cursor-crosshair touch-none' }}
                                                backgroundColor="transparent"
                                                penColor="black"
                                            />
                                        </div>
                                        <div className="flex justify-end mt-1">
                                            <button
                                                type="button"
                                                onClick={() => sigCanvas.current?.clear()}
                                                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                Limpiar firma
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-center">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="signature-upload"
                                        />
                                        <label htmlFor="signature-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                            {uploadedSignature ? (
                                                <div className="relative h-24 w-full mb-2">
                                                    <Image src={uploadedSignature} alt="Firma subida" fill className="object-contain" unoptimized />
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 mb-2">
                                                    <Upload className="w-8 h-8 mx-auto mb-2" />
                                                    <span className="text-sm">Sube una imagen (PNG o JPG)</span>
                                                </div>
                                            )}
                                            <span className="text-xs text-[#C2A359] font-medium border border-[#C2A359] rounded px-3 py-1 mt-2">
                                                {uploadedSignature ? 'Cambiar imagen' : 'Seleccionar archivo'}
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowSignerModal(false);
                                        sigCanvas.current?.clear();
                                    }}
                                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#C2A359] hover:bg-[#b0924e] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    {loading ? "Guardando..." : "Guardar Perfil"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
