// components/wizard/Paso9ObligacionesComprador.tsx
"use client"

import { LongTextStep } from "@/app/components/forms/LongTextStep"
import { useContratoStore } from "@/app/store/useContratoStore"
import { TipoContrato, contract_types_buyer } from "@/app/lib/contractTypes"

export interface DatosObligacionesInteresado {
    obligaciones_interesado_adicionales: string
}

interface Paso9Props {
    onNext: (data: DatosObligacionesInteresado) => void
    onBack: () => void
    defaultData?: DatosObligacionesInteresado
}

export const ObligacionesInteresado: React.FC<Paso9Props> = ({ onNext, onBack, defaultData }) => {
    const { tipoContrato } = useContratoStore()
    
    return (
        <LongTextStep
            stepTitle={`Obligaciones del ${tipoContrato && contract_types_buyer[tipoContrato as TipoContrato] ? contract_types_buyer[tipoContrato as TipoContrato] : "interesado"}`}
            label="Escribe cualquier obligación adicional que desees agregar al contrato:"
            name="obligaciones_interesado_adicionales"
            placeholder="Ej: El Comprador se obliga a pagar el precio del bien..."
            defaultValue={defaultData?.obligaciones_interesado_adicionales}
            onNext={(data) => onNext({ obligaciones_interesado_adicionales: data.obligaciones_interesado_adicionales })}
            onBack={onBack}
        />
    )
}
