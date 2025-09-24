"use client"

import { Button } from "@/components/ui/button"
import { PencilLine, Briefcase, Clock, Shield, DollarSign } from "lucide-react"
import Link from "next/link"

export default function LaboralIntroPage() {
    return (
        <section className="min-h-screen py-12 md:py-20 bg-background flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Lado izquierdo: Explicación */}
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-3">
                        <Briefcase className="h-8 w-8" />
                        Contrato Individual de Trabajo
                    </h1>

                    <div className="space-y-4">
                        <p className="text-lg text-muted-foreground flex items-start gap-2">
                            <Shield className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span>Acuerdo legal que formaliza la relación entre <span className="font-medium text-foreground">empleador</span> y <span className="font-medium text-foreground">trabajador</span>, estableciendo derechos y obligaciones mutuas</span>
                        </p>

                        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                                <Briefcase className="h-5 w-5" />
                                ¿Cuándo es necesario?
                            </h3>
                            <ul className="space-y-3 pl-1">
                                <li className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Contratación de empleados por tiempo determinado o indeterminado</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Establecer salarios, prestaciones y condiciones laborales</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>Proteger tanto al empleador como al trabajador legalmente</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-primary" />
                                Elementos clave que incluye:
                            </h3>
                            <ul className="space-y-2 list-disc pl-5 marker:text-primary">
                                <li><span className="font-medium">Puesto y funciones</span> específicas del trabajador</li>
                                <li><span className="font-medium">Salario y prestaciones</span> (superiores o de ley)</li>
                                <li><span className="font-medium">Jornada laboral</span> y horarios de trabajo</li>
                                <li><span className="font-medium">Duración del contrato</span> (determinado o indeterminado)</li>
                                <li>Cláusulas de <span className="font-medium">confidencialidad y no competencia</span></li>
                                <li><span className="font-medium">Obligaciones</span> de ambas partes</li>
                            </ul>
                        </div>

                        <p className="text-muted-foreground italic">
                            Nota: Cumple con la legislación laboral mexicana y protege los derechos de ambas partes.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link href="/laboral/wizard">
                            <Button size="lg" className="cursor-pointer">
                                <PencilLine className="mr-2 h-4 w-4" /> Crear Contrato
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Lado derecho: Ejemplo visual */}
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Ejemplo de Cláusulas:
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-md border">
                            <h4 className="font-semibold mb-2">PRIMERA: OBJETO</h4>
                            <p className="text-sm text-muted-foreground">
                                EL TRABAJADOR se obliga a prestar sus servicios personales subordinados a EL PATRÓN en el puesto de Desarrollador de Software, desempeñando las funciones inherentes al mismo...
                            </p>
                        </div>

                        <div className="bg-muted p-4 rounded-md border">
                            <h4 className="font-semibold mb-2">QUINTA: SALARIO</h4>
                            <p className="text-sm text-muted-foreground">
                                EL PATRÓN pagará a EL TRABAJADOR un salario de $25,000.00 (Veinticinco mil pesos 00/100 M.N.), pagadero de forma mensual...
                            </p>
                        </div>

                        <div className="bg-muted p-4 rounded-md border">
                            <h4 className="font-semibold mb-2">SEXTA: PRESTACIONES</h4>
                            <p className="text-sm text-muted-foreground">
                                Además de las prestaciones de ley, EL TRABAJADOR tendrá derecho a: vales de despensa, seguro de gastos médicos mayores, fondo de ahorro...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}