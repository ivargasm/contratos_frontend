import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineTextArea } from '@/app/components/ui/InlineComponents';

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: DECLARACIONES DE COMODATO
// ------------------------------------------------------------------
export const BloqueDeclaracionesComodato = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <h3 className="font-bold text-xl mb-3">I.- Declara &quot;El Comodante&quot;:</h3>
                {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? (
                    <>
                        <p className="ml-4"><span className="font-bold">A)</span> Ser el legítimo propietario del bien mueble: <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.descripcion_bien === 'string' ? contratoActual.form_data.descripcion_bien : ''} onChange={handleChange('descripcion_bien')} placeholder="[Descripción del bien mueble]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, que en lo sucesivo se denominará <span className="font-bold">EL BIEN MUEBLE</span>.</p>
                        <p className="ml-4"><span className="font-bold">B)</span> Que EL BIEN MUEBLE se encuentra libre de gravamen, en buenas condiciones, y sin vicios ocultos.</p>
                    </>
                ) : (
                    <>
                        <p className="ml-4"><span className="font-bold">A)</span> Ser el propietario del inmueble ubicado en <InlineInput value={typeof contratoActual?.form_data?.direccion === 'string' ? contratoActual.form_data.direccion : ''} onChange={handleChange('direccion')} placeholder="[Dirección completa del inmueble]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>, que en lo sucesivo se denominará <span className="font-bold">EL BIEN INMUEBLE</span>.</p>
                        <p className="ml-4"><span className="font-bold">B)</span> Que EL BIEN INMUEBLE se encuentra al corriente en pagos de servicios y libre de vicios ocultos.</p>
                        <p className="ml-4"><span className="font-bold">C)</span> Que se encuentra en óptimas condiciones de uso y conservación.</p>
                    </>
                )}
                <p className="ml-4"><span className="font-bold">D)</span> Que es su voluntad otorgar en comodato el bien referido.</p>
                <p className="ml-4"><span className="font-bold">E)</span> Que para efectos legales, señala como domicilio el indicado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">II.- Declara &quot;El Comodatario&quot;:</h3>
                <p className="ml-4"><span className="font-bold">A)</span> Contar con capacidad legal para celebrar este contrato.</p>
                <p className="ml-4"><span className="font-bold">B)</span> Que destinará el bien a un uso lícito y conforme a su naturaleza.</p>
                <p className="ml-4"><span className="font-bold">C)</span> Que ha inspeccionado el bien, lo encuentra en buen estado y lo recibe a su satisfacción.</p>
                <p className="ml-4"><span className="font-bold">D)</span> Que para efectos legales, señala como domicilio el indicado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">III.- Declaran ambas partes:</h3>
                <p className="ml-4">Que celebran el presente contrato de manera libre, sin error, dolo o violencia, y que reconocen mutuamente su capacidad jurídica.</p>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: CLÁUSULAS DE COMODATO
// ------------------------------------------------------------------
export const BloqueClausulasComodato = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    
    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <p><span className="font-bold">PRIMERA.- OBJETO.</span> &quot;El COMODANTE&quot; da en COMODATO al &quot;COMODATARIO&quot; el bien descrito como:</p>
                <div className="bg-muted p-4 rounded-md mt-2 space-y-2">
                    <p><span className="font-bold">Descripción:</span> <InlineInput value={typeof contratoActual?.form_data?.descripcion_bien === 'string' ? contratoActual.form_data.descripcion_bien : ''} onChange={handleChange('descripcion_bien')} placeholder="________________" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></p>
                    <p><span className="font-bold">Accesorios incluidos:</span> <InlineInput value={typeof contratoActual?.form_data?.accesorios === 'string' ? contratoActual.form_data.accesorios : ''} onChange={handleChange('accesorios')} placeholder="________________" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></p>
                    <p><span className="font-bold">Estado actual:</span> <InlineInput value={typeof contratoActual?.form_data?.estado_bien === 'string' ? contratoActual.form_data.estado_bien : ''} onChange={handleChange('estado_bien')} placeholder="________________" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></p>
                </div>
                <p className="mt-2">El bien será utilizado exclusivamente para: <InlineInput value={typeof contratoActual?.form_data?.uso_destinado === 'string' ? contratoActual.form_data.uso_destinado : ''} onChange={handleChange('uso_destinado')} placeholder="________________" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></p>
            </div>
            
            <div>
                <p><span className="font-bold">SEGUNDA.- VIGENCIA.</span> El presente contrato de COMODATO tendrá una duración determinada del día <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_inicio === 'string' ? contratoActual.form_data.fecha_inicio : ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> al día <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_fin === 'string' ? contratoActual.form_data.fecha_fin : ''} onChange={handleChange('fecha_fin')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, o en su caso será de carácter <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.tipo_vigencia === 'string' ? contratoActual.form_data.tipo_vigencia : ''} onChange={handleChange('tipo_vigencia')} placeholder="vitalicio" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, conforme a lo pactado por las partes.</p>
            </div>

            <div>
                <p><span className="font-bold">TERCERA.- ENTREGA DEL BIEN....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">CUARTA.- MODIFICACIONES Y MEJORAS....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">QUINTA.- RENUNCIA A INDEMNIZACIÓN....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SEXTA.- DEVOLUCIÓN DEL BIEN....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SÉPTIMA.- CARÁCTER GRATUITO....</span></p>
            </div>

            <div>
                <p><span className="font-bold">OCTAVA.- ADAPTACIONES....</span></p>
            </div>

            <div>
                <p><span className="font-bold">NOVENA.- OBLIGACIONES DEL COMODATARIO.</span> EL COMODATARIO se compromete a:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Responder por cualquier daño al bien derivado de su culpa, negligencia o de terceros autorizados.</li>
                    <li>Pagar puntualmente los servicios utilizados como agua, electricidad, gas, internet, etc.</li>
                    <li>No ceder, arrendar o subarrendar ni conceder derechos sobre el bien sin autorización escrita del COMODANTE.</li>
                    <li>Realizar reparaciones de mantenimiento por su cuenta.</li>
                    <li>No almacenar ni manejar sustancias peligrosas dentro del bien.</li>
                    <li>Asumir responsabilidad por la seguridad de los bienes que introduzca en el bien.</li>
                    <li>Pagar el predial del inmueble dado en COMODATO (si aplica).</li>
                    {(typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : ''} onChange={handleTextAreaChange('obligaciones_interesado_adicionales')} placeholder="Agregar obligaciones adicionales del comodatario (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA.- OBLIGACIONES DEL COMODANTE.</span> EL COMODANTE se obliga a:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>No interferir con el uso del bien salvo por reparaciones urgentes.</li>
                    <li>Garantizar el uso y goce pacífico del bien.</li>
                    <li>No será responsable por el daño, seguridad o pérdida de los bienes introducidos por el COMODATARIO.</li>
                    {(typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : ''} onChange={handleTextAreaChange('obligaciones_propietario_adicionales')} placeholder="Agregar obligaciones adicionales del comodante (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- RESPONSABILIDAD POR DAÑOS....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SEGUNDA.- CESIÓN....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA TERCERA.- CONTRIBUCIONES Y SERVICIOS....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA CUARTA.- RESCISIÓN.</span> Será causa de rescisión sin necesidad de declaración judicial:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>El incumplimiento de las obligaciones pactadas en este contrato.</li>
                    <li>El comodante podrá exigir la devolución de la cosa antes de que termine el plazo o uso convenidos, sobreviniéndole necesidad urgente de ella.</li>
                    <li>Probando que hay peligro de que ésta perezca si continúa en poder del comodatario.</li>
                    <li>Si el COMODATARIO ha autorizado a un tercero a servirse de la cosa, sin consentimiento del comodante.</li>
                    <li>El uso indebido del bien, incluyendo su uso para actividades ilícitas.</li>
                    <li>La falta de pago de servicios o contribuciones a cargo del COMODATARIO.</li>
                    <li>La realización de modificaciones no autorizadas al bien.</li>
                    {(typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : '') && 
                        (typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : ''} onChange={handleTextAreaChange('clausula_resolucion_adicional')} placeholder="Agregar causas adicionales de rescisión (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA QUINTA.- NOTIFICACIONES....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SEXTA.- AVISO DE PRIVACIDAD Y CONFIDENCIALIDAD....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SÉPTIMA.- PREVENCIÓN E IDENTIFICACIÓN DE OPERACIONES CON RECURSOS DE PROCEDENCIA ILÍCITA....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA OCTAVA.- JURISDICCIÓN.</span> Para la interpretación y cumplimiento de este contrato, las partes se someten a la legislación aplicable y a la jurisdicción de los tribunales competentes de la ciudad de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.ciudad_jurisdiccion === 'string' ? contratoActual.form_data.ciudad_jurisdiccion : ''} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Querétaro, Querétaro" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>.</p>
            </div>

            {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '') && (
                <div>
                    <p><span className="font-bold">DÉCIMA NOVENA.- CLÁUSULAS ADICIONALES.</span></p>
                    <ul className="list-disc ml-6">
                        {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <p><span className="font-bold">Cláusulas Adicionales:</span></p>
                <InlineTextArea value={typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : ''} onChange={handleTextAreaChange('clausulas_adicionales')} placeholder="Agregar cláusulas adicionales (una por línea)" rows={4}/>
            </div>
        </div>
    );
};