// components/wizard/Paso7GarantiasAdicionales.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface DataGarantiasAdicionales {
    garantias_adicionales: string
}

interface GarantiasAdicionalesProps {
    onNext: (data: DataGarantiasAdicionales) => void
    onBack: () => void
    defaultData?: DataGarantiasAdicionales
}

export const GarantiasAdicionales: React.FC<GarantiasAdicionalesProps> = ({ onNext, onBack, defaultData }) => {
    const [garantias_adicionales, setGarantias] = useState<string>(
        defaultData?.garantias_adicionales || ""
    )

    const handleSubmit = () => {
        onNext({ garantias_adicionales })
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Garantias adicionales</h2>

            <div className="grid gap-4">
                <label htmlFor="garantias" className="text-sm font-medium text-foreground">
                    Escribe cualquier garantias adicional que desees agregar al contrato:
                </label>
                <textarea
                    id="garantias"
                    name="garantias_adicionales"
                    rows={6}
                    value={garantias_adicionales}
                    onChange={(e) => setGarantias(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ej: El Vendedor asume los gastos por..."
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
