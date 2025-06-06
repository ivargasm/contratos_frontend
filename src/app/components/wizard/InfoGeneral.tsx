"use client"

import { useState } from "react"
import { InputField } from "../forms/InputField"
import { FechaTriple } from "../forms/FechaTriple"
import { Button } from "@/components/ui/button"

export interface DataInfoGeneral {
    ciudad: string
    dia: string
    mes: string
    anio: string
    // lugar_firma: string
}

interface InfoGeneralProps {
    onNext: (data: DataInfoGeneral) => void
    defaultData?: DataInfoGeneral
}

export const InfoGeneral: React.FC<InfoGeneralProps> = ({ onNext, defaultData }) => {
    const [form, setForm] = useState<DataInfoGeneral>({
        ciudad: defaultData?.ciudad || "",
        dia: defaultData?.dia || "",
        mes: defaultData?.mes || "",
        anio: defaultData?.anio || "",
        // lugar_firma: defaultData?.lugar_firma || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFechaChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }

    const handleNext = () => {
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Información general</h2>

            <div className="grid gap-4">
                <InputField
                    label="Ciudad"
                    name="ciudad"
                    placeholder="Querétaro"
                    value={form.ciudad}
                    onChange={handleChange}
                />

                <FechaTriple value={form} onChange={handleFechaChange} />

            </div>

            <div className="pt-4">
                <Button onClick={handleNext} className="w-full sm:w-auto">
                    Siguiente
                </Button>
            </div>
        </div>
    )
}