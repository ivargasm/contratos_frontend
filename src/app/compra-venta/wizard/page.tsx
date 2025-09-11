// import ProtectedRoute from "@/app/components/ProtectedRoutes"
// import { WizardContrato } from "./WizardContrato"

// export default function CompraVentaWizard() {
//     return (
//         <section className="w-full min-h-[100vh] flex items-center justify-center">
//             <ProtectedRoute>
//                 <WizardContrato />        

//             </ProtectedRoute>

//         </section>
//     )
// }
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
    BloqueDeclaracionesCompraVenta,
    BloqueClausulasCompraVenta
} from '@/app/components/wizard/BloquesCompraVenta';
import { InlineSelectWithChildren } from '@/app/components/ui/InlineComponents';
import { DisclaimerModal } from '@/app/components/ui/DisclaimerModal';
import ProtectedRoute from '@/app/components/ProtectedRoutes';
import { useAuthStore } from '@/app/store/Store';
import { useRouter } from 'next/navigation';
import { generatePurchaseSaleContract, getPresignedUrl, updateContract } from '@/app/lib/api';

export default function ContratoCompraVentaInteractivo() {
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
                // Edición
                result = await updateContract(url, contractId, tipoContrato || "", formData)
            } else {
                // Creación
                result = await generatePurchaseSaleContract(url, tipoContrato || "purchase_sale", formData)
            }

            const url_presigned = await getPresignedUrl(url, result.id)
            if (url_presigned) {
                window.open(url_presigned, '_blank')
            }

            // Limpieza
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
                        <h1 className="text-4xl font-bold text-title">Contrato de Compra-Venta</h1>
                        <p className="text-lg mt-2">
                            <span className="text-orange-600 font-semibold">Completa los campos resaltados en amarillo</span> <span className="text-muted-foreground">para generar tu documento.</span>
                        </p>
                    </header>
    
                    <main className="bg-card p-8 sm:p-12 rounded-lg shadow-md border border-border space-y-8">
                        {/* Sección para seleccionar el tipo de bien */}
                        <div className="bg-muted p-4 rounded-md">
                            <label className="font-bold text-lg text-foreground mr-4">Tipo de bien a vender:</label>
                            <InlineSelectWithChildren value={formData.tipo_bien || ''} onChange={handleSelectChange('tipo_bien')} widthClass="">
                                <option value="">Selecciona una opción</option>
                                <option value="Mueble">Bien Mueble (Ej: Coche, Muebles)</option>
                                <option value="Inmueble">Bien Inmueble (Ej: Casa, Terreno)</option>
                            </InlineSelectWithChildren>
                        </div>
    
                        {/* ORQUESTACIÓN DE BLOQUES */}
                        <section><BloqueLugarFecha /></section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                            <BloquePartes rolPropietario="EL VENDEDOR" rolInteresado="EL COMPRADOR" tipoContrato="COMPRAVENTA" />
                        </section>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                            <BloqueDeclaracionesCompraVenta />
                        </section>
                        <p>EXPUESTO LO ANTERIOR, las partes se sujetan al tenor de las siguientes:</p>
                        <hr className="border-border" />
                        <section>
                            <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                            <BloqueClausulasCompraVenta />
                        </section>
                        <hr className="border-border" />
                        <p>Leído que fue el presente contrato por ambas partes y enteradas de su contenido y alcance legal, lo firman en señal de conformidad por duplicado en el lugar y fecha al principio indicados.</p>
                        <section>
                            <BloqueFirmas rolPropietario="EL VENDEDOR" rolInteresado="EL COMPRADOR" tipoContrato="COMPRAVENTA" />
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

