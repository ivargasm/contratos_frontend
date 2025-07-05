// components/wizard/Paso5Pago.tsx
"use client"

import { InputField } from "../forms/InputField"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { SelectField } from "../forms/SelectField"
import { useContratoStore } from "@/app/store/useContratoStore"
import { formatearValorEnLetras } from "@/app/lib/numberToWords"
import { validarCamposObligatorios } from "@/app/lib/validation"

export interface DataPago {
    [key: string]: string | undefined
    forma_pago: string
    fechas_pago: string
    lugar_pago: string
    moneda: string
    valor_operacion: string
    valor_en_letras: string
    deposito_garantia: string
}

interface Props {
    onNext: (data: DataPago) => void
    onBack: () => void
    defaultData?: DataPago
}

export const Pago: React.FC<Props> = ({ onNext, onBack, defaultData }) => {
    const { tipoContrato } = useContratoStore()
    const [form, setForm] = useState<DataPago>({
        forma_pago: defaultData?.forma_pago || "",
        fechas_pago: defaultData?.fechas_pago || "",
        lugar_pago: defaultData?.lugar_pago || "",
        moneda: defaultData?.moneda || "",
        valor_operacion: defaultData?.valor_operacion || "",
        valor_en_letras: defaultData?.valor_en_letras || "",
        deposito_garantia: defaultData?.deposito_garantia || "",
    })
    const [errores, setErrores] = useState<string[]>([])
    const camposRequeridos = ["forma_pago", "fechas_pago", "lugar_pago", ...(tipoContrato === "arrendamiento" ? ["valor_operacion"] : [])]
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
        const camposFaltantes = validarCamposObligatorios(form, camposRequeridos)
        if (camposFaltantes.length > 0) {
            setErrores(camposFaltantes)
            return
        }
        setErrores([]) // limpiar errores previos
        onNext(form)
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-secondary">Forma de pago</h2>

            <div className="grid gap-4">
                <InputField
                    label="Forma de pago"
                    name="forma_pago"
                    placeholder="Efectivo, Transferencia, etc."
                    value={form.forma_pago}
                    onChange={handleChange}
                    required
                    error={errores.includes("forma_pago")}
                />
                <InputField
                    label="Fechas de pago"
                    name="fechas_pago"
                    placeholder="Los dias 5 de cada mes"
                    value={form.fechas_pago}
                    onChange={handleChange}
                    required
                    error={errores.includes("fechas_pago")}
                />
                <InputField
                    label="Lugar de pago"
                    name="lugar_pago"
                    placeholder="Domicilio, Numero de cuenta bancaria, etc."
                    value={form.lugar_pago}
                    onChange={handleChange}
                    required
                    error={errores.includes("lugar_pago")}
                />
                {tipoContrato === "arrendamiento" && (
                    <>
                        <InputField
                            label="Depósito de garantía (meses)"
                            name="deposito_garantia"
                            placeholder="3"
                            value={form.deposito_garantia}
                            onChange={handleChange}
                            type="number"
                        />
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
                            required
                            error={errores.includes("valor_operacion")}
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
