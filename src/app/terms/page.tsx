import { Footer } from "../components/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pt-24">
            <div className="max-w-4xl mx-auto py-12 px-6 sm:px-12 text-gray-800 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-2">Términos y Condiciones de Uso de EasyContract</h1>
                <p className="text-sm text-gray-500 mb-8">Última actualización: 02 de febrero de 2026</p>

                <div className="space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
                        <p>Al registrarse, acceder o utilizar los servicios de EasyContract (en adelante, &quot;La Plataforma&quot;), usted (en adelante, &quot;El Usuario&quot;) acepta vincularse legalmente por estos Términos y Condiciones. Si no está de acuerdo, absténgase de usar el servicio.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. DESCRIPCIÓN DEL SERVICIO Y LIMITACIÓN LEGAL</h2>
                        <p>El Usuario reconoce y acepta que EasyContract es una herramienta tecnológica de automatización de documentos y <strong>no constituye un despacho de abogados, ni presta servicios de asesoría jurídica, representación o litigio.</strong> Las plantillas y formularios disponibles en la plataforma son formatos estandarizados basados en la legislación vigente, pero no sustituyen el juicio profesional de un abogado ni garantizan un resultado específico en caso de controversia judicial. El uso de los documentos generados es bajo el exclusivo riesgo y responsabilidad del Usuario. Recomendamos siempre la revisión final por parte de un licenciado en derecho.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. SERVICIO DE FIRMA ELECTRÓNICA Y CUENTAS EMPRESARIALES (B2B)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Firma Electrónica Simple:</strong> La Plataforma ofrece un servicio para la captura de firmas electrónicas, generando un registro de auditoría (Audit Trail) que incluye estampas de tiempo, direcciones IP y un hash criptográfico (SHA-256) del documento final. Sin embargo, EasyContract funge como un mero prestador de servicios de conservación de mensajes de datos. <strong>Es responsabilidad exclusiva del Usuario verificar la identidad y capacidad legal de las contrapartes firmantes.</strong></li>
                            <li><strong>Integración Empresarial (B2B):</strong> En caso de usar cuentas empresariales, el Usuario puede cargar plantillas propias e importar datos masivos (ej. mediante archivos CSV). El Usuario garantiza tener autorización legal para manejar los datos de los firmantes y exime a la Plataforma de cualquier responsabilidad por errores en la carga o el envío masivo de documentos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. PROPIEDAD DE LOS DATOS Y LICENCIA</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Propiedad del Usuario:</strong> El Usuario conserva todos los derechos de propiedad intelectual sobre los datos, nombres, direcciones y cualquier otra información que captura en los formularios de La Plataforma (&quot;Contenido del Usuario&quot;).</li>
                            <li><strong>Licencia de Procesamiento:</strong> Al introducir información, El Usuario otorga a La Plataforma una licencia mundial, no exclusiva y libre de regalías para procesar, formatear y compilar dicho contenido <strong>únicamente con el propósito de generar los documentos legales solicitados</strong> (ej. crear el PDF o DOCX del contrato) y enviar los correos de firma electrónica.</li>
                            <li><strong>Garantía de Legalidad:</strong> El Usuario garantiza que la información proporcionada es verídica y que posee los derechos necesarios sobre la misma.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">5. POLÍTICA DE RETENCIÓN Y ELIMINACIÓN DE DATOS (Cláusula Técnica)</h2>
                        <p>Debido a la naturaleza del servicio:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Borradores y Sesiones:</strong> Los archivos originales y procesados de contratos no firmados se almacenan temporalmente para permitir la sesión de trabajo. La Plataforma eliminará automáticamente estos borradores tras 72 horas de inactividad.</li>
                            <li><strong>Documentos Firmados:</strong> Los contratos que pasen por el proceso de <strong>Firma Electrónica</strong> se almacenarán de forma persistente y segura para garantizar su integridad y disponibilidad para las partes firmantes, junto con la evidencia criptográfica (hash).</li>
                            <li><strong>Backups:</strong> Es responsabilidad exclusiva del Usuario mantener copias de seguridad locales de sus archivos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">6. LIMITACIÓN DE RESPONSABILIDAD (Cláusula &quot;As Is&quot;)</h2>
                        <p>El servicio se ofrece &quot;tal cual&quot; y &quot;según disponibilidad&quot;. En la máxima medida permitida por la ley aplicable:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>EasyContract no garantiza que las plantillas o documentos generados estén completamente libres de errores tipográficos o que se ajusten perfectamente a las necesidades específicas de un caso judicial complejo.</li>
                            <li>No seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso de un contrato generado en la plataforma que resulte insuficiente en un litigio.</li>
                            <li><strong>Ejemplo:</strong> Si el Usuario captura erróneamente un nombre o una fecha en el formulario, o si elige una plantilla incorrecta para su situación (ej. Contrato Civil vs Mercantil), la responsabilidad sobre la validez del documento final recae exclusivamente en el Usuario.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">7. PROPIEDAD INTELECTUAL DE LA PLATAFORMA</h2>
                        <p>El código fuente, algoritmos, diseño de interfaz, logotipos y la estructura de la base de datos son propiedad exclusiva de EasyContract. El Usuario no podrá realizar ingeniería inversa, descompilar o intentar extraer el código fuente.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">8. MODIFICACIONES</h2>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos cambios significativos a través del correo electrónico asociado a la cuenta.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">9. LEY APLICABLE Y JURISDICCIÓN</h2>
                        <p>Para la interpretación y cumplimiento de los presentes términos, las partes se someten a las leyes y tribunales competentes de la ciudad de <strong>Santiago de Querétaro, México</strong>, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
