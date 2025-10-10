import { create } from "zustand"

// Definimos los nuevos tipos que coinciden con la API
export interface HistorialVersion {
    id: number;
    version: number;
    status: 'borrador' | 'finalizado';
}

export interface ContratoCompleto {
    id: number;
    contract_type: string;
    form_data: Record<string, unknown>;
    status: 'borrador' | 'finalizado';
    version: number;
    parent_id: number | null;
    historial_versiones: HistorialVersion[];
    file_path?: string;
    created_at?: string;
}
interface ContratoState {
    // --- NUEVO ESTADO UNIFICADO ---
    contratoActual: ContratoCompleto | null;
    setContratoActual: (contrato: ContratoCompleto | null) => void;
    updateContratoFormData: (key: string, value: unknown) => void;
    clearStore: () => void;

    // --- ESTADO ANTIGUO (para retrocompatibilidad) ---
    /** @deprecated Usa `contratoActual.contract_type` en su lugar */
    tipoContrato: string | null;
    /** @deprecated Usa `contratoActual.form_data` en su lugar */
    formData: Record<string, string>;
    /** @deprecated Usa `contratoActual.id` en su lugar */
    contractId: number | null;

    setTipoContrato: (tipo: string) => void;
    setFormData: (data: Record<string, string>) => void;
    updateFormData: (key: string, value: string) => void;
    clearFormData: () => void;
    setContractId: (id: number | null) => void;
    clearContractId: () => void;
}

export const useContratoStore = create<ContratoState>((set) => ({
    // --- NUEVA LÓGICA ---
    contratoActual: null,
    setContratoActual: (contrato) => set({ contratoActual: contrato }),
    updateContratoFormData: (key, value) =>
        set((state) => {
            if (!state.contratoActual) return {};
            return {
                contratoActual: {
                    ...state.contratoActual,
                    form_data: {
                        ...state.contratoActual.form_data,
                        [key]: value,
                    },
                },
            };
        }),
    clearStore: () => set({ contratoActual: null }),
    tipoContrato: null,
    formData: {},

    setTipoContrato: (tipo) => set({ tipoContrato: tipo }),
    clearTipoContrato: () => set({ tipoContrato: null }),

    // Hace merge con el estado actual
    setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

    // Actualiza una sola propiedad
    updateFormData: (key, value) =>
        set((state) => ({ formData: { ...state.formData, [key]: value } })),

    clearFormData: () => set({ formData: {} }),

    // ID del contrato a editar
    contractId: null,
    setContractId: (id) => set({ contractId: id }),
    clearContractId: () => set({ contractId: null })
}))
