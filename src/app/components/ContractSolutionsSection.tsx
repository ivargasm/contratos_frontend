import Image from "next/image";

export const ContractSolutionsSection = () => {
    return (
        <section className="w-full min-h-[100vh] bg-foreground text-background flex items-center justify-center px-6 sm:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center md:min-h-[100vh] max-w-7xl mx-auto">
                {/* Imagen */}
                <div className="relative w-full h-[300px] md:h-[400px]">
                    <Image
                        src="/images/contracts-devices.jpg"
                        alt="Personas revisando contratos en dispositivos"
                        fill
                        className="object-cover rounded-2xl"
                        priority
                    />
                </div>

                {/* Texto */}
                <div className="p-6 sm:p-12 space-y-4">
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-title-foreground">
                        Simplifica la Redacción Legal
                    </h2>
                    <p className="text-muted text-lg max-w-md mx-auto md:mx-0 text-balance">
                        Optimiza tus documentos legales con nuestra aplicación especializada en generación de contratos, eficiente y adaptable a tus necesidades.
                    </p>
                </div>
            </div>
        </section>
    );
}
