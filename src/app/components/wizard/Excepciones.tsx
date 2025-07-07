// components/wizard/Excepciones.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export interface DatosExcepciones {
    [key: string]: string | undefined;
    excepciones: string
}

interface ExcepcionesProps {
    onNext: (data: DatosExcepciones) => void
    onBack: () => void
    defaultData?: DatosExcepciones
}

export const Excepciones: React.FC<ExcepcionesProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DatosExcepciones>({
        excepciones: defaultData?.excepciones || ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onNext(form)
    }


    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Servicios</h2>
            <div className="grid gap-4">
                <label htmlFor="excepciones" className="text-sm font-medium text-foreground">
                    Describe las excepciones que se van a tener: *
                </label>
                <textarea
                    id="excepciones"
                    name="excepciones"
                    rows={6}
                    value={form.excepciones}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 `}
                    placeholder="Ej: Excepciones a la confidencialidad, información pública, etc."
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
