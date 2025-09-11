'use client'

import React, { useState } from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { 
    BloqueLugarFecha, 
    BloquePartes,
    BloqueTestigos,
    BloqueFirmas
} from '@/app/components/wizard/BloquesGenericos';
import {
    BloqueAntecedentesConfidencialidad,
    BloqueDeclaracionesConfidencialidad,
    BloqueClausulasConfidencialidad
} from '@/app/components/wizard/BloquesConfidencialidad';
import { DisclaimerModal } from '@/app/components/ui/DisclaimerModal';
import ProtectedRoute from '@/app/components/ProtectedRoutes';
import { useAuthStore } from '@/app/store/Store';
import { useRouter } from 'next/navigation';
import { generatePurchaseSaleContract, getPresignedUrl, updateContract } from '@/app/lib/api';

export default function AcuerdoConfidencialidadInteractivo() {
    const { formData, updateFormData } = useContratoStore();
    const { tipoContrato, contractId, clearFormData, clearContractId } = useContratoStore()
    const { url } = useAuthStore()
    const router = useRouter()
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleGenerateClick = () => {
        setShowDisclaimer(true);
    };

    const handleConfirmDownload = async () => {
        try {
            let result;
            if (contractId) {
                result = await updateContract(url, contractId, tipoContrato || "", formData)
            } else {
                result = await generatePurchaseSaleContract(url, tipoContrato || "confidentiality", formData)
            }

            const url_presigned = await getPresignedUrl(url, result.id)
            if (url_presigned) {
                window.open(url_presigned, '_blank')
            }

            clearFormData()
            clearContractId()
            router.push('/profile')

        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unexpected error occurred")
            }
        }
    }

    return (
        <ProtectedRoute>
            <div className="bg-background min-h-screen p-4 sm:p-8 mt-12">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-title">
                            Acuerdo de Confidencialidad
                        </h1>
                        <p className="text-lg mt-2">
                            <span className="text-orange-600 font-semibold">Completa los campos resaltados en amarillo</span> <span className="text-muted-foreground">para generar tu documento.</span>
                        </p>
                    </header>
    
                    <main className="bg-card p-8 sm:p-12 rounded-lg shadow-md border border-border space-y-8">
                        {/* ORQUESTACIÓN DE BLOQUES */}
                        <section><BloqueLugarFecha /></section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                            <BloquePartes rolPropietario="PARTE DIVULGADORA" rolInteresado="PARTE RECEPTORA" tipoContrato="CONFIDENCIALIDAD" />
                        </section>
                        <hr className="border-border" />
                        <p>Ambas partes, en lo sucesivo denominadas conjuntamente como &quot;Las Partes&quot;, celebran el presente <span className="font-bold">ACUERDO DE CONFIDENCIALIDAD</span>, sujeto a los siguientes antecedentes y cláusulas:</p>
                        <section>
                            <BloqueAntecedentesConfidencialidad />
                        </section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                            <BloqueDeclaracionesConfidencialidad />
                        </section>
                        <p>En virtud de lo anterior, &quot;Las Partes&quot; acuerdan sujetarse a las siguientes:</p>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                            <BloqueClausulasConfidencialidad />
                        </section>
                        <hr className="border-border" />
                        <p>Habiendo leído y entendido el presente Acuerdo, y en señal de plena conformidad con su contenido y alcance legal, &quot;Las Partes&quot; lo suscriben por duplicado en el lugar y fecha indicados al principio de este documento.</p>
                        <section>
                            <BloqueFirmas rolPropietario="PARTE DIVULGADORA" rolInteresado="PARTE RECEPTORA" tipoContrato="CONFIDENCIALIDAD" />
                            <BloqueTestigos />
                        </section>
                    </main>
    
                    <footer className="mt-8 text-center">
                        <button onClick={handleGenerateClick} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer">
                            Generar Acuerdo
                        </button>
                    </footer>
                </div>
            </div>
            
            <DisclaimerModal 
                isOpen={showDisclaimer}
                onClose={() => setShowDisclaimer(false)}
                onAccept={handleConfirmDownload}
            />
        </ProtectedRoute>
    )
};