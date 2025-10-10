import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineTextArea } from '@/app/components/ui/InlineComponents';

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: DECLARACIONES DE ARRENDAMIENTO
// ------------------------------------------------------------------
export const BloqueDeclaracionesArrendamiento = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <h3 className="font-bold text-xl mb-3">I.- Declara &quot;El Arrendador&quot;:</h3>
                {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? (
                    <>
                        <p className="ml-4"><span className="font-bold">A)</span> Ser el único y legítimo propietario y/o poseedor del siguiente bien: <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.descripcion_bien === 'string' ? contratoActual.form_data.descripcion_bien : ''} onChange={handleChange('descripcion_bien')} placeholder="[Descripción completa del bien mueble]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, que en lo sucesivo se le denominará <span className="font-bold">EL BIEN MUEBLE</span>.</p>
                        <p className="ml-4"><span className="font-bold">B)</span> Que <span className="font-bold">EL BIEN MUEBLE</span> se encuentra libre de todo gravamen o limitación de dominio y al corriente de sus obligaciones legales.</p>
                        <p className="ml-4"><span className="font-bold">C)</span> Que <span className="font-bold">EL BIEN MUEBLE</span> se encuentra en perfectas condiciones de funcionamiento y sin vicios ocultos.</p>
                    </>
                ) : (
                    <>
                        <p className="ml-4"><span className="font-bold">A)</span> Ser el único y legítimo propietario del inmueble ubicado en <InlineInput value={typeof contratoActual?.form_data?.direccion === 'string' ? contratoActual.form_data.direccion : ''} onChange={handleChange('direccion')} placeholder="[Dirección completa del inmueble]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>, que en lo sucesivo se le denominará <span className="font-bold">EL BIEN INMUEBLE</span>.</p>
                        <p className="ml-4"><span className="font-bold">B)</span> Que <span className="font-bold">EL BIEN INMUEBLE</span> se encuentra al corriente en sus pagos de servicios (agua, electricidad, predial), y no tiene vicios ocultos.</p>
                        <p className="ml-4"><span className="font-bold">C)</span> Que <span className="font-bold">EL BIEN INMUEBLE</span> se encuentra en perfectas condiciones estructurales, estéticas y de pleno uso.</p>
                    </>
                )}
                <p className="ml-4"><span className="font-bold">D)</span> Que es su voluntad dar en arrendamiento el bien descrito.</p>
                <p className="ml-4"><span className="font-bold">E)</span> Que para efectos de este contrato, señala como domicilio para notificaciones el especificado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">II.- Declara &quot;El Arrendatario&quot;:</h3>
                <p className="ml-4"><span className="font-bold">A)</span> Contar con capacidad legal y económica para celebrar este contrato y cumplir con la obligación de pago.</p>
                <p className="ml-4"><span className="font-bold">B)</span> Que destinará el bien a un fin lícito.</p>
                <p className="ml-4"><span className="font-bold">C)</span> Que ha inspeccionado el bien a su entera satisfacción, recibiéndolo en óptimas condiciones.</p>
                <p className="ml-4"><span className="font-bold">D)</span> Que para efectos de este contrato, señala como domicilio para notificaciones el especificado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">III.- Declaran &quot;Ambas Partes&quot;:</h3>
                <p className="ml-4">Que en el presente contrato no existe error, dolo, mala fe o violencia, manifestando su plena voluntad de celebrarlo.</p>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: CLÁUSULAS DE ARRENDAMIENTO
// ------------------------------------------------------------------
export const BloqueClausulasArrendamiento = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    
    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        updateContratoFormData('valor_operacion', valor);
        
        if (valor && !isNaN(parseFloat(valor))) {
            import('@/app/lib/numberToWords').then(({ formatearValorEnLetras }) => {
                const valorEnLetras = formatearValorEnLetras(valor, 'MXN');
                updateContratoFormData('valor_en_letras', valorEnLetras);
            });
        }
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <p><span className="font-bold">PRIMERA.- OBJETO.</span> &quot;El Arrendador&quot; otorga el uso y goce temporal de <span className="font-bold">{(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? "EL BIEN MUEBLE" : "EL BIEN INMUEBLE"}</span> al &quot;Arrendatario&quot;, quien lo recibe para {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Inmueble" ? (<>fines exclusivos de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.uso_destinado === 'string' ? contratoActual.form_data.uso_destinado : ''} onChange={handleChange('uso_destinado')} placeholder="CASA HABITACIÓN" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span></>) : "los fines lícitos que convengan a sus intereses, comprometiéndose a darle el uso adecuado a su naturaleza"}.</p>
            </div>
            
            <div>
                <p><span className="font-bold">SEGUNDA.- VIGENCIA.</span> El presente contrato tendrá una duración forzosa de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.duracion === 'string' ? contratoActual.form_data.duracion : ''} onChange={handleChange('duracion')} placeholder="12 meses" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, iniciando el <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_inicio === 'string' ? contratoActual.form_data.fecha_inicio : ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> y terminando el <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_fin === 'string' ? contratoActual.form_data.fecha_fin : ''} onChange={handleChange('fecha_fin')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>. Si el arrendatario desea renovar, deberá notificarlo por escrito con 30 días naturales de anticipación.</p>
            </div>

            <div>
                <p><span className="font-bold">TERCERA.- ENTREGA DEL {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? "BIEN" : "INMUEBLE"}....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">CUARTA.- RENTA.</span> El arrendatario pagará al arrendador por concepto de renta mensual la cantidad de <span className="font-bold">${<InlineInput value={typeof contratoActual?.form_data?.valor_operacion === 'string' ? contratoActual.form_data.valor_operacion : ''} onChange={handleValorChange} placeholder="0.00" widthClass="" type="number" disabled={contratoActual?.status === 'finalizado'}/>} (<InlineInput value={typeof contratoActual?.form_data?.valor_en_letras === 'string' ? contratoActual.form_data.valor_en_letras : ''} onChange={handleChange('valor_en_letras')} placeholder="Cero pesos 00/100 M.N." widthClass="" disabled={contratoActual?.status === 'finalizado'}/>)</span>. El pago deberá realizarse por adelantado, en las <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fechas_pago === 'string' ? contratoActual.form_data.fechas_pago : ''} onChange={handleChange('fechas_pago')} placeholder="fechas establecidas" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, mediante <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.forma_pago === 'string' ? contratoActual.form_data.forma_pago : ''} onChange={handleChange('forma_pago')} placeholder="transferencia bancaria" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>: <InlineInput value={typeof contratoActual?.form_data?.lugar_pago === 'string' ? contratoActual.form_data.lugar_pago : ''} onChange={handleChange('lugar_pago')} placeholder="lugar de pago" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>.</p>
            </div>
            
            <div>
                <p><span className="font-bold">QUINTA.- DEPÓSITO EN GARANTÍA.</span> A la firma del contrato, &quot;El Arrendatario&quot; entrega a &quot;El Arrendador&quot; el equivalente a <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.deposito_garantia === 'string' ? contratoActual.form_data.deposito_garantia : ''} onChange={handleChange('deposito_garantia')} placeholder="1" widthClass="" type="number" disabled={contratoActual?.status === 'finalizado'}/></span> mes(es) de renta como depósito en garantía. Este depósito no se aplicará al pago de rentas y será devuelto dentro de los 45 días naturales posteriores a la devolución del bien, una vez liquidados los adeudos o reparaciones por mal uso.</p>
            </div>

            <div>
                <p><span className="font-bold">SEXTA.- DEVOLUCIÓN DEL {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? "BIEN MUEBLE" : "BIEN INMUEBLE"}....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SÉPTIMA.- USO Y CONSERVACIÓN....</span></p>
            </div>

            <div>
                <p><span className="font-bold">OCTAVA.- PENA CONVENCIONAL.</span></p>
                <p>a) Por terminación anticipada: <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.multa_terminacion_anticipada === 'string' ? contratoActual.form_data.multa_terminacion_anticipada : ''} onChange={handleChange('multa_terminacion_anticipada')} placeholder="20%" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>%</span> del total de las rentas restantes.</p>
                <p>b) Por falta de pago oportuno: Se generará un interés moratorio del <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.interes_moratorio_diario === 'string' ? contratoActual.form_data.interes_moratorio_diario : '1'} onChange={handleChange('interes_moratorio_diario')} placeholder="1" widthClass="" type="number" disabled={contratoActual?.status === 'finalizado'}/>%</span> diario sobre el monto de la renta no pagada.</p>
                
            </div>

            <div>
                <p><span className="font-bold">NOVENA.- SUBARRENDAMIENTO....</span></p>
            </div>

            {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Inmueble" && (
                <div>
                    <p><span className="font-bold">DÉCIMA.- SERVICIOS.</span> &quot;El Arrendatario&quot; se obliga a pagar puntualmente los servicios de agua, energía eléctrica, gas, y cualquier otro que contrate (internet, telefonía, etc.), debiendo entregar los recibos liquidados al arrendador.</p>
                </div>
            )}

            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- RESCISIÓN.</span> Será motivo de rescisión del presente contrato, sin necesidad de declaración judicial las siguientes causas:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>El incumplimiento de cualquiera de las cláusulas pactadas en el presente contrato.</li>
                    <li>La falsedad hecha con dolo, mala fe en cualquiera de las declaraciones vertidas por <span className="font-bold">EL ARRENDATARIO</span>.</li>
                    {(typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : '') && 
                        (typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.clausula_resolucion_adicional === 'string' ? contratoActual.form_data.clausula_resolucion_adicional : ''} onChange={handleTextAreaChange('clausula_resolucion_adicional')} placeholder="Agregar causas adicionales de rescisión (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SEGUNDA.- OBLIGACIONES DEL ARRENDATARIO.</span> <span className="font-bold">EL ARRENDATARIO</span> se compromete durante la vigencia del presente contrato a:</p>
                <ul className="list-disc ml-6">
                    <li>Realizar el pago de la renta en los plazos establecidos.</li>
                    <li>Conservar en buen estado {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? "EL BIEN MUEBLE" : "EL BIEN INMUEBLE"} y devolverlo en las mismas condiciones en que lo recibió.</li>
                    <li>No realizar modificaciones sin la autorización por escrito de <span className="font-bold">EL ARRENDADOR</span>.</li>
                    {(typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : ''} onChange={handleTextAreaChange('obligaciones_interesado_adicionales')} placeholder="Agregar obligaciones adicionales del arrendatario (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA TERCERA.- OBLIGACIONES DEL ARRENDADOR.</span> <span className="font-bold">EL ARRENDADOR</span> se compromete durante la vigencia del presente contrato a:</p>
                <ul className="list-disc ml-6">
                    <li>Entregar {(typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '') === "Mueble" ? "EL BIEN MUEBLE" : "EL BIEN INMUEBLE"} en condiciones adecuadas para su uso.</li>
                    <li>Garantizar el uso pacífico durante la vigencia del contrato.</li>
                    <li>Responder de los daños y perjuicios por defectos o vicios ocultos.</li>
                    {(typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : ''} onChange={handleTextAreaChange('obligaciones_propietario_adicionales')} placeholder="Agregar obligaciones adicionales del arrendador (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA CUARTA.- JURISDICCIÓN.</span> Para la interpretación y cumplimiento de este contrato, las partes se someten a la legislación aplicable y a la jurisdicción de los tribunales competentes de la ciudad de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.ciudad_jurisdiccion === 'string' ? contratoActual.form_data.ciudad_jurisdiccion : ''} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Querétaro, Querétaro" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>.</p>
            </div>

            {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '') && (
                <div>
                    <p><span className="font-bold">DÉCIMA QUINTA.- CLÁUSULAS ADICIONALES.</span></p>
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