"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, PencilLine } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CompraVentaIntroPage() {
    return (
        <section className="min-h-screen py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Lado izquierdo: Explicación */}
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-6">Contrato de Compra-Venta</h1>
                    <p className="text-muted-foreground mb-4">
                        El contrato de compra-venta es un acuerdo legal entre dos partes mediante el cual una parte se compromete a transferir la propiedad de un bien y la otra a pagar por él un precio cierto en dinero.
                    </p>
                    <p className="text-muted-foreground mb-4">
                        Este tipo de contrato puede utilizarse tanto para bienes muebles (como vehículos o electrónicos) como inmuebles (como terrenos o casas).
                    </p>
                    <p className="text-muted-foreground mb-6">
                        Incluye cláusulas relacionadas con la descripción del bien, precio, forma de pago, entrega, y garantías. Es fundamental para proteger los derechos de ambas partes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/compra-venta/wizard">
                            <Button size="lg" className="w-full sm:w-auto">
                                <PencilLine className="mr-2 h-4 w-4" /> Llenar Formulario
                            </Button>
                        </Link>
                        <Link href="/compra-venta/ia">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                <Lightbulb className="mr-2 h-4 w-4" /> Usar IA para Generarlo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Lado derecho: Imagen */}
                <div className="flex justify-center">
                    <Card className="rounded-2xl overflow-hidden bg-card-none border-none shadow-none">
                        <CardContent className="p-0">
                            <Image
                                src="/images/compra-venta-doc.jpg"
                                alt="Contrato de Compra-Venta"
                                width={600}
                                height={400}
                                className="object-cover rounded-lg"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
