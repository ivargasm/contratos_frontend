'use client'

import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineSelect, InlineSelectWithChildren, InlineTextArea } from '@/app/components/ui/InlineComponents';
import { formatearValorEnLetras } from '@/app/lib/numberToWords';

// Componente específico para las partes del contrato laboral
export const BloquePartesLaboral: React.FC = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.checked.toString());
    };

    // Opciones para los selects (reutilizadas de BloquesGenericos)
    const nacionalidadOptions = ['Mexicana', 'Extranjera'];
    const estadoCivilOptions = ['Soltero(a)', 'Casado(a)', 'Concuvinato'];
    const documentoOptions = ['INE', 'Pasaporte', 'Licencia', 'Cédula Profesional'];

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <h2 className="text-2xl font-bold text-title mb-6">REUNIDOS</h2>
            
            {/* EMPLEADOR */}
            <div>
                <div>
                    <span className="font-bold">DE UNA PARTE,</span> <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.empresa_nombre === 'string' ? contratoActual.form_data.empresa_nombre : ''} onChange={handleChange('empresa_nombre')} placeholder="Nombre de la empresa" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>,
                
                    {/* Tipo de persona */}
                    <div className="ml-4 mt-2 mb-2">
                        <label className="flex items-center space-x-3 mb-2 cursor-pointer">
                            <input type="radio" name="empresa_tipo_persona" value="fisica" checked={(typeof contratoActual?.form_data?.empresa_tipo_persona === 'string' ? contratoActual.form_data.empresa_tipo_persona : '') === 'fisica'} onChange={(e) => updateContratoFormData('empresa_tipo_persona', e.target.value)} className="w-4 h-4 text-blue-600" disabled={contratoActual?.status === 'finalizado'} />
                            <span className="text-sm">Persona física</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="radio" name="empresa_tipo_persona" value="moral" checked={(typeof contratoActual?.form_data?.empresa_tipo_persona === 'string' ? contratoActual.form_data.empresa_tipo_persona : '') === 'moral'} onChange={(e) => updateContratoFormData('empresa_tipo_persona', e.target.value)} className="w-4 h-4 text-blue-600" disabled={contratoActual?.status === 'finalizado'} />
                            <span className="text-sm">Persona moral</span>
                        </label>
                    </div>

                    {(typeof contratoActual?.form_data?.empresa_tipo_persona === 'string' ? contratoActual.form_data.empresa_tipo_persona : '') === 'moral' ? (
                        <span>persona moral constituida conforme a las leyes mexicanas, con R.F.C. <InlineInput value={typeof contratoActual?.form_data?.empresa_rfc === 'string' ? contratoActual.form_data.empresa_rfc : ''} onChange={handleChange('empresa_rfc')} placeholder="RFC" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>, registro <InlineInput value={typeof contratoActual?.form_data?.empresa_registro === 'string' ? contratoActual.form_data.empresa_registro : ''} onChange={handleChange('empresa_registro')} placeholder="Registro" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>,</span>
                    ) : (typeof contratoActual?.form_data?.empresa_tipo_persona === 'string' ? contratoActual.form_data.empresa_tipo_persona : '') === 'fisica' ? (
                        <span>de nacionalidad <InlineSelect value={typeof contratoActual?.form_data?.empresa_nacionalidad === 'string' ? contratoActual.form_data.empresa_nacionalidad : ''} onChange={handleSelectChange('empresa_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad" />, <InlineSelect value={typeof contratoActual?.form_data?.empresa_estado_civil === 'string' ? contratoActual.form_data.empresa_estado_civil : ''} onChange={handleSelectChange('empresa_estado_civil')} options={estadoCivilOptions} placeholder="estado civil" />, identificado(a) con <InlineSelect value={typeof contratoActual?.form_data?.empresa_id_tipo === 'string' ? contratoActual.form_data.empresa_id_tipo : ''} onChange={handleSelectChange('empresa_id_tipo')} options={documentoOptions} placeholder="documento" /> número <InlineInput value={typeof contratoActual?.form_data?.empresa_id === 'string' ? contratoActual.form_data.empresa_id : ''} onChange={handleChange('empresa_id')} placeholder="123456" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>,</span>
                    ) : null}
                    
                    con domicilio fiscal en <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.empresa_direccion === 'string' ? contratoActual.form_data.empresa_direccion : ''} onChange={handleChange('empresa_direccion')} placeholder="Dirección fiscal completa" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>,
                    
                    {/* Representante legal (opcional) */}
                    <div className="mt-2">
                        <label className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" checked={(typeof contratoActual?.form_data?.tiene_representante === 'string' ? contratoActual.form_data.tiene_representante : '') === 'true'} onChange={handleCheckboxChange('tiene_representante')} className="w-4 h-4 text-blue-600 rounded" disabled={contratoActual?.status === 'finalizado'} />
                            <span className="text-sm">¿Tiene representante legal?</span>
                        </label>
                        {(typeof contratoActual?.form_data?.tiene_representante === 'string' ? contratoActual.form_data.tiene_representante : '') === 'true' && (
                            <span>representada por <InlineInput value={typeof contratoActual?.form_data?.representante_nombre === 'string' ? contratoActual.form_data.representante_nombre : ''} onChange={handleChange('representante_nombre')} placeholder="Nombre del representante" widthClass="" disabled={contratoActual?.status === 'finalizado'}/> en su calidad de <InlineInput value={typeof contratoActual?.form_data?.representante_cargo === 'string' ? contratoActual.form_data.representante_cargo : ''} onChange={handleChange('representante_cargo')} placeholder="Director General" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>, identificado(a) con <InlineSelect value={typeof contratoActual?.form_data?.representante_id_tipo === 'string' ? contratoActual.form_data.representante_id_tipo : ''} onChange={handleSelectChange('representante_id_tipo')} options={documentoOptions} placeholder="documento" /> número <InlineInput value={typeof contratoActual?.form_data?.representante_id === 'string' ? contratoActual.form_data.representante_id : ''} onChange={handleChange('representante_id')} placeholder="123456" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>,</span>
                        )}
                    </div>
                    
                    a quien en adelante se le denominará &quot;<span className="font-bold">LA EMPRESA</span>&quot; o &quot;<span className="font-bold">EL EMPLEADOR</span>&quot; o &quot;<span className="font-bold">EL PATRÓN</span>&quot;.
                </div>
            </div>
            
            {/* TRABAJADOR */}
            <div>
                <p><span className="font-bold">DE OTRA PARTE,</span> <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.interesado_nombre === 'string' ? contratoActual.form_data.interesado_nombre : ''} onChange={handleChange('interesado_nombre')} placeholder="Nombre completo del trabajador" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, mayor de edad, de nacionalidad <InlineSelect value={typeof contratoActual?.form_data?.interesado_nacionalidad === 'string' ? contratoActual.form_data.interesado_nacionalidad : ''} onChange={handleSelectChange('interesado_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad" />, <InlineSelect value={typeof contratoActual?.form_data?.interesado_estado_civil === 'string' ? contratoActual.form_data.interesado_estado_civil : ''} onChange={handleSelectChange('interesado_estado_civil')} options={estadoCivilOptions} placeholder="estado civil" />, identificado(a) con <InlineSelect value={typeof contratoActual?.form_data?.interesado_id_tipo === 'string' ? contratoActual.form_data.interesado_id_tipo : ''} onChange={handleSelectChange('interesado_id_tipo')} options={documentoOptions} placeholder="documento" /> número <InlineInput value={typeof contratoActual?.form_data?.interesado_id === 'string' ? contratoActual.form_data.interesado_id : ''} onChange={handleChange('interesado_id')} placeholder="123456" widthClass="" disabled={contratoActual?.status === 'finalizado'}/>, con domicilio en <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.interesado_direccion === 'string' ? contratoActual.form_data.interesado_direccion : ''} onChange={handleChange('interesado_direccion')} placeholder="Dirección completa del trabajador" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, a quien en adelante se le denominará &quot;<span className="font-bold">EL TRABAJADOR</span>&quot;.</p>
            </div>
            
            <p>Ambas partes acuerdan celebrar el presente contrato de <span className="font-bold">TRABAJO</span>, sujeto a las siguientes cláusulas:</p>
        </div>
    );
};

export const BloqueDeclaracionesLaboral: React.FC = () => {

    return (
        <div className="space-y-6">
            <div>
                <p><span className="font-bold">I.- Declara EL EMPLEADOR:</span> Que cuenta con la capacidad legal necesaria para celebrar el presente contrato y que los datos proporcionados en la sección de comparecientes son veraces.</p>
            </div>

            <div>
                <p><span className="font-bold">II.- Declara EL TRABAJADOR:</span> Que cuenta con la capacidad, conocimientos, habilidades y experiencia necesaria para desempeñar las funciones que se le encomienden, y que los datos proporcionados son veraces.</p>
            </div>

            <div>
                <p><span className="font-bold">III.- Declaran ambas partes:</span> Que la celebración del presente contrato obedece a su voluntad libre y no existe error, dolo, violencia o vicio que lo invalide; las partes reconocen su capacidad legal y manifiestan su conformidad con las cláusulas que se establecen a continuación.</p>
            </div>
        </div>
    );
};

export const BloqueClausulasLaboral: React.FC = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();

    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.checked.toString());
    };

    const handleRadioChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        updateContratoFormData('salario', valor);
        if (valor) {
            const valorEnLetras = formatearValorEnLetras(parseFloat(valor), 'MXN');
            updateContratoFormData('salario_en_letras', valorEnLetras);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <p><span className="font-bold">PRIMERA.- OBJETO.</span> EL TRABAJADOR se obliga a prestar sus servicios personales subordinados a EL PATRÓN en el puesto de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.puesto === 'string' ? contratoActual.form_data.puesto : ''} onChange={handleChange('puesto')} placeholder="[Puesto]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, desempeñando las funciones y responsabilidades inherentes al mismo, y aquellas otras que razonablemente le sean encomendadas por la dirección de EL PATRÓN, siempre que guarden relación con su cargo.</p>
            </div>

            <div>
                <p><span className="font-bold">SEGUNDA.- DURACIÓN.</span></p>
                <div className="ml-4 mt-2">
                    <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                        <input type="radio" name="tipo_contrato" value="indeterminado" checked={(typeof contratoActual?.form_data?.tipo_contrato === 'string' ? contratoActual.form_data.tipo_contrato : '') === 'indeterminado'} onChange={handleRadioChange('tipo_contrato')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                        <span className="text-sm font-medium">Tiempo indeterminado</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="tipo_contrato" value="determinado" checked={(typeof contratoActual?.form_data?.tipo_contrato === 'string' ? contratoActual.form_data.tipo_contrato : '') === 'determinado'} onChange={handleRadioChange('tipo_contrato')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                        <span className="text-sm font-medium">Tiempo determinado</span>
                    </label>
                </div>
                {(typeof contratoActual?.form_data?.tipo_contrato === 'string' ? contratoActual.form_data.tipo_contrato : '') === 'determinado' ? (
                    <p className="mt-2">El presente contrato se celebra por tiempo determinado, iniciando el día <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_inicio === 'string' ? contratoActual.form_data.fecha_inicio : ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> y concluyendo el día <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_fin === 'string' ? contratoActual.form_data.fecha_fin : ''} onChange={handleChange('fecha_fin')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, salvo prórroga expresa convenida por ambas partes o causa de terminación anticipada prevista en este instrumento.</p>
                ) : (
                    <p className="mt-2">El presente contrato se celebra por tiempo indeterminado, iniciando el día <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_inicio === 'string' ? contratoActual.form_data.fecha_inicio : ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>.</p>
                )}
            </div>

            <div>
                <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                    <input type="checkbox" checked={(typeof contratoActual?.form_data?.periodo_prueba === 'string' ? contratoActual.form_data.periodo_prueba : '') === 'true'} onChange={handleCheckboxChange('periodo_prueba')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                    <span className="font-bold text-sm">¿Incluir período de prueba?</span>
                </label>
                {(typeof contratoActual?.form_data?.periodo_prueba === 'string' ? contratoActual.form_data.periodo_prueba : '') === 'true' ? (
                    <p><span className="font-bold">TERCERA.- PERÍODO DE PRUEBA.</span> Las partes convienen expresamente un período de prueba de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.periodo_prueba_dias === 'string' ? contratoActual.form_data.periodo_prueba_dias : '30'} onChange={handleChange('periodo_prueba_dias')} placeholder="30" widthClass="" type="number" disabled={contratoActual?.status === 'finalizado'}/></span> días naturales contados a partir de la fecha de inicio. Durante dicho período cualquiera de las partes podrá dar por terminada la relación laboral sin responsabilidad adicional, sin perjuicio del pago de las prestaciones devengadas hasta esa fecha.</p>
                ) : (
                    <p><span className="font-bold">TERCERA.- JORNADA LABORAL.</span> La jornada de trabajo será de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.jornada === 'string' ? contratoActual.form_data.jornada : '8 horas diarias'} onChange={handleChange('jornada')} placeholder="8 horas diarias" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, distribuida de la siguiente forma: <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.horario === 'string' ? contratoActual.form_data.horario : ''} onChange={handleChange('horario')} placeholder="Lunes a Viernes de 9:00 a 18:00 horas, con 1 hora de descanso" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>. Las horas extraordinarias se pagarán conforme a lo pactado y a la normativa aplicable.</p>
                )}
            </div>

            <div>
                <p><span className="font-bold">CUARTA.- LUGAR DE TRABAJO.</span> EL TRABAJADOR desempeñará sus funciones en <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.lugar_trabajo === 'string' ? contratoActual.form_data.lugar_trabajo : ''} onChange={handleChange('lugar_trabajo')} placeholder="[Domicilio o centro de trabajo]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>. 
                <label className="inline-flex items-center space-x-3 ml-2 cursor-pointer">
                    <input type="checkbox" checked={(typeof contratoActual?.form_data?.movilidad === 'string' ? contratoActual.form_data.movilidad : '') === 'true'} onChange={handleCheckboxChange('movilidad')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                    <span className="text-sm">¿Incluir cláusula de movilidad?</span>
                </label>
                {(typeof contratoActual?.form_data?.movilidad === 'string' ? contratoActual.form_data.movilidad : '') === 'true' && <span> EL PATRÓN podrá, por necesidades del servicio y cumpliendo la normativa aplicable, asignar al trabajador a otros centros de trabajo, dentro o fuera del mismo municipio/estado, con previo aviso y con los ajustes que correspondan en su caso.</span>}</p>
            </div>

            <div>
                <p><span className="font-bold">QUINTA.- SALARIO.</span></p>
                <ul className="list-disc ml-6 mt-2">
                    <li>EL PATRÓN pagará a EL TRABAJADOR un salario de <span className="font-bold">$<InlineInput value={typeof contratoActual?.form_data?.salario === 'string' ? contratoActual.form_data.salario : ''} onChange={handleSalarioChange} placeholder="0.00" widthClass="" type="number" disabled={contratoActual?.status === 'finalizado'}/></span> (<span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.salario_en_letras === 'string' ? contratoActual.form_data.salario_en_letras : ''} onChange={handleChange('salario_en_letras')} placeholder="[Cantidad en letras]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>), pagadero de forma <span className="font-bold"><InlineSelectWithChildren value={typeof contratoActual?.form_data?.periodicidad_pago === 'string' ? contratoActual.form_data.periodicidad_pago : ''} onChange={handleSelectChange('periodicidad_pago')} widthClass="">
                        <option value="">Seleccionar</option>
                        <option value="semanal">semanal</option>
                        <option value="quincenal">quincenal</option>
                        <option value="mensual">mensual</option>
                    </InlineSelectWithChildren></span> en la cuenta o forma que las partes indiquen.</li>
                    <li>El salario indicado se considera íntegro y comprende todas las percepciones pactadas salvo que se establezcan complementos por escrito.</li>
                    <li>En caso de pago de horas extraordinarias, estas se liquidarán según lo convenido y conforme a la normativa aplicable.</li>
                </ul>
            </div>

            <div>
                <p><span className="font-bold">SEXTA.- PRESTACIONES.</span></p>
                <div className="ml-4 mt-2">
                    <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                        <input type="radio" name="prestaciones" value="ley" checked={(typeof contratoActual?.form_data?.prestaciones === 'string' ? contratoActual.form_data.prestaciones : '') === 'ley'} onChange={handleRadioChange('prestaciones')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                        <span className="text-sm font-medium">Solo prestaciones de ley</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="prestaciones" value="superiores" checked={(typeof contratoActual?.form_data?.prestaciones === 'string' ? contratoActual.form_data.prestaciones : '') === 'superiores'} onChange={handleRadioChange('prestaciones')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                        <span className="text-sm font-medium">Prestaciones superiores a la ley</span>
                    </label>
                </div>
                {(typeof contratoActual?.form_data?.prestaciones === 'string' ? contratoActual.form_data.prestaciones : '') === 'ley' ? (
                    <p className="mt-2">EL TRABAJADOR tendrá derecho a las prestaciones mínimas que correspondan conforme a la legislación aplicable: vacaciones, prima vacacional, aguinaldo, seguridad social y demás prestaciones que resulten obligatorias por ley.</p>
                ) : (typeof contratoActual?.form_data?.prestaciones === 'string' ? contratoActual.form_data.prestaciones : '') === 'superiores' ? (
                    <div className="mt-2">
                        <p>Además de las prestaciones de ley, EL TRABAJADOR tendrá derecho a prestaciones superiores consistentes en:</p>
                        <ul className="list-disc ml-6 mt-2">
                            {(typeof contratoActual?.form_data?.prestaciones_superiores === 'string' ? contratoActual.form_data.prestaciones_superiores : '') && 
                                (typeof contratoActual?.form_data?.prestaciones_superiores === 'string' ? contratoActual.form_data.prestaciones_superiores : '').split('\n').map((item, index) => (
                                    item.trim() && <li key={index}>{item.trim()}</li>
                                ))
                            }
                        </ul>
                        <InlineTextArea value={typeof contratoActual?.form_data?.prestaciones_superiores === 'string' ? contratoActual.form_data.prestaciones_superiores : ''} onChange={handleTextAreaChange('prestaciones_superiores')} placeholder="Agregar prestaciones superiores (una por línea)Ejemplo:vales de despensa" rows={4}/>
                        <p className="mt-2">Las condiciones específicas de dichas prestaciones adicionales se regirán por las políticas internas del patrón o por acuerdos escritos adicionales.</p>
                    </div>
                ) : null}
            </div>

            <div>
                <p><span className="font-bold">SÉPTIMA.- OBLIGACIONES DEL TRABAJADOR.</span> Durante la vigencia de la relación laboral EL TRABAJADOR se obliga a:</p>
                <ul className="list-disc ml-6">
                    <li>Prestar sus servicios con diligencia, lealtad y eficiencia.</li>
                    <li>Obedecer las instrucciones lícitas y razonables de EL PATRÓN en cuanto al desempeño de su trabajo.</li>
                    <li>Cumplir las políticas internas, normas de seguridad e higiene y demás reglamentos aplicables.</li>
                    <li>Cuidar y conservar en buen estado las herramientas, materiales y equipos que le sean proporcionados.</li>
                    <li>Guardar estricto carácter de confidencialidad respecto de la información reservada de EL PATRÓN, sus clientes y proveedores.</li>
                    <li>Notificar de inmediato cualquier accidente de trabajo o situación que pueda afectar el cumplimiento de sus obligaciones.</li>
                    {(typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_interesado_adicionales === 'string' ? contratoActual.form_data.obligaciones_interesado_adicionales : ''} onChange={handleTextAreaChange('obligaciones_interesado_adicionales')} placeholder="Agregar obligaciones adicionales del trabajador (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">OCTAVA.- OBLIGACIONES DEL PATRÓN.</span> EL PATRÓN se obliga a:</p>
                <ul className="list-disc ml-6">
                    <li>Pagar puntualmente el salario y las prestaciones pactadas.</li>
                    <li>Proporcionar los medios y condiciones necesarias para el adecuado desempeño de las labores encomendadas.</li>
                    <li>Respetar los derechos laborales y obligaciones de seguridad social correspondientes.</li>
                    <li>Brindar condiciones de seguridad e higiene en el centro de trabajo.</li>
                    {(typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '') && 
                        (typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <InlineTextArea value={typeof contratoActual?.form_data?.obligaciones_propietario_adicionales === 'string' ? contratoActual.form_data.obligaciones_propietario_adicionales : ''} onChange={handleTextAreaChange('obligaciones_propietario_adicionales')} placeholder="Agregar obligaciones adicionales del patrón (una por línea)" rows={3}/>
            </div>

            <div>
                <p><span className="font-bold">NOVENA.- CONFIDENCIALIDAD Y PROPIEDAD INTELECTUAL...</span></p>                
            </div>

            <div>
                <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                    <input type="checkbox" checked={(typeof contratoActual?.form_data?.clausula_no_compete === 'string' ? contratoActual.form_data.clausula_no_compete : '') === 'true'} onChange={handleCheckboxChange('clausula_no_compete')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" disabled={contratoActual?.status === 'finalizado'} />
                    <span className="font-bold text-sm">¿Incluir cláusula de no competencia?</span>
                </label>
                {(typeof contratoActual?.form_data?.clausula_no_compete === 'string' ? contratoActual.form_data.clausula_no_compete : '') === 'true' && (
                    <p><span className="font-bold">DÉCIMA.- NO COMPETENCIA.</span> Durante la vigencia de la relación laboral y por un periodo de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.no_compete_periodo === 'string' ? contratoActual.form_data.no_compete_periodo : '6 meses'} onChange={handleChange('no_compete_periodo')} placeholder="6 meses" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> posteriores a su terminación, EL TRABAJADOR se obliga a no prestar servicios, directa o indirectamente, a empresas o actividades que sean competencia directa de EL PATRÓN en el área <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.no_compete_area === 'string' ? contratoActual.form_data.no_compete_area : ''} onChange={handleChange('no_compete_area')} placeholder="[área/geografía]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, salvo autorización expresa y por escrito de EL PATRÓN. En caso de incumplimiento, EL TRABAJADOR indemnizará los daños y perjuicios causados conforme a la ley aplicable.</p>
                )}
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- PROTECCIÓN DE DATOS PERSONALES...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SEGUNDA.- SUSPENSIÓN Y TERMINACIÓN...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA TERCERA.- INDEMNIZACIONES Y LIQUIDACIÓN...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA CUARTA.- SALUD Y SEGURIDAD...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA QUINTA.- PREVENCIÓN DE OPERACIONES CON RECURSOS DE PROCEDENCIA ILÍCITA...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SEXTA.- NOTIFICACIONES...</span> </p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA SÉPTIMA.- JURISDICCIÓN.</span> Para la interpretación y cumplimiento del presente contrato, las partes se someten a la jurisdicción de las autoridades competentes en la ciudad de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.ciudad_jurisdiccion === 'string' ? contratoActual.form_data.ciudad_jurisdiccion : 'Querétaro'} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Querétaro" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, renunciando a cualquier otro fuero que pudiera corresponderles en la medida en que la ley lo permita.</p>
            </div>
            {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '') && (
                <div>
                    <p><span className="font-bold">DÉCIMA OCTAVA.- CLÁUSULAS ADICIONALES.</span></p>
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