import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContratoStore } from '@/app/store/useContratoStore';
import { useAuthStore } from '@/app/store/Store';
import { generatePurchaseSaleContract, getPresignedUrl, updateContract, finalizeContract, downloadContract } from '@/app/lib/api';
import { toast } from 'sonner';

export const useContractWizard = (contractType: string) => {
    const { contratoActual, setContratoActual, clearStore } = useContratoStore();
    const { url } = useAuthStore();
    const router = useRouter();
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Solo crear un nuevo contrato si no existe ninguno
        if (!contratoActual) {
            setContratoActual({
                id: 0,
                contract_type: contractType,
                form_data: {},
                status: 'borrador',
                version: 1.0,
                parent_id: null,
                historial_versiones: [],
            });
        }
    }, [contractType, contratoActual, setContratoActual]);

    const handleSaveChanges = async () => {
        if (!contratoActual) return;
        setIsSaving(true);
        toast.loading("Guardando cambios...");
        try {
            let updatedContract;
            if (!contratoActual.id || contratoActual.id === 0) {
                updatedContract = await generatePurchaseSaleContract(url, contratoActual.contract_type, contratoActual.form_data as Record<string, string>);
                toast.dismiss();
                toast.success("Borrador creado y guardado.");
            } else {
                updatedContract = await updateContract(url, contratoActual.id, contratoActual.contract_type, contratoActual.form_data as Record<string, string>);
                toast.dismiss();
                toast.success("Borrador actualizado.");
            }
            setContratoActual(updatedContract);
        } catch (error) {
            toast.dismiss();
            toast.error((error as Error).message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadDraft = async () => {
        if (!contratoActual?.id || contratoActual.id === 0) {
            toast.error("Guarda el contrato al menos una vez para poder descargar un borrador.");
            return;
        }
        try {
            toast.loading("Generando borrador...");
            await downloadContract(url, contratoActual.id);
            toast.dismiss();
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleFinalizeClick = () => {
        if (!contratoActual?.id || contratoActual.id === 0) {
            toast.info("Por favor, guarda los cambios antes de finalizar el contrato.");
            return;
        }
        setShowDisclaimer(true);
    };

    const handleConfirmFinalize = async () => {
        if (!contratoActual?.id) return;
        
        setIsSaving(true);
        setShowDisclaimer(false);
        toast.loading("Finalizando contrato, por favor espera...");

        try {
            await updateContract(url, contratoActual.id, contratoActual.contract_type, contratoActual.form_data as Record<string, string>);
            const finalizedContract = await finalizeContract(url, contratoActual.id);
            toast.dismiss();
            toast.success("Contrato finalizado con éxito. Obteniendo PDF...");
            
            const presignedUrl = await getPresignedUrl(url, finalizedContract.id);
            if (presignedUrl) {
                window.open(presignedUrl, '_blank');
            }

            clearStore();
            router.push('/profile');
        } catch (error) {
            toast.dismiss();
            toast.error((error as Error).message);
        } finally {
            setIsSaving(false);
        }
    };

    return {
        contratoActual,
        showDisclaimer,
        setShowDisclaimer,
        isSaving,
        handleSaveChanges,
        handleDownloadDraft,
        handleFinalizeClick,
        handleConfirmFinalize
    };
};