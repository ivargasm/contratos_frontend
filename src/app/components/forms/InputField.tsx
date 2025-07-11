interface InputFieldProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
    required?: boolean
    error?: boolean
}

export const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = false, error = false }: InputFieldProps) => (
    <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-medium text-foreground">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full rounded-lg border border-border px-4 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? "border-destructive ring-destructive" : "border-border focus:ring-primary"
            }`}
        />
    </div>
)