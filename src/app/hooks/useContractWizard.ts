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

    const [showSignatureMode, setShowSignatureMode] = useState(false);
    const [signatureMode, setSignatureMode] = useState<'tradicional' | 'electronica'>('tradicional');
    const [signers, setSigners] = useState<{ name: string, email: string, role: string }[]>([]);

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
                const response = await generatePurchaseSaleContract(url, contratoActual.contract_type, contratoActual.form_data as Record<string, string>);
                updatedContract = { ...contratoActual, id: response.id };
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
        setShowSignatureMode(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSignatureModeSelected = (mode: 'tradicional' | 'electronica', selectedSigners?: { name: string, email: string, role: string }[], autoSignerId?: number | null) => {
        setSignatureMode(mode);
        if (selectedSigners) setSigners(selectedSigners);
        setShowSignatureMode(false);
        setShowDisclaimer(true);
    };

    const handleConfirmFinalize = async () => {
        if (!contratoActual?.id) return;

        setIsSaving(true);
        setShowDisclaimer(false);
        toast.loading("Finalizando contrato, por favor espera...");

        try {
            // Update con el modo de firma y signers
            const dataToUpdate = { ...contratoActual.form_data };
            const payload: Record<string, unknown> = { contract_type: contratoActual.contract_type, form_data: dataToUpdate, signature_mode: signatureMode };
            if (signatureMode === 'electronica' && signers) {
                payload.signers = signers;
            }

            // Re-implementar updateContract para soportar el payload completo o usar fetch directo aquí?
            // Mejor modificar updateContract en api.ts para que envíe todo.
            // O podemos pasarlo a form_data y el backend lo lee... No, el schema espera contract_type, form_data, signature_mode, signers.

            const response = await fetch(`${url}/contracts/${contratoActual.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || "Error al actualizar el contrato");
            }

            const finalizedContract = await finalizeContract(url, contratoActual.id);
            toast.dismiss();

            if (signatureMode === 'electronica') {
                toast.success("Contrato finalizado y enviado para firma.");
            } else {
                toast.success("Contrato finalizado con éxito. Obteniendo PDF...");
                const presignedUrl = await getPresignedUrl(url, finalizedContract.id);
                if (presignedUrl) {
                    window.open(presignedUrl, '_blank');
                }
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
        showSignatureMode,
        setShowSignatureMode,
        isSaving,
        handleSaveChanges,
        handleDownloadDraft,
        handleFinalizeClick,
        handleSignatureModeSelected,
        handleConfirmFinalize
    };
};