// components/PreviewModal.tsx
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PreviewModalProps {
    open: boolean
    html: string
    onClose: () => void
    onConfirm: () => void
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ open, html, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader className="text-title">
                    <DialogTitle>Vista previa del contrato</DialogTitle>
                </DialogHeader>

                <div
                    className="prose dark:prose-invert bg-white p-6 rounded shadow-inner max-h-[60vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                <DialogFooter className="mt-6 text-secondary">
                    <Button variant="outline" onClick={onClose}>
                        Volver a editar
                    </Button>
                    <Button onClick={onConfirm} className="text-white/80">
                        Descargar contrato
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
