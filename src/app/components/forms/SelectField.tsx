// components/forms/SelectField.tsx
interface SelectFieldProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: string[]
}

export const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => (
    <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm text-muted-foreground font-medium">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="border border-border rounded-md p-2 bg-background text-foreground"
        >
            <option value="">Selecciona una opción</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
)
