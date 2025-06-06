"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const comments = [
    {
        name: "Lic. Ana Martínez",
        text: "Gracias a esta plataforma, puedo generar contratos personalizados en minutos. Me ha ahorrado mucho tiempo en el despacho.",
    },
    {
        name: "José Rivas, Abogado Independiente",
        text: "Lo que más valoro es que los contratos siempre están actualizados conforme a la ley. Me da mucha tranquilidad.",
    },
    {
        name: "Despacho Legal Ágora",
        text: "La herramienta nos permite estandarizar contratos para nuestros clientes, lo que mejora la eficiencia y reduce errores.",
    },
    {
        name: "Mónica Herrera, Consultora Legal",
        text: "Poder crear contratos con plantillas predefinidas ha mejorado nuestra productividad legal de forma significativa.",
    },
    {
        name: "Gustavo Leal, Abogado Corporativo",
        text: "La interfaz es muy intuitiva. Mis clientes ya reciben sus contratos el mismo día sin necesidad de redactar desde cero.",
    },
]


export default function CommentsSlider() {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((prev) => (prev + 1) % comments.length)
    const prev = () => setIndex((prev) => (prev - 1 + comments.length) % comments.length)

    // Autoplay (cada 6 seg)
    useEffect(() => {
        const interval = setInterval(next, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-title)] mb-2">Comentarios sobre la aplicación</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">Lo que opinan nuestros usuarios</p>

            <div className="flex flex-col items-center min-w-[80%]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className="mx-auto shadow-lg rounded-2xl w-full">
                            <CardContent className="p-6 w-full">
                                <p className="text-[var(--text-body)] text-lg italic mb-4">“{comments[index].text}”</p>
                                <p className="text-[var(--text-subtitle)] font-semibold">{comments[index].name}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 mt-4">
                    <button onClick={prev} className="hover:scale-110 transition">
                        <ArrowLeft className="text-[var(--text-secondary)]" />
                    </button>
                    <button onClick={next} className="hover:scale-110 transition">
                        <ArrowRight className="text-[var(--text-secondary)]" />
                    </button>
                </div>
            </div>
        </section>
    )
}
