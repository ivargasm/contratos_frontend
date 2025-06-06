"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "¿Cómo funciona la generación de contratos?",
        answer:
            "Solo debes seleccionar el tipo de contrato, responder algunas preguntas clave, y la plataforma generará un documento legal adaptado a tus necesidades.",
    },
    {
        question: "¿Puedo personalizar los contratos generados?",
        answer:
            "Sí, puedes editar cláusulas, agregar información específica y guardar plantillas personalizadas para futuros contratos.",
    },
    {
        question: "¿Los contratos están actualizados con la legislación vigente?",
        answer:
            "Sí, nuestro equipo legal actualiza constantemente las plantillas conforme a los cambios normativos aplicables.",
    },
    {
        question: "¿Puedo compartir o descargar los contratos?",
        answer:
            "Claro, puedes descargarlos en PDF o compartirlos directamente con tus clientes a través de un enlace seguro.",
    },
    {
        question: "¿Esta herramienta sirve para abogados independientes y despachos?",
        answer:
            "Sí, está pensada tanto para profesionales individuales como para equipos legales, con funciones adaptadas para ambos casos.",
    },
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="max-w-3xl mx-auto p-4 mt-16 bg-foreground min-w-full text-primary-foreground flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-6 text-title-foreground m-auto">Preguntas frecuentes</h2>
            <div className="space-y-4 w-[90%] md:w-[65%]">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-border rounded-2xl p-4 shadow-sm w-full"
                    >
                        <button
                            className="flex justify-between items-center w-full text-left text-base font-medium"
                            onClick={() =>
                                setOpenIndex(index === openIndex ? null : index)
                            }
                        >
                            {faq.question}
                            <ChevronDown
                                className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="mt-2 text-sm">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
