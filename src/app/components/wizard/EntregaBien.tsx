// components/wizard/Paso6Entrega.tsx
"use client"

import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface DatosEntregaBien {
    direccion_entrega: string
    fecha_entrega: string
    acta_entrega: string
}

interface EntregaBienProps {
    onNext: (data: DatosEntregaBien) => void
    onBack: () => void
    defaultData?: DatosEntregaBien
}

export const EntregaBien: React.FC<EntregaBienProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DatosEntregaBien>({
        direccion_entrega: defaultData?.direccion_entrega || "",
        fecha_entrega: defaultData?.fecha_entrega || "",
        acta_entrega: defaultData?.acta_entrega || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Entrega del bien</h2>

            <div className="grid gap-4">
                <InputField
                    label="Dirección de entrega"
                    name="direccion_entrega"
                    placeholder="Calle 123"
                    value={form.direccion_entrega}
                    onChange={handleChange}
                />
                <InputField
                    label="Fecha de entrega"
                    name="fecha_entrega"
                    placeholder="15 de mayo de 2025"
                    value={form.fecha_entrega}
                    onChange={handleChange}
                    type="date"
                />
                <InputField
                    label="Acta de entrega"
                    name="acta_entrega"
                    placeholder="Acta de entrega"
                    value={form.acta_entrega}
                    onChange={handleChange}
                />
            </div>

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
