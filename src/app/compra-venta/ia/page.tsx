"use client"

import ProtectedRoute from "@/app/components/ProtectedRoutes"
import AyudaIAContrato from "../../components/AyudaIAContrato"

export default function CompraVentaIAPage() {
    return (
        <ProtectedRoute>
            <div className="container mx-auto py-8 flex flex-col items-center justify-center h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Asistencia con IA para Contrato de Compra-Venta</h1>
                    <p className="text-muted-foreground mb-8">
                        Use la inteligencia artificial para generar un contrato de compra-venta personalizado basado en sus necesidades específicas.
                    </p>
                    <AyudaIAContrato />
                </div>
            </div>
        </ProtectedRoute>
    )
}