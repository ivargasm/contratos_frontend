// components/wizard/Paso8ObligacionesVendedor.tsx
"use client"

import { LongTextStep } from "@/app/components/forms/LongTextStep"

export interface DatosObligacionesPropietario {
    obligaciones_propietario_adicionales: string
}

interface ObligacionesPropietarioProps {
    onNext: (data: DatosObligacionesPropietario) => void
    onBack: () => void
    defaultData?: DatosObligacionesPropietario
}

export const ObligacionesPropietario: React.FC<ObligacionesPropietarioProps> = ({ onNext, onBack, defaultData }) => {
    return (
        <LongTextStep
            stepTitle="Obligaciones del propietario"
            label="Escribe cualquier obligación adicional que desees agregar al contrato:"
            name="obligaciones_propietario_adicionales"
            placeholder="Ej: El Propietario se obliga a pagar los vicios ocultos..."
            defaultValue={defaultData?.obligaciones_propietario_adicionales}
            onNext={(data) => onNext({ obligaciones_propietario_adicionales: data.obligaciones_propietario_adicionales })}
            onBack={onBack}
        />
    )
}
