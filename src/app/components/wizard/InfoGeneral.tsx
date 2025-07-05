"use client"

import { useState } from "react"
import { InputField } from "../forms/InputField"
import { FechaTriple } from "../forms/FechaTriple"
import { Button } from "@/components/ui/button"
import { validarCamposObligatorios } from "@/app/lib/validation"

export interface DataInfoGeneral {
    [key: string]: string | undefined;
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

    const [errores, setErrores] = useState<string[]>([])

    const camposRequeridos = ["ciudad", "dia", "mes", "anio"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFechaChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }

    const handleNext = () => {
        const camposFaltantes = validarCamposObligatorios(form, camposRequeridos)
        if (camposFaltantes.length > 0) {
            setErrores(camposFaltantes)
            return
        }

        setErrores([]) // limpiar errores previos

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
                    required
                    error={errores.includes("ciudad")}
                />

                <FechaTriple value={form} onChange={handleFechaChange} errores={errores} />

            </div>

            <div className="pt-4">
                <Button onClick={handleNext} className="w-full sm:w-auto cursor-pointer">
                    Siguiente
                </Button>
            </div>
        </div>
    )
}