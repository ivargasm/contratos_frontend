// components/wizard/Paso10IncumplimientoContrato.tsx
"use client"

import { LongTextStep } from "@/app/components/forms/LongTextStep"

export interface DataIncumplimientoContrato {
    clausula_resolucion_adicional: string
}

interface IncumplimientoContratoProps {
    onNext: (data: DataIncumplimientoContrato) => void
    onBack: () => void
    defaultData?: DataIncumplimientoContrato
}

export const IncumplimientoContrato: React.FC<IncumplimientoContratoProps> = ({ onNext, onBack, defaultData }) => {
    return (
        <LongTextStep
            stepTitle="En caso de imcumplimiento del contrato"
            label="Escribe las clausulas que aplicaran en caso de que alguna de las partes incumple el contrato:"
            name="clausula_resolucion_adicional"
            placeholder="Ej: En caso de que el comprador no realice 3 pagos, el contrato se cancelara y este estara obligado a pagar una penalizacion del 20% del valor de la operacion "
            defaultValue={defaultData?.clausula_resolucion_adicional}
            onNext={(data) => onNext({ clausula_resolucion_adicional: data.clausula_resolucion_adicional })}
            onBack={onBack}
        />
    )
}
