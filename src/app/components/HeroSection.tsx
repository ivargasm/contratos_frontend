import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="min-h-[100vh] w-full bg-background text-foreground flex items-center justify-center px-6 sm:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
                {/* Texto */}
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-title">
                        Facilita Tus <br />
                        <span >Procesos Legales</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0 text-balance">
                        Optimiza tus gestiones legales con nuestra aplicación avanzada de generación de contratos.
                        Simplifica, agiliza y asegura tus procesos.
                    </p>
                    <div>
                        <Link href="/contract-selector" passHref>
                            <Button 
                                size="lg" 
                                className="text-lg text-body-foreground bg-primary font-semibold cursor-pointer rounded"
                            >
                                Comienza Ahora
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Imagen */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/images/legal1 - copia.jpg"
                        alt="Legal Hero"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover max-h-[400px] w-auto shadow-lg"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
