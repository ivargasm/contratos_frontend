
"use client"

import { LongTextStep } from "@/app/components/forms/LongTextStep"

export interface DatosProhibiciones {
    prohibiciones_adicionales: string
}

interface ProhibicionesProps {
    onNext: (data: DatosProhibiciones) => void
    onBack: () => void
    defaultData?: DatosProhibiciones
}

export const Prohibiciones: React.FC<ProhibicionesProps> = ({ onNext, onBack, defaultData }) => {
    return (
        <LongTextStep
            stepTitle="Prohibiciones"
            label="Escribe cualquier prohibición adicional que desees agregar al contrato:"
            name="prohibiciones_adicionales"
            placeholder="Ej: No se pueden realizar obras en el bien, Subarrendar el bien, etc."
            defaultValue={defaultData?.prohibiciones_adicionales}
            onNext={(data) => onNext({ prohibiciones_adicionales: data.prohibiciones_adicionales })}
            onBack={onBack}
        />
    )
}
