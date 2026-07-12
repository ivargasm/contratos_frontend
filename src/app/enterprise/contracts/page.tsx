"use client";

import { useEffect, useState, useCallback } from "react";
import { getEnterpriseContracts, ActivityResponse, resendSignatureInvitation } from "@/app/lib/enterprise";
import { useAuthStore } from "@/app/store/Store";
import { Users, Mail, RefreshCw, X, Edit2, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ContractsManagementPage() {
    const { url } = useAuthStore();
    const [contracts, setContracts] = useState<ActivityResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'electronica' | 'tradicional'>('electronica');
    const [selectedContract, setSelectedContract] = useState<ActivityResponse | null>(null);

    const fetchContracts = useCallback(async () => {
        try {
            const data = await getEnterpriseContracts(url);
            setContracts(data);
        } catch {
            toast.error("Error al cargar los contratos");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchContracts();
    }, [fetchContracts]);

    const filteredContracts = contracts.filter(c => 
        (activeTab === 'electronica' && c.signature_mode === 'electronica') ||
        (activeTab === 'tradicional' && (c.signature_mode === 'tradicional' || !c.signature_mode))
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Contratos</h1>
                <p className="text-gray-500 mt-2">Administra y haz seguimiento al estado de los contratos generados.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => setActiveTab('electronica')}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'electronica'
                            ? "text-[#C2A359]"
                            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                >
                    Firma Electrónica
                    {activeTab === 'electronica' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A359]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('tradicional')}
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'tradicional'
                            ? "text-[#C2A359]"
                            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                >
                    Tradicional
                    {activeTab === 'tradicional' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A359]" />
                    )}
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-[#111111] text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Plantilla</th>
                                <th className="px-6 py-4 font-medium">Fecha de Creación</th>
                                <th className="px-6 py-4 font-medium">Firmas</th>
                                <th className="px-6 py-4 font-medium">Estado Global</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Cargando contratos...</td>
                                </tr>
                            ) : filteredContracts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No hay contratos en esta categoría.
                                    </td>
                                </tr>
                            ) : (
                                filteredContracts.map(contract => {
                                    const totalSigners = contract.signers?.length || 0;
                                    const completedSigners = contract.signers?.filter(s => s.status === 'firmado').length || 0;
                                    
                                    return (
                                        <tr 
                                            key={contract.id} 
                                            onClick={() => activeTab === 'electronica' ? setSelectedContract(contract) : null}
                                            className={`group transition-colors ${activeTab === 'electronica' ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222]' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 dark:text-gray-100">{contract.template?.name || 'Desconocida'}</div>
                                                <div className="text-sm text-gray-500">ID: {contract.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {format(new Date(contract.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                                            </td>
                                            <td className="px-6 py-4">
                                                {activeTab === 'electronica' ? (
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm font-medium">
                                                            {completedSigners} / {totalSigners}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {activeTab === 'electronica' ? (
                                                    contract.is_signed ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            Completado
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            Pendiente
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                                        Tradicional
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Detalle */}
            {selectedContract && (
                <SignersModal 
                    contract={selectedContract} 
                    onClose={() => setSelectedContract(null)} 
                    onUpdate={fetchContracts}
                    url={url}
                />
            )}
        </div>
    );
}

function SignersModal({ contract, onClose, onUpdate, url }: { contract: ActivityResponse, onClose: () => void, onUpdate: () => void, url: string }) {
    const [editingSigner, setEditingSigner] = useState<number | null>(null);
    const [editEmail, setEditEmail] = useState("");
    const [loading, setLoading] = useState<number | null>(null);

    const handleResend = async (signerId: number) => {
        setLoading(signerId);
        try {
            const emailToSend = editingSigner === signerId ? editEmail : undefined;
            await resendSignatureInvitation(url, signerId, emailToSend);
            toast.success("Invitación reenviada exitosamente");
            if (editingSigner === signerId) {
                setEditingSigner(null);
                onUpdate(); // refresh data to show new email
            }
        } catch (error: unknown) {
            toast.error((error as Error).message || "Error al reenviar");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Detalle de Firmas</h2>
                        <p className="text-sm text-gray-500 mt-1">Contrato #{contract.id} - {contract.template?.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <div className="space-y-4">
                        {contract.signers?.map((signer: Record<string, unknown>) => {
                            const signerId = signer.id as number;
                            const signerName = signer.name as string;
                            const signerEmail = signer.email as string;
                            const signerRole = signer.role as string;
                            const signerStatus = signer.status as string;
                            const signerSignedAt = signer.signed_at as string | null;
                            
                            return (
                                <div key={signerId} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">{signerName}</span>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded uppercase font-medium">
                                                {signerRole}
                                            </span>
                                        </div>
                                        
                                        {editingSigner === signerId ? (
                                            <div className="mt-2 flex items-center gap-2">
                                                <Input 
                                                    value={editEmail} 
                                                    onChange={(e) => setEditEmail(e.target.value)}
                                                    className="h-8 text-sm"
                                                    placeholder="Nuevo correo"
                                                />
                                                <Button 
                                                    size="sm" 
                                                    variant="ghost" 
                                                    onClick={() => setEditingSigner(null)}
                                                >
                                                    Cancelar
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5" />
                                                {signerEmail}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {signerStatus === 'firmado' ? (
                                            <div className="text-right">
                                                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                                                    <CheckCircle2 className="w-4 h-4" /> Firmado
                                                </span>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    {signerSignedAt ? format(new Date(signerSignedAt), "d MMM, HH:mm", { locale: es }) : ''}
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                                                    <Clock className="w-4 h-4" /> Pendiente
                                                </span>
                                                
                                                <div className="flex gap-2 ml-4">
                                                    {editingSigner !== signerId && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingSigner(signerId);
                                                                setEditEmail(signerEmail);
                                                            }}
                                                            title="Editar correo"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button 
                                                        size="sm"
                                                        className="bg-[#C2A359] hover:bg-[#b0924e] text-white"
                                                        onClick={() => handleResend(signerId)}
                                                        disabled={loading === signerId}
                                                    >
                                                        {loading === signerId ? (
                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Mail className="w-4 h-4 mr-2" />
                                                                {editingSigner === signerId ? "Guardar y Reenviar" : "Reenviar"}
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111] flex justify-end">
                    <Button onClick={onClose} variant="outline">
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    );
}
