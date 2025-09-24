import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineTextArea } from '@/app/components/ui/InlineComponents';

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: DECLARACIONES DE PRESTACIÓN DE SERVICIOS
// ------------------------------------------------------------------
export const BloqueDeclaracionesPrestacionServicios = () => {
    
    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <h3 className="font-bold text-xl mb-3">I.- Declara &quot;EL PRESTADOR&quot;:</h3>
                <p className="ml-4"><span className="font-bold">A)</span> Ser una persona física/moral con plena capacidad jurídica y fiscal para obligarse en los términos de este contrato.</p>
                <p className="ml-4"><span className="font-bold">B)</span> Contar con los conocimientos, la experiencia, el personal y los recursos técnicos y materiales necesarios para prestar los servicios profesionales objeto de este contrato con la más alta calidad.</p>
                <p className="ml-4"><span className="font-bold">C)</span> Estar inscrito en el Registro Federal de Contribuyentes y tener la capacidad de expedir los comprobantes fiscales digitales (CFDI) correspondientes por los servicios prestados.</p>
                <p className="ml-4"><span className="font-bold">D)</span> Que es su voluntad celebrar el presente contrato para prestar los servicios solicitados por &quot;EL CLIENTE&quot;.</p>
                <p className="ml-4"><span className="font-bold">E)</span> Que para los efectos de este contrato, señala como su domicilio el indicado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">II.- Declara &quot;EL CLIENTE&quot;:</h3>
                <p className="ml-4"><span className="font-bold">A)</span> Ser una persona física/moral con plena capacidad jurídica para contratar y obligarse en los términos del presente instrumento.</p>
                <p className="ml-4"><span className="font-bold">B)</span> Que requiere los servicios profesionales de &quot;EL PRESTADOR&quot; para los fines que a sus intereses convienen.</p>
                <p className="ml-4"><span className="font-bold">C)</span> Que cuenta con la solvencia y los recursos económicos necesarios para cubrir los honorarios pactados en este contrato.</p>
                <p className="ml-4"><span className="font-bold">D)</span> Que es su voluntad celebrar el presente contrato y recibir los servicios de &quot;EL PRESTADOR&quot;.</p>
                <p className="ml-4"><span className="font-bold">E)</span> Que para los efectos de este contrato, señala como su domicilio el indicado en la sección de &quot;REUNIDOS&quot;.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-xl mb-3">III.- Declaran &quot;Ambas Partes&quot;:</h3>
                <p className="ml-4">Que se reconocen mutuamente la personalidad y capacidad con la que comparecen, y que en la celebración de este contrato no existe error, dolo, mala fe, violencia o vicio alguno del consentimiento, por lo que lo celebran de manera libre y voluntaria.</p>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: CLÁUSULAS DE PRESTACIÓN DE SERVICIOS
// ------------------------------------------------------------------
export const BloqueClausulasPrestacionServicios = () => {
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
                <p><span className="font-bold">PRIMERA.- OBJETO.</span> &quot;EL PRESTADOR&quot; se obliga a prestar a &quot;EL CLIENTE&quot; los servicios profesionales consistentes en:</p>
                <div className="bg-muted p-4 rounded-md mt-2">
                    <InlineTextArea 
                        value={formData.servicios_descripcion || ''} 
                        onChange={handleTextAreaChange('servicios_descripcion')} 
                        placeholder="[Descripción detallada de los servicios a prestar. Ej: desarrollo de software, consultoría contable, diseño de campaña de marketing, etc.]" 
                        rows={4}
                    />
                </div>
                <p className="mt-2">Los servicios se llevarán a cabo con la debida diligencia y ética profesional.</p>
            </div>
            
            <div>
                <p><span className="font-bold">SEGUNDA.- HONORARIOS Y FORMA DE PAGO.</span> Por los servicios objeto de este contrato, &quot;EL CLIENTE&quot; se obliga a pagar a &quot;EL PRESTADOR&quot; la cantidad total de <span className="font-bold">${<InlineInput value={formData.valor_operacion || ''} onChange={handleValorChange} placeholder="0.00" widthClass="" type="number"/>} (<InlineInput value={formData.valor_en_letras || ''} onChange={handleChange('valor_en_letras')} placeholder="Cero pesos 00/100 M.N." widthClass=""/>)</span>, más el Impuesto al Valor Agregado (IVA) correspondiente.</p>
                <p className="mt-2">Dicha cantidad será cubierta de la siguiente manera: <span className="font-bold"><InlineInput value={formData.forma_pago || ''} onChange={handleChange('forma_pago')} placeholder="50% de anticipo y 50% a la entrega final del proyecto." widthClass=""/></span>.</p>
                <p className="mt-2">El pago se realizará en el siguiente lugar y forma: <span className="font-bold"><InlineInput value={formData.lugar_pago || ''} onChange={handleChange('lugar_pago')} placeholder="Cuenta bancaria, cheque o efectivo en las oficinas de 'EL PRESTADOR'." widthClass=""/></span>.</p>
                <p className="mt-2">El pago se efectuará en la fecha estimada: <span className="font-bold"><InlineInput value={formData.fechas_pago || ''} onChange={handleChange('fechas_pago')} placeholder="5 días hábiles" widthClass=""/></span> después de la firma del contrato o según lo acordado entre las partes.</p>
                <p className="mt-2">El pago está condicionado a la entrega por parte de &quot;EL PRESTADOR&quot; del Comprobante Fiscal Digital por Internet (CFDI) que cumpla con todos los requisitos fiscales vigentes.</p>
            </div>

            <div>
                <p><span className="font-bold">TERCERA.- VIGENCIA.</span> El presente contrato tendrá una vigencia de: <InlineInput value={formData.duracion || ''} onChange={handleChange('duracion')} placeholder="[Duración del contrato]" widthClass=""/> a partir del <span className="font-bold"><InlineInput value={formData.fecha_inicio || ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass=""/></span> y hasta el <span className="font-bold"><InlineInput value={formData.fecha_fin || ''} onChange={handleChange('fecha_fin')} placeholder="[Día de Mes de Año]" widthClass=""/></span>, o hasta la conclusión satisfactoria de los servicios, lo que ocurra primero. Cualquier renovación o extensión deberá constar por escrito.</p>
            </div>
            
            <div>
                <p><span className="font-bold">CUARTA.- OBLIGACIONES DE &quot;EL PRESTADOR&quot;.</span> &quot;EL PRESTADOR&quot; se obliga a:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Realizar los servicios descritos en la Cláusula Primera con la pericia y calidad profesional requerida.</li>
                    <li>No divulgar a terceros la información confidencial de &quot;EL CLIENTE&quot;.</li>
                    <li>Informar a &quot;EL CLIENTE&quot; sobre el avance de los servicios con la periodicidad que acuerden.</li>
                    <li>No ceder, traspasar o subcontratar los servicios objeto de este contrato sin la autorización previa y por escrito de &quot;EL CLIENTE&quot;.</li>
                    <li>Sacar en paz y a salvo a &quot;EL CLIENTE&quot; de cualquier reclamación derivada de la ejecución de sus servicios.</li>
                    {formData.obligaciones_propietario_adicionales && 
                        formData.obligaciones_propietario_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={formData.obligaciones_propietario_adicionales || ''} onChange={handleTextAreaChange('obligaciones_propietario_adicionales')} placeholder="Agregar obligaciones adicionales del prestador (una por línea)" rows={3}/>
            </div>
            
            <div>
                <p><span className="font-bold">QUINTA.- OBLIGACIONES DE &quot;EL CLIENTE&quot;.</span> &quot;EL CLIENTE&quot; se obliga a:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Pagar los honorarios en la forma y términos pactados.</li>
                    <li>Proporcionar a &quot;EL PRESTADOR&quot; toda la información, accesos y recursos necesarios para la correcta ejecución de los servicios.</li>
                    <li>Colaborar activamente y dar retroalimentación o aprobaciones de manera oportuna para no retrasar el proyecto.</li>
                    <li>Designar a un responsable o enlace para la comunicación y toma de decisiones relativas a este contrato.</li>
                    {formData.obligaciones_interesado_adicionales && 
                        formData.obligaciones_interesado_adicionales.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={formData.obligaciones_interesado_adicionales || ''} onChange={handleTextAreaChange('obligaciones_interesado_adicionales')} placeholder="Agregar obligaciones adicionales del cliente (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">SEXTA.- INEXISTENCIA DE RELACIÓN LABORAL....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SÉPTIMA.- CONFIDENCIALIDAD....</span></p>
            </div>

            <div>
                <p><span className="font-bold">OCTAVA.- PROPIEDAD INTELECTUAL....</span></p>
            </div>

            <div>
                <p><span className="font-bold">NOVENA.- RESCISIÓN.</span> Cualquiera de las partes podrá rescindir el presente contrato, mediante notificación por escrito con al menos 15 días de antelación, en caso de que la otra parte incumpla con cualquiera de las obligaciones aquí estipuladas, sin perjuicio del pago de la pena convencional y de los daños y perjuicios que se pudieran generar.</p>
                <p className="mt-2">Será motivo de rescisión del presente contrato, sin necesidad de declaración judicial las siguientes causas:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Incumplimiento de las obligaciones pactadas en este contrato.</li>
                    <li>Incumplimiento de las obligaciones fiscales o laborales por parte de &quot;EL PRESTADOR&quot;.</li>
                    <li>Falta de pago por parte de &quot;EL CLIENTE&quot; en los términos acordados.</li>
                    <li>Incumplimiento de las obligaciones de confidencialidad.</li>
                    <li>Incumplimiento de las obligaciones de propiedad intelectual.</li>
                    {formData.clausula_resolucion_adicional && 
                        formData.clausula_resolucion_adicional.split('\n').map((item, index) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={formData.clausula_resolucion_adicional || ''} onChange={handleTextAreaChange('clausula_resolucion_adicional')} placeholder="Agregar causas adicionales de rescisión (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA.- PENA CONVENCIONAL.</span> En caso de incumplimiento por alguna de las partes, la parte infractora pagará a la otra una pena convencional del <span className="font-bold"><InlineInput value={formData.pena_porcentaje || ''} onChange={handleChange('pena_porcentaje')} placeholder="20" widthClass="" type="number"/>%</span> sobre el valor total del contrato, sin necesidad de resolución judicial.</p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- JURISDICCIÓN.</span> Para la interpretación y cumplimiento de este contrato, las partes se someten a las leyes aplicables de México y a la jurisdicción de los tribunales competentes de la ciudad de <span className="font-bold"><InlineInput value={formData.ciudad_jurisdiccion || ''} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Santiago de Querétaro, Querétaro" widthClass=""/></span>, renunciando a cualquier otro fuero que por sus domicilios presentes o futuros pudiera corresponderles.</p>
            </div>

            {formData.clausulas_adicionales && (
                <div>
                    <p><span className="font-bold">DÉCIMA SEGUNDA.- CLÁUSULAS ADICIONALES.</span></p>
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