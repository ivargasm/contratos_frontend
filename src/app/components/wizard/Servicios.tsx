// components/wizard/Servicios.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { validarCamposObligatorios } from "@/app/lib/validation"

export interface DatosServicios {
    [key: string]: string | undefined;
    servicios_descripcion: string
}

interface ServiciosProps {
    onNext: (data: DatosServicios) => void
    onBack: () => void
    defaultData?: DatosServicios
}

export const Servicios: React.FC<ServiciosProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DatosServicios>({
        servicios_descripcion: defaultData?.servicios_descripcion || ""
    })
    const [errores, setErrores] = useState<string[]>([])

    const camposRequeridos = ["servicios_descripcion"]

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const camposFaltantes = validarCamposObligatorios(form, camposRequeridos)
        if (camposFaltantes.length > 0) {
            setErrores(camposFaltantes)
            return
        }
        setErrores([])
        onNext(form)
    }

    const hasError = errores.includes("servicios_descripcion")

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Servicios</h2>
            <div className="grid gap-4">
                <label htmlFor="servicios_descripcion" className="text-sm font-medium text-foreground">
                    Describe los servicios que se van a prestar: *
                </label>
                <textarea
                    id="servicios_descripcion"
                    name="servicios_descripcion"
                    rows={6}
                    value={form.servicios_descripcion}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 ${
                        hasError ? "border-destructive ring-destructive" : "border-border focus:ring-primary"
                    }`}
                    placeholder="Ej: Desarrollo de software, consultoría técnica, mantenimiento de sistemas..."
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
