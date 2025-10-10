import React from 'react';
import { useContractWizard } from '@/app/hooks/useContractWizard';
import { DisclaimerModal } from '@/app/components/ui/DisclaimerModal';
import ProtectedRoute from '@/app/components/ProtectedRoutes';
import { useContratoStore } from '@/app/store/useContratoStore';

interface ContractWizardTemplateProps {
    contractType: string;
    title: string;
    children: React.ReactNode;
    rolPropietario: string;
    rolInteresado: string;
    tipoContrato: string;
    buttonText?: string;
}

export const ContractWizardTemplate: React.FC<ContractWizardTemplateProps> = ({
    contractType,
    title,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rolPropietario,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rolInteresado,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tipoContrato,
    buttonText = "Finalizar Contrato"
}) => {
    const {
        contratoActual,
        showDisclaimer,
        setShowDisclaimer,
        isSaving,
        handleSaveChanges,
        handleDownloadDraft,
        handleFinalizeClick,
        handleConfirmFinalize
    } = useContractWizard(contractType);
    
    const { updateContratoFormData } = useContratoStore();

    if (!contratoActual) {
        return <div className="text-center p-12">Cargando editor de contrato...</div>;
    }

    return (
        <ProtectedRoute>
            <div className="bg-background min-h-screen p-4 sm:p-8 mt-12">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-title">
                            {title}
                        </h1>
                        <p className="text-lg mt-2">
                            <span className="text-orange-600 font-semibold">Completa los campos resaltados en amarillo</span> <span className="text-muted-foreground">para generar tu documento.</span>
                        </p>
                        
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Nombre del contrato (opcional)</label>
                            <input 
                                type="text"
                                value={contratoActual?.form_data?.nombre_contrato as string || ''}
                                onChange={(e) => updateContratoFormData('nombre_contrato', e.target.value)}
                                disabled={contratoActual?.status === 'finalizado'}
                                placeholder="Ej: Contrato de arrendamiento - Casa Polanco"
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                    </header>
    
                    <main className="bg-card p-8 sm:p-12 rounded-lg shadow-md border border-border space-y-8">
                        {children}
                    </main>
    
                    <footer className="mt-8 flex flex-col items-center gap-4">
                        {contratoActual.status === 'borrador' && (
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={handleSaveChanges} 
                                    disabled={isSaving}
                                    className="bg-gray-500 text-white hover:bg-gray-600 font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:bg-gray-400"
                                >
                                    {isSaving ? "Guardando..." : (contratoActual.id ? "Guardar Cambios" : "Guardar Borrador")}
                                </button>
                                <button 
                                    onClick={handleDownloadDraft} 
                                    disabled={!contratoActual.id || contratoActual.id === 0 || isSaving}
                                    className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:bg-yellow-300"
                                >
                                    Descargar Borrador
                                </button>
                            </div>
                        )}
                        
                        <button 
                            onClick={handleFinalizeClick} 
                            disabled={isSaving}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer disabled:bg-gray-400"
                        >
                            {isSaving ? "Procesando..." : buttonText}
                        </button>
                    </footer>
                </div>
            </div>
            
            <DisclaimerModal 
                isOpen={showDisclaimer}
                onClose={() => setShowDisclaimer(false)}
                onAccept={handleConfirmFinalize}
            />
        </ProtectedRoute>
    );
};