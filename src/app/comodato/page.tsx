"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Handshake, Key, ClipboardCheck, PencilLine, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function ComodatoIntroPage() {
    return (
        <section className="min-h-screen py-12 md:py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Lado izquierdo: Explicación */}
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-3">
                        <Handshake className="h-8 w-8" />
                        Contrato de Comodato
                    </h1>

                    <div className="space-y-4">
                        <p className="text-lg text-muted-foreground">
                            Acuerdo donde <span className="font-medium text-foreground">el dueño</span> presta un bien <span className="font-medium text-foreground">sin cobrar</span> y <span className="font-medium text-foreground">el prestatario</span> lo usa con cuidado.
                        </p>

                        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                                <Key className="h-5 w-5" />
                                ¿Cuándo usarlo?
                            </h3>
                            <ul className="space-y-3 pl-1">
                                <li className="flex items-start gap-3">
                                    <ClipboardCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Prestar un vehículo a un familiar</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ClipboardCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Ceder el uso de un local sin fines de lucro</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ClipboardCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Préstamo de equipos entre empresas aliadas</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Lo que debe incluir:
                            </h3>
                            <ul className="space-y-2 list-disc pl-5 marker:text-primary">
                                <li><span className="font-medium">Descripción detallada</span> del bien prestado</li>
                                <li><span className="font-medium">Plazo de uso</span> (tiempo determinado)</li>
                                <li>Obligación de <span className="font-medium">devolverlo en buen estado</span></li>
                                <li>Prohibición de <span className="font-medium">alquilarlo o venderlo</span></li>
                            </ul>
                        </div>

                        <p className="text-muted-foreground italic">
                            Nota: No implica pago de dinero, solo el compromiso de cuidar el bien prestado.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link href="/comodato/wizard" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full">
                                <PencilLine className="mr-2 h-4 w-4" /> Llenar Paso a Paso
                            </Button>
                        </Link>
                        <Link href="/comodato/ia" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full">
                                <Lightbulb className="mr-2 h-4 w-4" /> Generar con IA
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Lado derecho: Ejemplo visual */}
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Ejemplo de Cláusula:
                    </h3>
                    <div className="bg-muted p-5 rounded-md border">
                        <h4 className="font-semibold mb-2">PRIMERA: OBJETO</h4>
                        <p className="text-sm text-muted-foreground">
                            EL COMODANTE cede en préstamo de uso a EL COMODATARIO el vehículo marca Toyota, modelo Corolla 2020, placa ABC-123, el cual será utilizado exclusivamente para transporte personal sin fines de lucro.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">SEGUNDA: DURACIÓN</h4>
                        <p className="text-sm text-muted-foreground">
                            El presente comodato tendrá una duración de 6 meses a partir de la fecha de firma, prorrogable por acuerdo mutuo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}