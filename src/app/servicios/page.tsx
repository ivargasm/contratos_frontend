"use client"

import { Button } from "@/components/ui/button"
import { Lightbulb, PencilLine } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServiciosIntroPage() {
    return (
        <section className="min-h-screen py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Lado izquierdo: Explicación */}
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-6 flex items-center gap-3">
                        Contrato de Prestación de Servicios
                    </h1>
                    <p className="text-muted-foreground mb-4">
                        Un acuerdo legal donde un profesional o empresa (el prestador) se compromete a realizar un trabajo específico para un cliente a cambio de una remuneración.
                    </p>
                    <p className="text-muted-foreground mb-4">
                        Esencial para formalizar la relación en servicios de consultoría, diseño, desarrollo de software, marketing, mantenimiento, y más.
                    </p>
                    <p className="text-muted-foreground mb-6">
                        Define claramente el alcance de los servicios, los entregables, el precio y las condiciones de pago, los plazos, la confidencialidad y las responsabilidades de cada parte para evitar malentendidos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/servicios/wizard">
                            <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                                <PencilLine className="mr-2 h-4 w-4" /> Llenar Formulario
                            </Button>
                        </Link>
                        <Link href="/servicios/ia">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                                <Lightbulb className="mr-2 h-4 w-4" /> Usar IA para Generarlo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Lado derecho: Imagen */}
                <div className="flex justify-center">
                    <Image
                        src="/images/servicios-doc.png"
                        alt="Contrato de Prestación de Servicios"
                        width={500}
                        height={500}
                        className="object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}