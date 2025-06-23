// components/wizard/steps/LongTextStep.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LongTextStepProps {
    stepTitle: string
    label: string
    placeholder?: string
    name: string
    defaultValue?: string
    onNext: (data: Record<string, string>) => void
    onBack: () => void
}

export const LongTextStep: React.FC<LongTextStepProps> = ({
    stepTitle,
    label,
    placeholder,
    name,
    defaultValue = "",
    onNext,
    onBack,
}) => {
    const [value, setValue] = useState(defaultValue)

    const handleSubmit = () => {
        onNext({ [name]: value })
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">{stepTitle}</h2>

            <div className="grid gap-4">
                <label htmlFor={name} className="text-sm font-medium text-foreground">
                    {label}
                </label>
                <textarea
                    id={name}
                    name={name}
                    rows={6}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={placeholder}
                ></textarea>
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
