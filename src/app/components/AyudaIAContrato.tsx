// app/(contratos)/ayuda-ia/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useContratoStore } from "@/app/store/useContratoStore"
import { generateContractFromIA } from "@/app/lib/api"
import { useAuthStore } from "@/app/store/Store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AyudaIAContrato() {
    const { tipoContrato, setFormData } = useContratoStore()
    const { url } = useAuthStore()
    const router = useRouter()

    const [mensaje, setMensaje] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!tipoContrato) {
            router.push("/contract-selector")
            return
        }

        try {
            setLoading(true)
            const result = await generateContractFromIA(url, tipoContrato, mensaje)
            console.log(result)
            setFormData(result.data)
            router.push(`/${tipoContrato}/wizard`)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto mt-20 p-6 bg-card rounded-xl shadow">
            <h2 className="text-2xl font-bold text-subtitle mb-4">Describe tu contrato</h2>
            <p className="text-muted-foreground mb-6">
                Describe brevemente lo que necesitas y nuestra IA generará automáticamente la información para ti, ten en cuenta que a mas detalles le des a la IA, mejor será el contrato, por ejemplo si es una compra venta de una casa entre dos personas, describe el precio, el tipo de moneda, el estado del bien, la ciudad, Fecha de la venta, etc.
            </p>

            <Textarea
                rows={8}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Quiero hacer un contrato para vender mi casa a otra persona.
                    Yo soy Arturo Perales y soy quien vende. La casa está en Querétaro y está en buenas condiciones. La compró mi papá hace tiempo y ya está pagada. La persona que va a comprarla se llama José Hernández, es un amigo de la familia.
                    Quedamos que me va a pagar 1,200,000 pesos en efectivo, todo junto, el día 15 de mayo de 2025. Ese mismo día le entrego la casa. Vamos a firmar el contrato aquí en Querétaro hoy.
                    Queremos que aparezcan como testigos dos personas: José Pérez y Manuel Gómez. También me gustaría que pongas una cláusula que diga que la casa se entrega sin deudas y con los servicios pagados.
                    "
                className="w-full mb-6 md:h-[200px]"
            />

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Generando contrato..." : "Generar con IA"}
            </Button>
        </div>
    )
}
