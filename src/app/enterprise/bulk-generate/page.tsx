"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuthStore } from "../../store/Store";
import { getTemplates, generateBulkContracts, TemplateResponse, getAutoSigners, CompanySigner } from "../../lib/enterprise";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Upload, FileSpreadsheet, CheckCircle2, FileText, ArrowRight, Loader2, CopyPlus } from "lucide-react";
import Link from "next/link";
import { createPaymentLink } from "../../lib/api";

export default function BulkGenerate() {
    const { url, user } = useAuthStore();
    const [templates, setTemplates] = useState<TemplateResponse[]>([]);
    const [autoSigners, setAutoSigners] = useState<CompanySigner[]>([]);
    const [loading, setLoading] = useState(true);

    const plan = user?.company?.plan_type || "free";
    const isBlocked = plan === "free" || plan === "starter";

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Form state
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | "">("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [selectedAutoSigner, setSelectedAutoSigner] = useState<number | null>(null);

    // Drag & Drop state
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates(url);
                setTemplates(data);

                try {
                    const signers = await getAutoSigners(url);
                    setAutoSigners(signers);
                } catch (e) {
                    console.error("Error fetching auto signers:", e);
                }
            } catch (err: unknown) {
                console.error(err);
                setError("Error al cargar plantillas");
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, [url]);

    const filteredTemplates = useMemo(() => {
        return templates.filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [templates, searchTerm]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleNewFile(e.target.files[0]);
        }
    };

    const handleNewFile = (file: File) => {
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            setError("El archivo debe ser un Excel (.xlsx o .xls)");
            setSelectedFile(null);
            return;
        }
        setError("");
        setSelectedFile(file);
        setSuccess(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedTemplateId === "" || generating) return;
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (selectedTemplateId === "" || generating) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleNewFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setSuccess(false);
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedTemplateId === "") {
            setError("Por favor selecciona una plantilla.");
            return;
        }

        if (!selectedFile) {
            setError("Por favor sube un archivo Excel con los datos.");
            return;
        }

        const template = templates.find(t => t.id === Number(selectedTemplateId));
        if (!template) return;

        try {
            setGenerating(true);
            setError("");
            setSuccess(false);
            await generateBulkContracts(url, Number(selectedTemplateId), selectedFile, template.name, selectedAutoSigner);
            setSuccess(true);
            setSelectedFile(null); // Resetear el archivo para generar otra vez
            setSelectedAutoSigner(null);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "Ocurrió un error en la generación.");
        } finally {
            setGenerating(false);
        }
    };

    const [upgrading, setUpgrading] = useState(false);

    const handleUpgrade = async () => {
        try {
            setUpgrading(true);
            const checkoutUrl = await createPaymentLink(url, "enterprise_upgrade");
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error("Error al redirigir al pago", error);
            alert("Ocurrió un error al intentar mejorar el plan. Intenta de nuevo.");
            setUpgrading(false);
        }
    };

    if (isBlocked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm animate-in fade-in duration-500">
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 p-4 rounded-full mb-6">
                    <CopyPlus className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Función Exclusiva</h1>
                <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                    La generación masiva por Excel te permite crear cientos de contratos en un solo clic, pero está reservada para cuentas con planes Business o Enterprise.
                </p>
                <button
                    onClick={handleUpgrade}
                    disabled={upgrading}
                    className="bg-[#C2A359] hover:bg-[#b0924e] disabled:opacity-70 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg flex items-center justify-center gap-2"
                >
                    {upgrading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Mejorar mi Plan
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generación Masiva</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

                {/* Main Flow */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Flujo de Generación Masiva</h2>

                    <form onSubmit={handleGenerate}>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-center">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5" />
                                Archivo ZIP generado y descargado correctamente.
                            </div>
                        )}

                        <div className="space-y-10 relative">
                            {/* Línea conectora visual (Opcional, estilo stepper) */}
                            <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-gray-200 dark:bg-gray-800 -z-10 hidden sm:block"></div>

                            {/* Paso 1 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white dark:bg-transparent">
                                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold shadow-sm">1</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selecciona una plantilla</h3>
                                </div>
                                <div className="pl-0 sm:pl-12">
                                    {/* Buscador */}
                                    <div className="relative mb-4 max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Buscar plantilla..."
                                            className="pl-9 bg-white dark:bg-gray-800"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Lista horizontal */}
                                    {loading ? (
                                        <div className="h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                        </div>
                                    ) : templates.length === 0 ? (
                                        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                                            <p className="text-sm text-gray-500 mb-2">No tienes plantillas subidas.</p>
                                            <Link href="/enterprise/templates" className="text-[#C2A359] text-sm font-medium hover:underline flex items-center justify-center gap-1">
                                                Ir a Mis Plantillas <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="flex overflow-x-auto gap-4 pb-4 snap-x pr-4">
                                            {filteredTemplates.map(tpl => {
                                                const isSelected = selectedTemplateId === tpl.id;
                                                const numVars = tpl.fields_schema?.variables?.length || 0;
                                                return (
                                                    <div
                                                        key={tpl.id}
                                                        onClick={() => setSelectedTemplateId(tpl.id)}
                                                        className={`shrink-0 w-[240px] snap-start cursor-pointer rounded-xl p-5 border-2 transition-all relative ${isSelected
                                                            ? 'border-[#C2A359] bg-[#C2A359]/5 shadow-sm'
                                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute top-4 right-4 bg-[#C2A359] text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                            </div>
                                                        )}
                                                        <div className={`p-2 rounded-lg inline-flex mb-3 ${isSelected ? 'bg-[#C2A359]/20 text-[#C2A359]' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                                            <FileText className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1" title={tpl.name}>
                                                            {tpl.name}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mb-3">
                                                            {numVars} {numVars === 1 ? 'variable' : 'variables'}
                                                        </p>
                                                        <Link href="/enterprise/templates" onClick={(e) => e.stopPropagation()} className="text-[#C2A359] text-xs font-medium hover:underline flex items-center gap-1">
                                                            Ver detalles <ArrowRight className="w-3 h-3" />
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                            {filteredTemplates.length === 0 && (
                                                <div className="w-full text-center py-8 text-gray-500 text-sm italic">
                                                    No se encontraron plantillas con ese nombre.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Paso 2 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white dark:bg-transparent">
                                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold shadow-sm">2</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sube el archivo de datos</h3>
                                </div>
                                <div className="pl-0 sm:pl-12">
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${isDragging
                                            ? 'border-[#C2A359] bg-[#C2A359]/10'
                                            : 'border-[#a4b4cb] bg-[#f8faff] dark:bg-slate-900/50 hover:bg-[#f0f5ff] dark:hover:bg-slate-900/80'
                                            }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <Input
                                            id="excelUpload"
                                            type="file"
                                            accept=".xlsx, .xls"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            disabled={generating || selectedTemplateId === ""}
                                        />
                                        <Label
                                            htmlFor="excelUpload"
                                            className={`flex flex-col items-center justify-center gap-3 w-full h-full ${selectedTemplateId === "" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <Upload className="w-8 h-8 text-[#546e92]" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                                Arrastra y suelta tu archivo Excel aquí
                                                <br />
                                                <span className="text-sm font-normal text-gray-500">o haz clic para buscar</span>
                                            </span>
                                        </Label>
                                    </div>

                                    {/* Tarjeta de archivo seleccionado */}
                                    {selectedFile && (
                                        <div className="mt-4 flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                                    <FileSpreadsheet className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-900 dark:text-white text-sm">{selectedFile.name}</span>
                                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="text-gray-500 hover:text-red-600 text-sm font-medium px-2 py-1"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Step 2.5 AutoSigner Optional */}
                            {autoSigners.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-white dark:bg-transparent">
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold shadow-sm">3</div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Firma Automática (Opcional)</h3>
                                    </div>
                                    <div className="pl-0 sm:pl-12">
                                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                                            <label className="block text-sm font-semibold text-primary mb-2">Inyectar Firma Automática</label>
                                            <select
                                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                value={selectedAutoSigner || ""}
                                                onChange={(e) => setSelectedAutoSigner(e.target.value ? parseInt(e.target.value) : null)}
                                            >
                                                <option value="">-- No inyectar --</option>
                                                {autoSigners.map(s => (
                                                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                                                ))}
                                            </select>
                                            <p className="text-[12px] text-muted-foreground mt-2">
                                                Si seleccionas un perfil y tu excel tiene la columna <span className="font-semibold text-gray-700 dark:text-gray-300">firma_electronica</span> = &quot;si&quot;, los contratos se firmarán automáticamente por esta persona.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit */}
                            <div className="pl-0 sm:pl-12 pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#111827] hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={generating || !selectedFile || selectedTemplateId === ""}
                                >
                                    {generating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                            Generando contratos...
                                        </>
                                    ) : (
                                        "Generar Contratos Masivos"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Sidebar de Instrucciones */}
                <div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sticky top-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">
                            ¿Cómo funciona?
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm shrink-0 h-fit">
                                    <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <strong className="text-gray-900 dark:text-white block mb-1 text-sm">1. Selecciona la plantilla</strong>
                                    <p className="text-sm text-gray-500 leading-relaxed">Elige el documento base que ya subiste previamente.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm shrink-0 h-fit">
                                    <FileSpreadsheet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <strong className="text-gray-900 dark:text-white block mb-1 text-sm">2. Prepara tu Excel</strong>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        La primera fila del Excel debe contener el nombre de las variables exactamente igual a como las escribiste en el Word (sin las llaves).<br /><br />
                                        <strong className="text-gray-700 dark:text-gray-300">Ejemplo de columna:</strong> Si en el Word pusiste <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">{"{{nombre_empleado}}"}</code>, la columna en Excel debe llamarse <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">nombre_empleado</code>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm shrink-0 h-fit">
                                    <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <strong className="text-gray-900 dark:text-white block mb-1 text-sm">3. Genera</strong>
                                    <p className="text-sm text-gray-500 leading-relaxed">El sistema procesará cada fila, llenará la plantilla, la convertirá a PDF y te descargará un ZIP con todo.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm shrink-0 h-fit">
                                    <CheckCircle2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <strong className="text-gray-900 dark:text-white block mb-1 text-sm">Opcional - Filtro de Filas</strong>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Si agregas una columna llamada <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">generar</code> o <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">estatus</code>, el sistema solo procesará las filas que tengan el valor &quot;si&quot;, &quot;generar&quot; o &quot;1&quot;. Muy útil si subes una lista maestra y solo quieres procesar contratos específicos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm shrink-0 h-fit">
                                    <FileSpreadsheet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <strong className="text-gray-900 dark:text-white block mb-1 text-sm">Firma Electrónica Mixta</strong>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Para enviar a firmar ciertos contratos, agrega la columna <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">firma_electronica</code> con valor &quot;si&quot;. <br />
                                        También agrega las columnas: <br />
                                        - <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">firmante_1_nombre</code><br />
                                        - <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">firmante_1_email</code><br />
                                        - <code className="bg-white dark:bg-gray-800 px-1 border border-gray-200 dark:border-gray-700 rounded text-xs text-[#C2A359]">firmante_1_rol</code><br />
                                        Y así sucesivamente para cada firmante. Los contratos electrónicos se envían directo y el resto se descarga en el ZIP.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
