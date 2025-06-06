// components/wizard/Paso13Testigos.tsx
"use client"

import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface TestigosData {
    testigo_1: string
    testigo_2: string
}

interface TestigosProps {
    onNext: (data: TestigosData) => void
    onBack: () => void
    defaultData?: TestigosData
}

export const Testigos: React.FC<TestigosProps> = ({ onNext, onBack, defaultData }) => {
    const [form, setForm] = useState<TestigosData>({
        testigo_1: defaultData?.testigo_1 || "",
        testigo_2: defaultData?.testigo_2 || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Testigos (opcional)</h2>

            <div className="grid gap-4">
                <InputField
                    label="Nombre del primer testigo"
                    name="testigo_1"
                    placeholder="Juan Perez"
                    value={form.testigo_1}
                    onChange={handleChange}
                />
                <InputField
                    label="Nombre del segundo testigo"
                    name="testigo_2"
                    placeholder="Maria Lopez"
                    value={form.testigo_2}
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
