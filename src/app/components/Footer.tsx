export function Footer() {
    return (
        <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h3 className="text-lg font-semibold mb-3">Sobre la plataforma</h3>
                    <p className="text-sm text-muted-foreground text-balance">
                        Herramienta inteligente para la generación, edición y gestión de contratos legales. Diseñada para abogados, despachos y profesionales independientes.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Navegación</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="hover:underline">Características</a></li>
                        {/* <li><a href="#precios" className="hover:underline">Planes</a></li> */}
                        <li><a href="#faq" className="hover:underline">Preguntas frecuentes</a></li>
                        <li><a href="#contacto" className="hover:underline">Contacto</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contacto</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>Email: <a href="mailto:contacto@easycontract.com.mx" className="hover:underline">contacto@easycontract.com.mx</a></li>
                        {/* <li>Teléfono: <a href="tel:+525512345678" className="hover:underline">+52 55 1234 5678</a></li> */}
                        <li>Horario: Lun a Vie, 9:00 a 18:00 hrs</li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-sidebar-border text-sm text-center text-muted-foreground py-4 px-6">
                &copy; {new Date().getFullYear()} Tu App Legal. Todos los derechos reservados.
            </div>
        </footer>
    )
}
