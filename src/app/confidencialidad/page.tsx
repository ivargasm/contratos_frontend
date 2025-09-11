"use client"

import { Button } from "@/components/ui/button"
import { PencilLine } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ConfidencialidadIntroPage() {
    return (
        <section className="min-h-screen py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Lado izquierdo: Explicación */}
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-6 flex items-center gap-3">
                        Acuerdo de Confidencialidad (NDA)
                    </h1>
                    <p className="text-muted-foreground mb-4">
                        Un contrato legal que establece una relación confidencial. La parte o partes firmantes se comprometen a no divulgar información cubierta por el acuerdo.
                    </p>
                    <p className="text-muted-foreground mb-4">
                        También conocido como NDA (Non-Disclosure Agreement), es crucial para proteger secretos comerciales, información de propiedad, planes de negocio, y datos sensibles cuando se comparten con terceros.
                    </p>
                    <p className="text-muted-foreground mb-6">
                        Define qué información es confidencial, las obligaciones de las partes, el período de confidencialidad y las consecuencias en caso de incumplimiento, protegiendo así la propiedad intelectual y la ventaja competitiva.
                    </p>

                    <div>
                        <Link href="/confidencialidad/wizard">
                            <Button size="lg" className="cursor-pointer">
                                <PencilLine className="mr-2 h-4 w-4" /> Crear Acuerdo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Lado derecho: Imagen */}
                <div className="flex justify-center">
                    <Image
                        src="/images/confidencialidad-doc.png"
                        alt="Acuerdo de Confidencialidad"
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}