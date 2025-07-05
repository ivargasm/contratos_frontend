import { create } from "zustand"

interface ContratoState {
    tipoContrato: string | null
    formData: Record<string, string>

    setTipoContrato: (tipo: string) => void
    clearTipoContrato: () => void

    setFormData: (data: Record<string, string>) => void
    updateFormData: (key: string, value: string) => void
    clearFormData: () => void

    contractId: number | null
    setContractId: (id: number | null) => void
    clearContractId: () => void
}

export const useContratoStore = create<ContratoState>((set) => ({
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
