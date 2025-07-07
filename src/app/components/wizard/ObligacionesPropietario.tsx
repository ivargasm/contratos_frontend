// components/wizard/Paso8ObligacionesVendedor.tsx
"use client"

import { LongTextStep } from "@/app/components/forms/LongTextStep"
import { useContratoStore } from "@/app/store/useContratoStore"
import { TipoContrato, contract_types_owner } from "@/app/lib/contractTypes"

export interface DatosObligacionesPropietario {
    obligaciones_propietario_adicionales: string
}

interface ObligacionesPropietarioProps {
    onNext: (data: DatosObligacionesPropietario) => void
    onBack: () => void
    defaultData?: DatosObligacionesPropietario
}

export const ObligacionesPropietario: React.FC<ObligacionesPropietarioProps> = ({ onNext, onBack, defaultData }) => {
    const { tipoContrato } = useContratoStore()
    // dependiendo del tipoContrato llamaremos al Propietario "arrendador, vendedor, prestador de servicios, comodante"
    
    return (
        <LongTextStep
            stepTitle={`Obligaciones del ${tipoContrato && contract_types_owner[tipoContrato as TipoContrato] ? contract_types_owner[tipoContrato as TipoContrato] : "propietario"}`}
            label="Escribe cualquier obligación adicional que desees agregar al contrato:"
            name="obligaciones_propietario_adicionales"
            placeholder="Ej: El Propietario se obliga a pagar los vicios ocultos..."
            defaultValue={defaultData?.obligaciones_propietario_adicionales}
            onNext={(data) => onNext({ obligaciones_propietario_adicionales: data.obligaciones_propietario_adicionales })}
            onBack={onBack}
        />
    )
}
