"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PencilLine, Home, Car, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ArrendamientoIntroPage() {
    return (
        <section className="min-h-dvh py-12 md:py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8 md:mt-0">
                {/* Lado izquierdo: Explicación */}
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Contrato de Arrendamiento</h1>

                    <div className="space-y-4">
                        <p className="text-lg text-muted-foreground flex items-start gap-2">
                            <ShieldCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span>Un acuerdo donde <span className="font-medium text-foreground">el dueño</span> presta su propiedad y <span className="font-medium text-foreground">el inquilino</span> la usa pagando por ello</span>
                        </p>

                        <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Home className="h-5 w-5 text-primary" />
                                ¿Qué puedes alquilar?
                            </h3>
                            <ul className="space-y-2 pl-1">
                                <li className="flex items-center gap-2">
                                    <span className="bg-primary/10 p-1 rounded-full">
                                        <Home className="h-4 w-4 text-primary" />
                                    </span>
                                    <span>Casas, apartamentos, locales comerciales</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="bg-primary/10 p-1 rounded-full">
                                        <Car className="h-4 w-4 text-primary" />
                                    </span>
                                    <span>Vehículos, maquinaria, equipos</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold">Lo más importante que incluye:</h3>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Descripción detallada de lo que se alquila</li>
                                <li>Precio y frecuencia de pagos</li>
                                <li>Duración del contrato</li>
                                <li>Reglas de uso (qué se puede y no hacer)</li>
                            </ul>
                        </div>

                        <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Importante:</span> Protege tanto al dueño como al inquilino y evita malentendidos.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link href="/arrendamiento/wizard">
                            <Button size="lg" className="cursor-pointer">
                                <PencilLine className="mr-2 h-4 w-4" /> Crear Contrato
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
                                alt="Contrato de Arrendamiento"
                                width={600}
                                height={400}
                                className="object-cover rounded-lg"
                                priority
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}