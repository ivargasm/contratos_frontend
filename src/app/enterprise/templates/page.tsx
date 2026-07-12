"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../../store/Store";
import { getTemplates, uploadTemplate, generateSingleContract, updateTemplate, downloadTemplate, deleteTemplate, TemplateResponse, getAutoSigners, CompanySigner } from "../../lib/enterprise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, PenLine, Eye, Trash2 } from "lucide-react";
import { SignatureModeModal } from "@/app/components/ui/SignatureModeModal";
import { toast } from "sonner";

export default function EnterpriseTemplates() {
    const { url, user, userValid } = useAuthStore();
    const [templates, setTemplates] = useState<TemplateResponse[]>([]);
    const [autoSigners, setAutoSigners] = useState<CompanySigner[]>([]);
    const [loading, setLoading] = useState(true);

    const planType = user?.company?.plan_type || "free";
    const isFree = planType === "free";
    
    const limitFree = parseInt(process.env.NEXT_PUBLIC_LIMIT_TEMPLATES_FREE || "2", 10);
    const limitStarter = parseInt(process.env.NEXT_PUBLIC_LIMIT_TEMPLATES_STARTER || "5", 10);
    const limitBusiness = parseInt(process.env.NEXT_PUBLIC_LIMIT_TEMPLATES_BUSINESS || "15", 10);
    
    let maxTemplates = limitFree;
    if (planType === "starter") maxTemplates = limitStarter;
    else if (planType === "business") maxTemplates = limitBusiness;
    else if (planType === "enterprise") maxTemplates = 1000000;
    
    const templatesLimitReached = templates.length >= maxTemplates;

    // Upload/Edit Modal State
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [editTemplateId, setEditTemplateId] = useState<number | null>(null);
    const [templateName, setTemplateName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    // Manual Generation State
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [selectedManualTemplate, setSelectedManualTemplate] = useState<TemplateResponse | null>(null);
    const [manualFormData, setManualFormData] = useState<Record<string, string>>({});
    const [generatingManual, setGeneratingManual] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    // Delete Confirmation State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState<TemplateResponse | null>(null);

    const fetchTemplates = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTemplates(url);
            setTemplates(data);
            
            try {
                const signers = await getAutoSigners(url);
                setAutoSigners(signers);
            } catch (e) {
                console.error("Error fetching auto signers:", e);
            }
            
        } catch (err: unknown) {
            const error = err as Error;
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!file.name.endsWith(".docx")) {
                setError("El archivo debe ser un .docx");
                setSelectedFile(null);
                return;
            }
            setError("");
            setSelectedFile(file);
        }
    };

    const handleOpenUpload = () => {
        setEditTemplateId(null);
        setTemplateName("");
        setSelectedFile(null);
        setError("");
        setIsUploadOpen(true);
    };

    const handleOpenEdit = (tpl: TemplateResponse) => {
        setEditTemplateId(tpl.id);
        setTemplateName(tpl.name);
        setSelectedFile(null);
        setError("");
        setIsUploadOpen(true);
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile && editTemplateId === null) {
            setError("Por favor selecciona un archivo.");
            return;
        }

        if (!templateName.trim() && editTemplateId === null) {
            setError("Por favor completa el nombre.");
            return;
        }

        try {
            setUploading(true);
            setError("");

            if (editTemplateId !== null && selectedFile) {
                // Modo Edición
                await updateTemplate(url, editTemplateId, selectedFile);
            } else if (editTemplateId === null && selectedFile) {
                // Modo Creación
                await uploadTemplate(url, templateName.trim(), selectedFile);
            }

            setIsUploadOpen(false);
            setTemplateName("");
            setSelectedFile(null);
            fetchTemplates();
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "Error al subir la plantilla");
        } finally {
            setUploading(false);
        }
    };

    const handlePreview = async (tpl: TemplateResponse) => {
        try {
            await downloadTemplate(url, tpl.id, tpl.name);
        } catch (err: unknown) {
            console.error("Error previewing template:", err);
            alert("No se pudo descargar la plantilla.");
        }
    };
    const confirmDelete = async () => {
        if (!templateToDelete) return;
        try {
            await deleteTemplate(url, templateToDelete.id);
            toast.success("Plantilla eliminada exitosamente.");
            setIsDeleteModalOpen(false);
            setTemplateToDelete(null);
            fetchTemplates();
            await userValid();
        } catch (err: unknown) {
            const error = err as Error;
            toast.error(error.message || "Error al eliminar plantilla");
        }
    };

    const handleDeleteClick = (tpl: TemplateResponse) => {
        setTemplateToDelete(tpl);
        setIsDeleteModalOpen(true);
    };

    const openManualModal = (tpl: TemplateResponse) => {
        setSelectedManualTemplate(tpl);
        const initialData: Record<string, string> = {};
        tpl.fields_schema?.variables?.forEach(v => {
            initialData[v] = "";
        });
        setManualFormData(initialData);
        setError("");
        setIsManualModalOpen(true);
    };

    const handleManualChange = (variable: string, value: string) => {
        setManualFormData(prev => ({
            ...prev,
            [variable]: value
        }));
    };

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedManualTemplate) return;
        setIsSignatureModalOpen(true);
    };

    const handleSignatureModeSelected = async (mode: 'tradicional' | 'electronica', signers?: { name: string, email: string, role: string }[], autoSignerId?: number | null) => {
        setIsSignatureModalOpen(false);
        if (!selectedManualTemplate) return;

        try {
            setGeneratingManual(true);
            setError("");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await generateSingleContract(
                url,
                selectedManualTemplate.id,
                manualFormData,
                selectedManualTemplate.name,
                mode,
                signers,
                autoSignerId
            );

            // Si es electrónica, mostramos mensaje de éxito en lugar de descarga
            if (mode === 'electronica') {
                toast.success("Contrato enviado a firma exitosamente.");
            }

            // Refresh user data globally so the dashboard counter updates
            await userValid();

            setIsManualModalOpen(false);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "Error al generar contrato");
        } finally {
            setGeneratingManual(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Plantillas</h1>
                    <p className="text-gray-500 mt-2">Administra los documentos base para tu empresa.</p>
                </div>
                <button
                    onClick={handleOpenUpload}
                    disabled={templatesLimitReached}
                    title={templatesLimitReached ? "Has alcanzado el límite de 3 plantillas para cuentas Free" : ""}
                    className="bg-[#111827] text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed border border-[#C2A359] px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                    {templatesLimitReached ? "Límite de Plantillas Alcanzado" : "Subir Nueva Plantilla"}
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : templates.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">No tienes plantillas aún</h3>
                    <p className="text-gray-500 mb-6">
                        Sube tu primer documento Word (.docx) para empezar.
                    </p>
                    <button onClick={handleOpenUpload} className="bg-[#111827] text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                        Subir mi primera plantilla
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {templates.map(tpl => (
                        <div key={tpl.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                {tpl.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Última Actualización: {new Date(tpl.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>

                            <div className="mb-6 flex-1">
                                <span className="font-medium text-sm text-gray-900 dark:text-white block mb-2">Variables Detectadas</span>
                                {tpl.fields_schema?.variables && tpl.fields_schema.variables.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {tpl.fields_schema.variables.map(v => (
                                            <span key={v} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                                [{v}]
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-500 italic">Ninguna</span>
                                )}
                            </div>

                            <div>
                                <span className="font-medium text-sm text-gray-900 dark:text-white block mb-3">Acciones Rápidas</span>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleOpenEdit(tpl)}
                                        className="bg-[#111827] hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <PenLine className="w-4 h-4" /> Editar
                                    </button>
                                    <button
                                        onClick={() => handlePreview(tpl)}
                                        className="bg-[#111827] hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Eye className="w-4 h-4" /> Previsualizar
                                    </button>
                                    <button
                                        onClick={() => openManualModal(tpl)}
                                        disabled={!tpl.fields_schema?.variables || tpl.fields_schema.variables.length === 0}
                                        className="bg-[#111827] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Generar Individual
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(tpl)}
                                        className="bg-red-50 hover:bg-red-100 text-red-600 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> Eliminar
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* Upload/Edit Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold">{editTemplateId ? "Actualizar Plantilla" : "Subir Plantilla"}</h2>
                            <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            {!editTemplateId && (
                                <div className="space-y-2">
                                    <Label htmlFor="templateName">Nombre de la Plantilla</Label>
                                    <Input
                                        id="templateName"
                                        placeholder="Ej: Contrato de Trabajo Estándar"
                                        value={templateName}
                                        onChange={e => setTemplateName(e.target.value)}
                                        disabled={uploading}
                                    />
                                </div>
                            )}

                            {editTemplateId && (
                                <div className="text-sm text-gray-500 mb-4">
                                    Sube un nuevo archivo Word para actualizar la plantilla: <strong>{templateName}</strong>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="fileUpload">Archivo Word (.docx)</Label>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <Input
                                        id="fileUpload"
                                        type="file"
                                        accept=".docx"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                    />
                                    <Label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-full">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <span className="font-medium">
                                            {selectedFile ? selectedFile.name : "Haz clic para buscar"}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Solo archivos .docx soportados
                                        </span>
                                    </Label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)} disabled={uploading}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={uploading} className="bg-[#111827] hover:bg-gray-800 text-white">
                                    {uploading ? "Guardando..." : "Guardar Plantilla"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Manual Generation Modal */}
            {isManualModalOpen && selectedManualTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                            <div>
                                <h2 className="text-xl font-bold">Generar Contrato</h2>
                                <p className="text-sm text-gray-500">{selectedManualTemplate.name}</p>
                            </div>
                            <button onClick={() => setIsManualModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleManualSubmit} className="p-6 flex flex-col max-h-[70vh]">
                            {error && (
                                <div className="p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 shrink-0">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-4">
                                {selectedManualTemplate.fields_schema?.variables?.map(variable => (
                                    <div key={variable} className="space-y-2">
                                        <Label htmlFor={`var-${variable}`} className="capitalize">
                                            {variable.replace(/_/g, " ")}
                                        </Label>
                                        <Input
                                            id={`var-${variable}`}
                                            value={manualFormData[variable] || ""}
                                            onChange={(e) => handleManualChange(variable, e.target.value)}
                                            placeholder={`Valor para ${variable}`}
                                            disabled={generatingManual}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-800 py-2">
                                <Button type="button" variant="outline" onClick={() => setIsManualModalOpen(false)} disabled={generatingManual}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={generatingManual} className="bg-[#C2A359] hover:bg-[#b0924e] text-white">
                                    {generatingManual ? "Cargando..." : "Continuar"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <SignatureModeModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                onContinue={handleSignatureModeSelected}
                isProPlan={!isFree}
                buttonText="Generar Documento"
                autoSigners={autoSigners}
            />

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eliminar Plantilla</h2>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                ¿Estás seguro de que deseas eliminar la plantilla <strong>{templateToDelete?.name}</strong>?
                            </p>
                            <p className="text-sm text-red-500 mt-2">Esta acción no se puede deshacer.</p>
                            
                            <div className="mt-6 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
