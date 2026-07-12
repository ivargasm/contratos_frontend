import { Footer } from "../components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pt-24">
            <div className="max-w-4xl mx-auto py-12 px-6 sm:px-12 text-gray-800 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-2">AVISO DE PRIVACIDAD INTEGRAL</h1>
                <p className="text-sm text-gray-500 mb-8">Fecha de última actualización: 02 de febrero de 2026.</p>

                <div className="space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE</h2>
                        <p>EasyContract (en adelante, &quot;El Responsable&quot;), con domicilio fiscal ubicado en la ciudad de <strong>Santiago de Querétaro, Querétaro, México</strong>, es el responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. DATOS PERSONALES QUE RECABAMOS</h2>
                        <p>Para llevar a cabo las finalidades descritas en el presente Aviso de Privacidad, utilizaremos las siguientes categorías de datos personales:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Datos de Identificación:</strong> Nombre completo, nombre de usuario.</li>
                            <li><strong>Datos de Contacto:</strong> Correo electrónico.</li>
                            <li><strong>Datos Laborales:</strong> Puesto o empresa (opcional, si aplica para facturación).</li>
                            <li><strong>Metadatos para Firma Electrónica:</strong> Direcciones IP, User Agent (navegador/dispositivo) y correos electrónicos de terceros firmantes, recolectados estrictamente para generar la hoja de auditoría y enviar las invitaciones correspondientes.</li>
                            <li><strong>Datos Patrimoniales y Financieros:</strong> Información necesaria para el procesamiento de pagos.
                                <ul className="list-circle pl-5 mt-1">
                                    <li><em>Nota: El Responsable NO almacena números completos de tarjetas de crédito/débito ni códigos de seguridad (CVV). Estos son procesados directamente por la pasarela de pagos (ver numeral 5). Nosotros solo conservamos referencias (tokens), los últimos 4 dígitos de la tarjeta y el historial de transacciones.</em></li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mt-4"><strong>Sobre los Archivos Cargados (Data Files):</strong> La información contenida dentro de los archivos (CSV, Excel, JSON) que usted carga a la plataforma para su procesamiento en masa no se considera dato personal recabado por El Responsable para fines de propiedad, sino información confiada temporalmente para la prestación del servicio de cómputo. Usted mantiene la titularidad y responsabilidad legal sobre el contenido de dichos archivos.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. DATOS SENSIBLES</h2>
                        <p>El Responsable NO solicita datos personales sensibles (como origen racial, salud, creencias religiosas, afiliación política, etc.) para el uso de la plataforma. Se advierte al Usuario que <strong>no debe cargar archivos que contengan datos sensibles</strong> de terceros sin contar con las debidas medidas de seguridad, encriptación y consentimientos legales previos. El Usuario asume total responsabilidad si incumple esta disposición.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. FINALIDADES DEL TRATAMIENTO</h2>
                        <p>Los datos personales que recabamos de usted los utilizaremos para las siguientes finalidades:</p>
                        <div className="mt-2">
                            <p className="font-semibold">A. Finalidades Primarias (Necesarias para el servicio):</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Verificar y confirmar su identidad para crear su cuenta de usuario.</li>
                                <li>Procesar la información capturada en los formularios inteligentes para la compilación y generación automatizada de los documentos legales.</li>
                                <li>Gestionar los flujos de <strong>Firma Electrónica</strong> (envío de correos a firmantes y generación de sellos criptográficos).</li>
                                <li>Procesar los pagos y la facturación de las suscripciones correspondientes.</li>
                                <li>Envío de los documentos generados al correo electrónico del usuario o habilitar su descarga.</li>
                                <li>Atender solicitudes de soporte técnico.</li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold">B. Finalidades Secundarias (Opcionales):</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Envío de boletines informativos, actualizaciones del sistema o promociones.</li>
                                <li>Análisis estadístico anonimizado para mejorar nuestros algoritmos de recomendación.</li>
                            </ul>
                        </div>
                        <p className="mt-2">En caso de que no desee que sus datos personales sean tratados para estos fines secundarios, usted puede presentar desde este momento un escrito vía correo electrónico a <strong>contacto@easycontract.com.mx</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">5. TRANSFERENCIAS DE DATOS Y PROCESAMIENTO DE PAGOS</h2>
                        <p>Sus datos personales pueden ser transferidos y tratados dentro y fuera del país por personas distintas a El Responsable. En ese sentido, su información puede ser compartida con:</p>
                        <ol className="list-decimal pl-5 space-y-2 mt-2">
                            <li><strong>Autoridades competentes:</strong> En los casos legalmente previstos por la Ley.</li>
                            <li><strong>Proveedores de Infraestructura:</strong> Servicios de alojamiento en la nube (como Vercel, AWS o Google Cloud) necesarios para la operación técnica y almacenamiento de los contratos.</li>
                            <li><strong>Stripe, Inc. (Pasarela de Pagos):</strong> Para procesar los pagos dentro de la plataforma. El Responsable NO tiene acceso a su número completo de tarjeta ni CVV. Únicamente compartimos los metadatos necesarios para vincular el pago. Al realizar un pago, usted consiente expresamente esta transferencia.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">6. SEGURIDAD Y RETENCIÓN DE DATOS (CLÁUSULA TÉCNICA)</h2>
                        <p>Para proteger la información contenida en los formularios y documentos generados:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Encriptación:</strong> Los datos se transmiten mediante protocolos seguros (SSL/TLS).</li>
                            <li><strong>Automatización:</strong> El procesamiento es realizado por algoritmos; no existe intervención humana en la lectura de sus contratos, salvo por orden judicial o soporte técnico expreso.</li>
                            <li><strong>Retención Diferenciada:</strong>
                                <ul className="list-circle pl-5 mt-1">
                                    <li><em>Borradores:</em> Los documentos de sesión se mantienen en almacenamiento temporal por <strong>72 HORAS</strong> y luego son eliminados.</li>
                                    <li><em>Contratos Firmados Electrónicamente:</em> Los documentos finalizados con firmas electrónicas se conservan en nuestra bóveda (AWS S3) para mantener su registro legal e integridad mediante hashes criptográficos a lo largo del tiempo.</li>
                                </ul>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">7. DERECHOS ARCO</h2>
                        <p>Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (<strong>Rectificación</strong>); que la eliminemos de nuestros registros o bases de datos (<strong>Cancelación</strong>); así como oponerse al uso de sus datos personales para fines específicos (<strong>Oposición</strong>).</p>
                        <p className="mt-2">Para ejercer cualquiera de los derechos ARCO, deberá presentar la solicitud respectiva a través del correo electrónico: <strong>contacto@easycontract.com.mx</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">8. USO DE COOKIES Y TECNOLOGÍAS DE RASTREO</h2>
                        <p>Le informamos que en nuestra página de Internet utilizamos cookies, web beacons y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de Internet, con el fin de brindarle un mejor servicio y experiencia de usuario (ej. mantener su sesión iniciada, recordar su preferencia de modo oscuro/claro).</p>
                        <p className="mt-2">Los datos personales que obtenemos son: identificadores, nombre de usuario y preferencias de visualización. Estas tecnologías pueden deshabilitarse en la configuración de su navegador.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">9. CAMBIOS AL AVISO DE PRIVACIDAD</h2>
                        <p>El presente aviso de privacidad puede sufrir modificaciones derivadas de nuevos requerimientos legales, necesidades propias, prácticas de privacidad o cambios en nuestro modelo de negocio. Nos comprometemos a mantenerlo informado sobre los cambios a través de notificaciones en el <strong>DASHBOARD</strong>.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
