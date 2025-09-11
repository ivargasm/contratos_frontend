import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineTextArea } from '@/app/components/ui/InlineComponents';

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: DECLARACIONES DE COMPRA-VENTA
// ------------------------------------------------------------------
export const BloqueDeclaracionesCompraVenta = () => {
    const { formData, updateFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <h3 className="font-bold text-xl mb-3">I.- Declara &quot;El Vendedor&quot;:</h3>
                <p className="ml-4">A) Ser persona física/moral, mayor de edad, con plena capacidad jurídica para celebrar el presente acto.</p>
                {formData.tipo_bien === "Mueble" ? (
                    <>
                        <p className="ml-4">
                            B) Ser el único y legítimo propietario del bien mueble que se describe a continuación:{' '}
                            <InlineInput value={formData.descripcion_bien || ''} onChange={handleChange('descripcion_bien')} placeholder="Marca, modelo, serie, etc." widthClass="w-full"/>, 
                            al que en lo sucesivo se le denominará **&quot;EL BIEN&quot;**.
                        </p>
                        <p className="ml-4">
                            C) **&quot;EL BIEN&quot;** se encuentra libre de todo gravamen, adeudo, limitación de dominio y al corriente de sus obligaciones fiscales (ej. tenencias).
                        </p>
                    </>
                ) : (
                    <>
                        <p className="ml-4">
                            B) Ser el único y legítimo propietario del bien inmueble ubicado en{' '}
                            <InlineInput value={formData.direccion_entrega || ''} onChange={handleChange('direccion_entrega')} placeholder="Dirección completa del inmueble" widthClass="w-full"/>, 
                            con folio real/escritura pública número 
                            <InlineInput value={formData.folio_real || ''} onChange={handleChange('folio_real')} placeholder="Folio real o número de escritura" widthClass="w-48"/>, 
                            inscrito en el Registro Público de la Propiedad bajo el número 
                            <InlineInput value={formData.registro_publico || ''} onChange={handleChange('registro_publico')} placeholder="Número de registro" widthClass="w-48"/>, 
                            al que en lo sucesivo se le denominará **&quot;EL BIEN&quot;**.
                        </p>
                        <p className="ml-4">
                            C) **&quot;EL BIEN&quot;** se encuentra libre de todo gravamen, adeudo, limitación de dominio y al corriente en el pago del impuesto predial y servicios.
                        </p>
                    </>
                )}
                 <p className="ml-4">D) Que es su voluntad transferir la propiedad de **&quot;EL BIEN&quot;** a &quot;EL COMPRADOR&quot; en los términos y condiciones que aquí se establecen.</p>
            </div>
            <div>
                <h3 className="font-bold text-xl mb-3">II.- Declara &quot;El Comprador&quot;:</h3>
                <p className="ml-4">A) Ser persona física/moral, con plena capacidad jurídica y económica para adquirir **&quot;EL BIEN&quot;** y cumplir con las obligaciones de este contrato.</p>
                <p className="ml-4">B) Que conoce el estado físico y jurídico de **&quot;EL BIEN&quot;**, habiéndolo inspeccionado a su entera satisfacción.</p>
                <p className="ml-4">C) Que es su voluntad adquirir **&quot;EL BIEN&quot;** en los términos y condiciones pactados en este instrumento.</p>
            </div>
            <div>
                <h3 className="font-bold text-xl mb-3">III.- Declaran &quot;Ambas Partes&quot;:</h3>
                <p className="ml-4">Que en la celebración del presente contrato no existe dolo, error, mala fe, ni vicio alguno del consentimiento que pudiera invalidarlo, y lo celebran de manera libre y voluntaria.</p>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: CLÁUSULAS DE COMPRA-VENTA
// ------------------------------------------------------------------
export const BloqueClausulasCompraVenta = () => {
    const { formData, updateFormData } = useContratoStore();
    
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(key, e.target.value);
    };
    
    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData(key, e.target.value);
    };
    
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        updateFormData('valor_operacion', valor);
        
        // Auto-generar valor en letras
        if (valor && !isNaN(parseFloat(valor))) {
            import('@/app/lib/numberToWords').then(({ formatearValorEnLetras }) => {
                const valorEnLetras = formatearValorEnLetras(valor, 'MXN');
                updateFormData('valor_en_letras', valorEnLetras);
            });
        }
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <p><span className="font-bold">PRIMERA.- OBJETO.</span> &quot;EL VENDEDOR&quot; vende y transfiere a &quot;EL COMPRADOR&quot;, quien adquiere para sí, <span className="font-bold">EL BIEN</span> descrito:</p>
                <p><span className="font-bold">Descripción del bien:</span> <InlineInput value={formData.descripcion_bien || ''} onChange={handleChange('descripcion_bien')} placeholder="Automovi, Casa, Departamento" widthClass="w-full"/></p>
                <p><span className="font-bold">Estado del bien:</span> <InlineInput value={formData.estado_bien || ''} onChange={handleChange('estado_bien')} placeholder="Nuevo, Usado, etc." widthClass="w-full"/></p>
                <p>EL COMPRADOR acepta adquirir dicho bien en las condiciones pactadas en el presente contrato.</p>
            </div>
            
            <div>
                <p><span className="font-bold">SEGUNDA.- PRECIO Y FORMA DE PAGO.</span> El precio total de la presente operación es la cantidad de <span className="font-bold">${<InlineInput value={formData.valor_operacion || ''} onChange={handleValorChange} placeholder="0.00" widthClass="w-32" type="number"/>} (<InlineInput value={formData.valor_en_letras || ''} onChange={handleChange('valor_en_letras')} placeholder="Cero pesos 00/100 M.N." widthClass="w-96"/>)</span>.</p>
                <p>EL COMPRADOR se obliga a pagar dicho precio de la siguiente forma:</p>
                <p><span className="font-bold">Forma de pago:</span> <InlineInput value={formData.forma_pago || ''} onChange={handleChange('forma_pago')} placeholder="________________" widthClass="w-64"/></p>
                <p><span className="font-bold">Fecha(s) de pago:</span> <InlineInput value={formData.fechas_pago || ''} onChange={handleChange('fechas_pago')} placeholder="________________" widthClass="w-64"/></p>
                <p><span className="font-bold">Lugar de pago:</span> <InlineInput value={formData.lugar_pago || ''} onChange={handleChange('lugar_pago')} placeholder="________________" widthClass="w-64"/></p>
            </div>
            
            <div>
                <p><span className="font-bold">TERCERA.- ENTREGA Y RECEPCIÓN....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">CUARTA.- RESERVA DE DOMINIO....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">QUINTA.- SANEAMIENTO PARA EL CASO DE EVICCIÓN Y VICIOS OCULTOS....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">SEXTA.- PENA CONVENCIONAL.</span> En caso de incumplimiento de cualquiera de las obligaciones estipuladas en este contrato por alguna de las partes, la parte infractora se hará acreedora a una pena convencional equivalente al <span className="font-bold"><InlineInput value={formData.pena_porcentaje || ''} onChange={handleChange('pena_porcentaje')} placeholder="20" widthClass="w-16" type="number"/>%</span> del valor total de la operación, sin perjuicio de que la parte afectada pueda exigir el cumplimiento forzoso del contrato o su rescisión.</p>
            </div>
            
            <div>
                <p><span className="font-bold">SÉPTIMA.- RESCISIÓN.</span> Serán causas de rescisión del presente contrato, imputables a &quot;EL COMPRADOR&quot;, el incumplimiento en el pago del precio; y será causa de rescisión imputable a &quot;EL VENDEDOR&quot;, la no entrega de <span className="font-bold">EL BIEN</span> en la fecha pactada, o si <span className="font-bold">EL BIEN</span> presentara gravámenes o limitaciones de dominio no declarados.</p>
                {formData.clausula_resolucion_adicional && (
                    <div className="mt-2">
                        <p className="font-bold">Causas adicionales de rescisión:</p>
                        <ul className="list-disc ml-6">
                            {formData.clausula_resolucion_adicional.split('\n').map((item, index) => (
                                item.trim() && <li key={index}>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <InlineTextArea value={formData.clausula_resolucion_adicional || ''} onChange={handleTextAreaChange('clausula_resolucion_adicional')} placeholder="Agregar causas adicionales de rescisión (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">OCTAVA.- GASTOS Y HONORARIOS.</span> Todos los gastos, impuestos, derechos y honorarios que se generen con motivo de la escrituración y/o registro de la presente compraventa, serán cubiertos en su totalidad por <span className="font-bold"><InlineInput value={formData.quien_paga_gastos || 'El Comprador'} onChange={handleChange('quien_paga_gastos')} placeholder='"EL COMPRADOR"' widthClass="w-48"/></span>, salvo pacto en contrario.</p>
            </div>
            
            <div>
                <p><span className="font-bold">NOVENA.- PREVENCIÓN DE LAVADO DE DINERO....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA.- CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- JURISDICCIÓN Y LEY APLICABLE.</span> Para todo lo relacionado con la interpretación y cumplimiento de este contrato, las partes se someten a las leyes aplicables y a la jurisdicción de los tribunales competentes de la ciudad de <span className="font-bold"><InlineInput value={formData.ciudad_jurisdiccion || ''} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Santiago de Querétaro, Querétaro" widthClass="w-80"/></span>, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA SEGUNDA.- GARANTÍAS</span></p>
                <p>EL VENDEDOR garantiza que el bien objeto de este contrato está libre de todo gravamen, carga o limitación, y que tiene plena propiedad sobre el mismo para efectuar la presente venta.</p>
                <p>En caso de vicios ocultos, EL VENDEDOR responderá según la legislación aplicable.</p>
                {formData.garantias_adicionales && (
                    <ul className="list-disc ml-6 mt-2">
                        {formData.garantias_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                )}
                <InlineTextArea value={formData.garantias_adicionales || ''} onChange={handleTextAreaChange('garantias_adicionales')} placeholder="Agregar garantías adicionales (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA TERCERA.- OBLIGACIONES DEL COMPRADOR.</span> EL COMPRADOR se compromete a:</p>
                <ul className="list-disc ml-6">
                    <li>Pagar el precio en los términos acordados.</li>
                    <li>Recibir el bien en la fecha y lugar establecidos.</li>
                    <li>Cubrir los gastos de transferencia o notariales si así se pactó.</li>
                    {formData.obligaciones_interesado_adicionales && 
                        formData.obligaciones_interesado_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={formData.obligaciones_interesado_adicionales || ''} onChange={handleTextAreaChange('obligaciones_interesado_adicionales')} placeholder="Agregar obligaciones adicionales del comprador (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">DÉCIMA CUARTA.- OBLIGACIONES DEL VENDEDOR.</span> EL VENDEDOR se obliga a:</p>
                <ul className="list-disc ml-6">
                    <li>Entregar el bien en las condiciones pactadas.</li>
                    <li>Proporcionar toda la documentación necesaria (facturas, títulos, manuales, etc.).</li>
                    <li>Responder por la evicción y el saneamiento conforme a la ley.</li>
                    {formData.obligaciones_propietario_adicionales && 
                        formData.obligaciones_propietario_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={formData.obligaciones_propietario_adicionales || ''} onChange={handleTextAreaChange('obligaciones_propietario_adicionales')} placeholder="Agregar obligaciones adicionales del vendedor (una por línea)" rows={3}/>
            </div>
            
            {formData.clausulas_adicionales && (
                <div>
                    <p><span className="font-bold">DÉCIMA QUINTA.- CLÁUSULAS ADICIONALES.</span></p>
                    <ul className="list-disc ml-6">
                        {formData.clausulas_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <p><span className="font-bold">Cláusulas Adicionales:</span></p>
                <InlineTextArea value={formData.clausulas_adicionales || ''} onChange={handleTextAreaChange('clausulas_adicionales')} placeholder="Agregar cláusulas adicionales (una por línea)" rows={4}/>
            </div>
        </div>
    );
};
