// components/wizard/Paso7Clausulas.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface DataClausulasAdicionales {
    clausulas_adicionales: string
}

interface ClausulasAdicionalesProps {
    onNext: (data: DataClausulasAdicionales) => void
    onBack: () => void
    defaultData?: DataClausulasAdicionales
}

export const ClausulasAdicionales: React.FC<ClausulasAdicionalesProps> = ({ onNext, onBack, defaultData }) => {
    const [clausulas_adicionales, setClausulas] = useState<string>(
        defaultData?.clausulas_adicionales || ""
    )

    const handleSubmit = () => {
        onNext({ clausulas_adicionales })
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Cláusulas adicionales</h2>

            <div className="grid gap-4">
                <label htmlFor="clausulas" className="text-sm font-medium text-foreground">
                    Escribe cualquier cláusula adicional que desees agregar al contrato:
                </label>
                <textarea
                    id="clausulas"
                    name="clausulas_adicionales"
                    rows={6}
                    value={clausulas_adicionales}
                    onChange={(e) => setClausulas(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ej: El comprador asume los gastos notariales..."
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
