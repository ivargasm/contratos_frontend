// components/wizard/Plazos.tsx
"use client"

import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SelectField } from "../forms/SelectField"
import { validarCamposObligatorios } from "@/app/lib/validation"

export interface DatosPlazos {
    [key: string]: string | undefined
    duracion: string
    fecha_inicio: string
    fecha_fin: string
    renovacion_automatica: string
    condiciones_renovacion: string
    preaviso_terminacion: string
}

interface PlazosProps {
    onNext: (data: DatosPlazos) => void
    onBack: () => void
    defaultData?: DatosPlazos
}

export const Plazos: React.FC<PlazosProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DatosPlazos>({
        duracion: defaultData?.duracion || "",
        fecha_inicio: defaultData?.fecha_inicio || "",
        fecha_fin: defaultData?.fecha_fin || "",
        renovacion_automatica: defaultData?.renovacion_automatica || "",
        condiciones_renovacion: defaultData?.condiciones_renovacion || "",
        preaviso_terminacion: defaultData?.preaviso_terminacion || "",
    })
    const [errores, setErrores] = useState<string[]>([])
    const camposRequeridos = ["duracion", "fecha_inicio", "fecha_fin"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
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
            <h2 className="text-2xl font-semibold text-secondary">Plazos</h2>

            <div className="grid gap-4">
                <InputField
                    label="Duración"
                    name="duracion"
                    placeholder="12 meses"
                    value={form.duracion}
                    onChange={handleChange}
                    required
                    error={errores.includes("duracion")}
                />
                <InputField
                    label="Fecha de inicio"
                    name="fecha_inicio"
                    placeholder="15 de mayo de 2025"
                    value={form.fecha_inicio}
                    onChange={handleChange}
                    type="date"
                    required
                    error={errores.includes("fecha_inicio")}
                />
                <InputField
                    label="Fecha de fin"
                    name="fecha_fin"
                    placeholder="15 de mayo de 2026"
                    value={form.fecha_fin}
                    onChange={handleChange}
                    type="date"
                    required
                    error={errores.includes("fecha_fin")}
                />
                <SelectField
                    label="Renovación automática"
                    name="renovacion_automatica"
                    value={form.renovacion_automatica}
                    onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
                    options={["Sí", "No"]}
                />
                {form.renovacion_automatica === "Sí" && (
                    <InputField
                        label="Condiciones de renovación"
                        name="condiciones_renovacion"
                        placeholder="Por escrito"
                        value={form.condiciones_renovacion}
                        onChange={handleChange}
                    />
                )}
                <InputField
                    label="Preaviso de terminación"
                    name="preaviso_terminacion"
                    placeholder="30 días"
                    value={form.preaviso_terminacion}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack} className="cursor-pointer">
                    Atrás
                </Button>
                <Button onClick={handleSubmit} className="cursor-pointer">
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
