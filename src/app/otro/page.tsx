import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OtroPage() {
    return (
        <section className="pt-12 md:pt-8 bg-background min-h-[100vh] flex items-center justify-center">
            <div className="max-w-2xl mx-auto px-4 py-16 text-center bg-card border border-border rounded-2xl p-8 shadow-md">
                <h2 className="text-4xl font-bold text-secondary mb-4">
                    Más contratos próximamente
                </h2>
                <p className="text-muted-foreground text-lg mb-6 text-balance">
                    Estamos trabajando constantemente para agregar más tipos de contratos a
                    nuestra plataforma. Nuestro objetivo es cubrir todas tus
                    necesidades legales.
                </p>
                <p className="text-muted-foreground text-lg mb-8 text-balance">
                    ¿Tienes algún contrato en mente que te gustaría ver aquí? ¡Nos
                    encantaría saberlo! Tus sugerencias nos ayudan a priorizar y a
                    construir una herramienta más completa para ti.
                </p>
                <Button asChild>
                    <Link href="mailto:contacto@easycontract.com.mx?subject=Sugerencia de nuevo contrato">
                        <Mail className="mr-2 h-4 w-4" />
                        Envíanos tu sugerencia
                    </Link>
                </Button>
            </div>
        </section>
    )
}