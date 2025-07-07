"use client"

import { useState } from "react"
import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { validarCamposObligatorios } from "@/app/lib/validation"

export interface DatosInfoConfidencial {
    [key: string]: string | undefined
    propocito_acuerdo: string
    categorias_informacion: string
}

interface InfoConfidencialProps {
    onNext: (data: DatosInfoConfidencial) => void
    onBack: () => void
    defaultData?: DatosInfoConfidencial
}

export const InfoConfidencial: React.FC<InfoConfidencialProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DatosInfoConfidencial>({
        propocito_acuerdo: defaultData?.propocito_acuerdo || "",
        categorias_informacion: defaultData?.categorias_informacion || "",
    })
    const [errores, setErrores] = useState<string[]>([])

    const camposRequeridos = ["propocito_acuerdo"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const hasErrorCategorias = errores.includes("categorias_informacion")

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Información del Acuerdo</h2>
            <div className="grid gap-4">
                <InputField
                    label="Propósito del Acuerdo"
                    name="propocito_acuerdo"
                    placeholder="Ej: Discusiones sobre una posible colaboración comercial, evaluación de un proyecto, etc."
                    value={form.propocito_acuerdo}
                    onChange={handleChange}
                    required
                    error={errores.includes("propocito_acuerdo")}
                />

                <div>
                    <label htmlFor="categorias_informacion" className="text-sm font-medium text-foreground">
                        Categorías de Información Confidencial: *
                    </label>
                    <textarea
                        id="categorias_informacion"
                        name="categorias_informacion"
                        rows={6}
                        value={form.categorias_informacion}
                        onChange={handleChange}
                        className={`mt-1 w-full border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 ${
                            hasErrorCategorias ? "border-destructive ring-destructive" : "border-border focus:ring-primary"
                        }`}
                        placeholder="Ej: Secretos comerciales, datos financieros, listas de clientes, estrategias de marketing, prototipos, código fuente, etc."
                    />
                </div>
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

