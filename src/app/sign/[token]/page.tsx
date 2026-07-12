"use client"

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import SignaturePad from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSignDocument, submitSignDocument } from "@/app/lib/api";
import { useAuthStore } from "@/app/store/Store";

interface DocumentData {
    signer: {
        name: string;
        email: string;
        role: string;
        status: string;
    };
    contract: {
        id: number;
        type: string;
        html: string;
        pdf_url?: string;
    };
}

export default function SignDocumentPage() {
    const params = useParams();
    const token = params.token as string;

    const [data, setData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Signature Pad Ref
    const sigPad = useRef<SignaturePad | null>(null);
    const [signType, setSignType] = useState<'draw' | 'auto'>('draw');
    const [autoSignText, setAutoSignText] = useState("");

    const { url } = useAuthStore();

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docData = await getSignDocument(url, token);
                setData(docData);
                setAutoSignText(docData.signer.name);
            } catch (err: unknown) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchDocument();
    }, [token, url]);

    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
        }
    };

    const submitSignature = async () => {
        let signatureData = "";

        if (signType === 'draw') {
            if (!sigPad.current || sigPad.current.isEmpty()) {
                toast.error("Por favor, dibuja tu firma antes de continuar");
                return;
            }
            signatureData = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
        } else {
            // Auto text signature
            if (!autoSignText) {
                toast.error("Por favor, ingresa tu nombre");
                return;
            }

            // Create a canvas to draw the text as an image
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 150;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = 'italic 40px "Times New Roman", serif';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(autoSignText, canvas.width / 2, canvas.height / 2);
                signatureData = canvas.toDataURL('image/png');
            }
        }

        setSubmitting(true);
        toast.loading("Enviando firma...");
        try {
            await submitSignDocument(url, token, signatureData, window.navigator.userAgent);
            
            toast.dismiss();
            toast.success("Documento firmado exitosamente");
            // Reload to show signed status
            window.location.reload();
        } catch (err: unknown) {
            toast.dismiss();
            toast.error((err as Error).message);
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando documento...</div>;

    if (error) return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold mb-2">Error de Enlace</h1>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
    );
    
    if (!data) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-xl min-h-[800px] flex flex-col relative">

                {/* Header info */}
                <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
                    <div>
                        <h1 className="font-bold text-lg">Contrato: {data.contract.type}</h1>
                        <p className="text-sm opacity-80">Firmante: {data.signer.name} ({data.signer.role})</p>
                    </div>
                    <div>
                        {data.signer.status === 'firmado' ? (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">✓ Ya Firmaste</span>
                        ) : (
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-sm">⏳ Pendiente de Firma</span>
                        )}
                    </div>
                </div>

                {/* Document HTML or PDF */}
                {data.contract.pdf_url ? (
                    <div className="flex-1 overflow-auto bg-gray-100 p-4">
                        <iframe 
                            src={data.contract.pdf_url} 
                            className="w-full h-full min-h-[600px] border-0 rounded shadow-sm"
                            title="Contrato PDF"
                        />
                    </div>
                ) : (
                    <div className="p-10 flex-1 overflow-auto bg-white text-black"
                        style={{
                            fontFamily: 'Arial, sans-serif'
                        }}
                        dangerouslySetInnerHTML={{ __html: data.contract.html }}
                    />
                )}

                {/* Signature Section */}
                <div className="border-t-2 border-gray-200 p-8 bg-gray-50 mt-auto">
                    {data.signer.status === 'firmado' ? (
                        <div className="text-center py-10">
                            <h2 className="text-2xl font-bold text-green-600 mb-2">¡Gracias por firmar!</h2>
                            <p className="text-gray-600">El documento ha sido firmado electrónicamente.</p>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-4 text-center">Firma Digital Requerida</h2>

                            <div className="flex gap-2 justify-center mb-6">
                                <Button
                                    variant={signType === 'draw' ? 'default' : 'outline'}
                                    onClick={() => setSignType('draw')}
                                >
                                    Trazar Firma
                                </Button>
                                <Button
                                    variant={signType === 'auto' ? 'default' : 'outline'}
                                    onClick={() => setSignType('auto')}
                                >
                                    Auto Firma
                                </Button>
                            </div>

                            {signType === 'draw' ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center">
                                    <div className="w-full bg-white flex justify-center">
                                        <SignaturePad
                                            ref={sigPad}
                                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                        />
                                    </div>
                                    <div className="w-full flex justify-end p-2 border-t border-gray-200">
                                        <button onClick={clearSignature} className="text-sm text-red-500 hover:underline">Borrar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-gray-200 rounded-lg p-6 flex flex-col items-center">
                                    <input
                                        type="text"
                                        value={autoSignText}
                                        onChange={(e) => setAutoSignText(e.target.value)}
                                        className="border-b-2 border-gray-400 text-center text-2xl p-2 outline-none w-full max-w-sm"
                                        style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                                    />
                                    <p className="text-sm text-gray-500 mt-2">Escribe tu nombre completo</p>
                                </div>
                            )}

                            <div className="mt-6 flex justify-center">
                                <Button
                                    size="lg"
                                    onClick={submitSignature}
                                    disabled={submitting}
                                    className="w-full max-w-sm text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                                >
                                    {submitting ? 'Guardando...' : 'Aceptar y Firmar'}
                                </Button>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                Al presionar &quot;Aceptar y Firmar&quot;, aceptas que esta firma electrónica tiene la misma validez legal que tu firma autógrafa.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
