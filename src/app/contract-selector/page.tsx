"use client"

import Image from "next/image"
import {
    FileText,
    Home,
    Building2,
    Handshake,
    ShieldCheck,
    UserCheck,
} from "lucide-react"
import Link from "next/link"
import { useContratoStore } from "../store/useContratoStore"




const contractTypes = [
    {
        label: "Compra-Venta",
        value: "compra-venta",
        type: "compra-venta",
        icon: Home,
        description: "Para la compra y venta de bienes o inmuebles.",
    },
    {
        label: "Arrendamiento",
        value: "arrendamiento",
        type: "arrendamiento",
        icon: Building2,
        description: "Para alquiler de propiedades o bienes muebles.",
    },
    {
        label: "Comodato",
        value: "comodato",
        type: "comodato",
        icon: Handshake,
        description: "Préstamo de uso sin costo, por tiempo determinado.",
    },
    {
        label: "Servicios",
        value: "servicios",
        type: "servicios",
        icon: UserCheck,
        description: "Para contratación de servicios profesionales.",
    },
    {
        label: "Confidencialidad",
        value: "confidencialidad",
        type: "confidencialidad",
        icon: ShieldCheck,
        description: "Protege la información sensible entre partes.",
    },
    {
        label: "Otro",
        value: "otro",
        type: "otro",
        icon: FileText,
        description: "Próximamente más tipos de contratos. ¡Danos tu opinión!",
    },
]

export default function ContractSelectorPage() {
    const { setTipoContrato } = useContratoStore()

    return (
        <section className="pt-12 md:pt-8 bg-background min-h-[100vh]">
            {/* Parte superior: explicación + imagen */}
            <div className="bg-foreground mb-5">
                <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-primary-foreground mb-4">
                            Genera contratos personalizados en minutos
                        </h2>
                        <p className="text-muted text-lg mb-6 text-balance">
                            Nuestra plataforma te permite crear contratos legales adaptados a tus necesidades. Solo elige el tipo de contrato, responde unas preguntas clave y descarga tu documento listo para firmar.
                        </p>
                        <ul className="list-disc list-inside text-muted space-y-2">
                            <li>Fácil de usar, sin conocimientos legales previos.</li>
                            <li>Contratos listos para imprimir o firmar digitalmente.</li>
                            <li>Validez legal en México.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/images/legal3 - copia.jpg"
                            alt="Dispositivos con contratos"
                            width={500}
                            height={400}
                            className="rounded-2xl shadow-md object-cover"
                        />
                    </div>
                </div>

            </div>

            {/* Parte inferior: selector de contratos */}
            <div className="max-w-6xl mx-auto px-4 pb-24">
                <h3 className="text-3xl font-bold text-secondary text-center mb-8">
                    Selecciona el tipo de contrato
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contractTypes.map(({ label, value, type, icon: Icon, description }) => (
                        <Link
                            key={value}
                            href={`/${value}`}
                            onClick={() => setTipoContrato(type || "")}
                            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary transition text-left flex flex-col items-start gap-4 group"
                        >
                            <div className="bg-primary/10 text-secondary p-3 rounded-full">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold group-hover:text-secondary transition">
                                    {label}
                                </h4>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
