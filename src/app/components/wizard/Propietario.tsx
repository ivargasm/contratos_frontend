// components/wizard/Paso2Vendedor.tsx
"use client"

import { GroupIdentidad } from "../forms/GroupIdentidad"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface DataPropietario {
    propietario_nombre: string
    propietario_id_tipo: string
    propietario_id: string
    propietario_nacionalidad: string
    propietario_estado_civil: string
    propietario_direccion: string
}

interface PropietarioProps {
    onNext: (data: DataPropietario) => void
    onBack: () => void
    defaultData?: DataPropietario
}

export const Propietario: React.FC<PropietarioProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DataPropietario>({
        propietario_nombre: defaultData?.propietario_nombre || "",
        propietario_id_tipo: defaultData?.propietario_id_tipo || "",
        propietario_id: defaultData?.propietario_id || "",
        propietario_nacionalidad: defaultData?.propietario_nacionalidad || "",
        propietario_estado_civil: defaultData?.propietario_estado_civil || "",
        propietario_direccion: defaultData?.propietario_direccion || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Datos del propietario</h2>

            <GroupIdentidad prefix="propietario" form={Object.fromEntries(Object.entries(form))} onChange={handleChange} />

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Atrás
                </Button>
                <Button onClick={handleSubmit}>
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
