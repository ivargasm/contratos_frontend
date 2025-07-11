// components/wizard/Paso9Revision.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PreviewModal } from "@/app/components/PreviewModal"
import { useContratoStore } from "@/app/store/useContratoStore"
import { generatePurchaseSaleContract, getPresignedUrl, previewContract } from "@/app/lib/api"
import { useAuthStore } from "@/app/store/Store"
import { useRouter } from "next/navigation"
import { updateContract } from "@/app/lib/api"

interface RevisionProps {
    onBack: () => void
}

export const Revision: React.FC<RevisionProps> = ({ onBack }) => {
    const { formData, tipoContrato, contractId, clearFormData, clearContractId } = useContratoStore()
    const { url } = useAuthStore()
    const router = useRouter()

    const [showPreview, setShowPreview] = useState(false)
    const [html, setHtml] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePreview = async () => {
        try {
            setLoading(true)
            const result = await previewContract(url, tipoContrato || "purchase_sale", formData)
            setHtml(result.html)
            setShowPreview(true)
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmDownload = async () => {
        try {
            let result;
            if (contractId) {
                // Edición
                result = await updateContract(url, contractId, tipoContrato || "", formData)
            } else {
                // Creación
                result = await generatePurchaseSaleContract(url, tipoContrato || "purchase_sale", formData)
            }

            const url_presigned = await getPresignedUrl(url, result.id)
            if (url_presigned) {
                window.open(url_presigned, '_blank')
            }

            // Limpieza
            clearFormData()
            clearContractId()

            router.push('/profile')

        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unexpected error occurred")
            }
        }
    }

    return (
        <div className="space-y-6 w-full mx-auto p-6 bg-card rounded-xl shadow-md mt-12">
            <h2 className="text-2xl font-semibold text-secondary">Revisión final</h2>

            <div className="space-y-4">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-muted py-2">
                        <span className="capitalize text-muted-foreground">
                            {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-foreground font-medium text-right max-w-[65%]">
                            {value || <em className="text-muted">No especificado</em>}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={onBack} className="cursor-pointer">
                    Atrás
                </Button>
                <Button onClick={handlePreview} disabled={loading} className="cursor-pointer">
                    {loading ? "Cargando vista previa..." : "Vista previa"}
                </Button>
            </div>

            <PreviewModal
                open={showPreview}
                html={html}
                onClose={() => setShowPreview(false)}
                onConfirm={handleConfirmDownload}
            />
        </div>
    )
}
