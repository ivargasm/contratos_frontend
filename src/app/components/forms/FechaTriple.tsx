import { InputField } from "./InputField"

interface FechaTripleProps {
    value: { dia: string; mes: string; anio: string }
    onChange: (name: string, value: string) => void
}

export const FechaTriple = ({ value, onChange }: FechaTripleProps) => (
    <div className="grid grid-cols-3 gap-4">
        <InputField
            label="Día"
            name="dia"
            value={value.dia}
            onChange={(e) => onChange("dia", e.target.value)}
            type="number"
        />
        <InputField
            label="Mes"
            name="mes"
            value={value.mes}
            onChange={(e) => onChange("mes", e.target.value)}
        />
        <InputField
            label="Año"
            name="anio"
            value={value.anio}
            onChange={(e) => onChange("anio", e.target.value)}
            type="number"
        />
    </div>
)
