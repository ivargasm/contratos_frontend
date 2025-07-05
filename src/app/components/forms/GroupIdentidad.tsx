import { InputField } from "./InputField"
import { SelectField } from "./SelectField"


interface GroupIdentidadProps {
    prefix: string
    form: Record<string, string>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errores?: string[]
}

export const GroupIdentidad = ({ prefix, form, onChange, errores = [] }: GroupIdentidadProps) => (
    <div className="grid gap-4">
        <InputField
            label="Nombre completo"
            name={`${prefix}_nombre`}
            placeholder="Juan Pérez"
            value={form[`${prefix}_nombre`] || ""}
            onChange={onChange}
            required
            error={errores.includes(`${prefix}_nombre`)}
        />
        <SelectField
            label="Nacionalidad"
            name={`${prefix}_nacionalidad`}
            value={form[`${prefix}_nacionalidad`] || ""}
            onChange={(e) => onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
            options={["Mexicano", "Extranjero"]}
        />
        <SelectField
            label="Estado Civil"
            name={`${prefix}_estado_civil`}
            value={form[`${prefix}_estado_civil`] || ""}
            onChange={(e) => onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
            options={["Soltero", "Casado"]}
        />
        <SelectField
            label="Documento"
            name={`${prefix}_id_tipo`}
            value={form[`${prefix}_id_tipo`] || ""}
            onChange={(e) => onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
            options={["INE", "Licencia de conducir","Pasaporte"]}
        />
        <InputField
            label="Identificación (ID)"
            name={`${prefix}_id`}
            placeholder="123456789"
            value={form[`${prefix}_id`] || ""}
            onChange={onChange}
        />
        <InputField
            label="Domicilio"
            name={`${prefix}_direccion`}
            placeholder="Calle 123"
            value={form[`${prefix}_direccion`] || ""}
            onChange={onChange}
            required
            error={errores.includes(`${prefix}_direccion`)}
        />
    </div>
)