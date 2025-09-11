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
    BloqueDeclaracionesArrendamiento,
    BloqueClausulasArrendamiento
} from '@/app/components/wizard/BloquesArrendamiento';
import { InlineSelectWithChildren } from '@/app/components/ui/InlineComponents';
import { DisclaimerModal } from '@/app/components/ui/DisclaimerModal';
import ProtectedRoute from '@/app/components/ProtectedRoutes';
import { useAuthStore } from '@/app/store/Store';
import { useRouter } from 'next/navigation';
import { generatePurchaseSaleContract, getPresignedUrl, updateContract } from '@/app/lib/api';

export default function ContratoArrendamientoInteractivo() {
    const { formData, updateFormData } = useContratoStore();
    const { tipoContrato, contractId, clearFormData, clearContractId } = useContratoStore()
    const { url } = useAuthStore()
    const router = useRouter()
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormData(key, e.target.value);
    };

    const handleGenerateClick = () => {
        setShowDisclaimer(true);
    };

    const handleConfirmDownload = async () => {
        try {
            let result;
            if (contractId) {
                result = await updateContract(url, contractId, tipoContrato || "", formData)
            } else {
                result = await generatePurchaseSaleContract(url, tipoContrato || "rental", formData)
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
                            Contrato de Arrendamiento {formData.tipo_bien === "Mueble" ? "de Bien Mueble" : "de Bien Inmueble"}
                        </h1>
                        <p className="text-lg mt-2">
                            <span className="text-orange-600 font-semibold">Completa los campos resaltados en amarillo</span> <span className="text-muted-foreground">para generar tu documento.</span>
                        </p>
                    </header>
    
                    <main className="bg-card p-8 sm:p-12 rounded-lg shadow-md border border-border space-y-8">
                        {/* Sección para seleccionar el tipo de bien */}
                        <div className="bg-muted p-4 rounded-md">
                            <label className="font-bold text-lg text-foreground mr-4">Tipo de bien a arrendar:</label>
                            <InlineSelectWithChildren value={formData.tipo_bien || ''} onChange={handleSelectChange('tipo_bien')} widthClass="">
                                <option value="">Selecciona una opción</option>
                                <option value="Mueble">Bien Mueble (Ej: Vehículo, Maquinaria)</option>
                                <option value="Inmueble">Bien Inmueble (Ej: Casa, Departamento)</option>
                            </InlineSelectWithChildren>
                        </div>
    
                        {/* ORQUESTACIÓN DE BLOQUES */}
                        <section><BloqueLugarFecha /></section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                            <BloquePartes rolPropietario="ARRENDADOR" rolInteresado="ARRENDATARIO" tipoContrato="ARRENDAMIENTO" />
                        </section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                            <BloqueDeclaracionesArrendamiento />
                        </section>
                        <p>EXPUESTO LO ANTERIOR, LOS COMPARECIENTES (LAS PARTES) FORMALIZAN EL PRESENTE, AL TENOR DE LAS SIGUIENTES:</p>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                            <BloqueClausulasArrendamiento />
                        </section>
                        <hr className="border-border" />
                        <p>Leído que fue el presente contrato y enteradas las partes de su contenido y alcance legal, lo firman por duplicado en la ciudad indicada al principio.</p>
                        <section>
                            <BloqueFirmas rolPropietario="ARRENDADOR" rolInteresado="ARRENDATARIO" tipoContrato="ARRENDAMIENTO" />
                            <BloqueTestigos />
                        </section>
                    </main>
    
                    <footer className="mt-8 text-center">
                        <button onClick={handleGenerateClick} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer">
                            Generar Contrato
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