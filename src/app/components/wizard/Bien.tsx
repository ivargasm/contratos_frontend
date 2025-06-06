"use client"

import { SelectField } from "@/app/components/forms/SelectField"
import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { formatearValorEnLetras } from "@/app/lib/numberToWords"
import { useContratoStore } from "@/app/store/useContratoStore"

export interface DatosBien {
    tipo_bien: string
    descripcion_bien: string
    direccion?: string
    estado_bien: string
    moneda: string
    valor_operacion: string
    valor_en_letras: string
    uso_destinado?: string
    accesorios?: string
}

interface BienProps {
    onNext: (data: DatosBien) => void
    onBack: () => void
    defaultData?: DatosBien
}

export const Bien: React.FC<BienProps> = ({ onNext, onBack, defaultData }) => {
    const { tipoContrato } = useContratoStore()
    const [form, setForm] = useState<DatosBien>({
        tipo_bien: defaultData?.tipo_bien || "",
        descripcion_bien: defaultData?.descripcion_bien || "",
        direccion: defaultData?.direccion || "",
        estado_bien: defaultData?.estado_bien || "",
        moneda: defaultData?.moneda || "",
        valor_operacion: defaultData?.valor_operacion || "",
        valor_en_letras: defaultData?.valor_en_letras || "",
        uso_destinado: defaultData?.uso_destinado || "",
        accesorios: defaultData?.accesorios || "",
    })

    // Actualizar valor_en_letras cuando cambia valor_operacion o moneda
    useEffect(() => {
        if (form.valor_operacion && form.moneda) {
            const valorEnLetras = formatearValorEnLetras(form.valor_operacion, form.moneda);
            setForm(prev => ({ ...prev, valor_en_letras: valorEnLetras }));
        }
    }, [form.valor_operacion, form.moneda]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onNext(form)
    }

    console.log(tipoContrato)

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Información del bien</h2>

            <div className="grid gap-4">
                {(tipoContrato === "arrendamiento" || tipoContrato === "comodato") && (
                    <SelectField
                        label="Tipo de bien"
                        name="tipo_bien"
                        value={form.tipo_bien}
                        onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
                        options={["Inmueble", "Mueble"]}
                    />
                )}
                <InputField
                    label="Descripción de la propiedad"
                    name="descripcion_bien"
                    placeholder="Casa, departamento, terreno, automóvil, etc."
                    value={form.descripcion_bien}
                    onChange={handleChange}
                />
                {(tipoContrato === "arrendamiento" || tipoContrato === "comodato") && form.tipo_bien === "Inmueble" && (
                    <InputField
                        label="Direccion"
                        name="direccion"
                        placeholder="Calle, número, colonia, municipio, estado."
                        value={form.direccion || ""}
                        onChange={handleChange}
                    />
                )}
                <InputField
                    label="Estado del bien (Opcional)"
                    name="estado_bien"
                    placeholder="Descripción del estado en que se encuentra el bien. Ejemplo: detalles en pintura."
                    value={form.estado_bien}
                    onChange={handleChange}
                />
                {tipoContrato === "compra-venta" && (
                    <>
                        <SelectField
                            label="Moneda"
                            name="moneda"
                            value={form.moneda}
                            onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)} // TypeScript workaround
                            options={["MXN","DLS","EUR"]}
                        />
                        <InputField
                            label="Valor de la operación"
                            name="valor_operacion"
                            placeholder="10000"
                            value={form.valor_operacion}
                            onChange={handleChange}
                            type="number"
                        />
                        <InputField
                            label="Valor en letra"
                            name="valor_en_letras"
                            placeholder="Diez mil pesos"
                            value={form.valor_en_letras}
                            onChange={handleChange}
                        />
                    </>
                )}

                {tipoContrato === "comodato" && (
                    <InputField
                        label="Accesorios"
                        name="accesorios"
                        placeholder="2 juegos de llaves, manual del propietario, etc."
                        value={form.accesorios || ""}
                        onChange={handleChange}
                    />
                )}

                {(tipoContrato === "arrendamiento" || tipoContrato === "comodato") && (
                    <InputField
                        label="Uso destinado"
                        name="uso_destinado"
                        placeholder="Residencial, Comercial, Industrial, etc."
                        value={form.uso_destinado || ""}
                        onChange={handleChange}
                    />
                )}
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
