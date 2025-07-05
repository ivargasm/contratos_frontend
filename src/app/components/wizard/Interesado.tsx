// components/wizard/Paso3Comprador.tsx
"use client"

import { GroupIdentidad } from "../forms/GroupIdentidad"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { validarCamposObligatorios } from "@/app/lib/validation";

export interface DataInteresado {
    [key: string]: string | undefined
    interesado_nombre: string
    interesado_id_tipo: string
    interesado_id: string
    interesado_nacionalidad: string
    interesado_estado_civil: string
    interesado_direccion: string
}

interface InteresadoProps {
    onNext: (data: DataInteresado) => void
    onBack: () => void
    defaultData?: DataInteresado
}

export const Interesado: React.FC<InteresadoProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DataInteresado>({
        interesado_nombre: defaultData?.interesado_nombre || "",
        interesado_id_tipo: defaultData?.interesado_id_tipo || "",
        interesado_id: defaultData?.interesado_id || "",
        interesado_nacionalidad: defaultData?.interesado_nacionalidad || "",
        interesado_estado_civil: defaultData?.interesado_estado_civil || "",
        interesado_direccion: defaultData?.interesado_direccion || "",
    })

    const [errores, setErrores] = useState<string[]>([])

    const camposRequeridos = ["interesado_nombre", "interesado_direccion"]

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
            <h2 className="text-2xl font-semibold text-secondary">Datos del interesado</h2>

            <GroupIdentidad
                prefix="interesado"
                form={Object.fromEntries(
                    Object.entries(form).map(([k, v]) => [k, v ?? ""])
                )}
                onChange={handleChange}
                errores={errores}
            />

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
