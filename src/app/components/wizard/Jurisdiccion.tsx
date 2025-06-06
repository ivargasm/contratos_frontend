"use client"

import { useState } from "react"
import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"

export interface DataJurisdiccion {
    pais_jurisdiccion: string
    ciudad_jurisdiccion: string
}

interface Paso1Props {
    onNext: (data: DataJurisdiccion) => void
    onBack: () => void
    defaultData?: DataJurisdiccion
}

export const Jurisdiccion: React.FC<Paso1Props> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<DataJurisdiccion>({
        pais_jurisdiccion: defaultData?.pais_jurisdiccion || "",
        ciudad_jurisdiccion: defaultData?.ciudad_jurisdiccion || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleNext = () => {
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Información de jurisdiccion</h2>

            <div className="grid gap-4">
                <InputField
                    label="Pais"
                    name="pais_jurisdiccion"
                    placeholder="México"
                    value={form.pais_jurisdiccion}
                    onChange={handleChange}
                />
                <InputField
                    label="Ciudad"
                    name="ciudad_jurisdiccion"
                    placeholder="Queretaro"
                    value={form.ciudad_jurisdiccion}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Atrás
                </Button>
                <Button onClick={handleNext} className="w-full sm:w-auto">
                    Siguiente
                </Button>
            </div>
        </div>
    )
}