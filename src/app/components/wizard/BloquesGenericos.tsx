import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineSelect } from '@/app/components/ui/InlineComponents';


// ------------------------------------------------------------------
// BLOQUE 1: LUGAR Y FECHA (Reutilizable)
// ------------------------------------------------------------------
export const BloqueLugarFecha = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();

    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <p className="text-lg leading-relaxed">
            En la ciudad de{' '}
            <InlineInput
                // MODIFICADO: El valor viene de `contratoActual.form_data`
                value={typeof contratoActual?.form_data?.ciudad === 'string' ? contratoActual.form_data.ciudad : ''}
                onChange={handleChange('ciudad')}
                placeholder="Ciudad"
                disabled={contratoActual?.status === 'finalizado'}
            />{' '}
            a los{' '}
            <InlineInput
                value={typeof contratoActual?.form_data?.dia === 'string' ? contratoActual.form_data.dia : ''}
                onChange={handleChange('dia')}
                placeholder="Día"
                disabled={contratoActual?.status === 'finalizado'}
            />{' '}
            días del mes de{' '}
            <InlineInput
                value={typeof contratoActual?.form_data?.mes === 'string' ? contratoActual.form_data.mes : ''}
                onChange={handleChange('mes')}
                placeholder="Mes"
                disabled={contratoActual?.status === 'finalizado'}
            />{' '}
            del año{' '}
            <InlineInput
                value={typeof contratoActual?.form_data?.anio === 'string' ? contratoActual.form_data.anio : ''}
                onChange={handleChange('anio')}
                placeholder="Año"
                disabled={contratoActual?.status === 'finalizado'}
            />.
        </p>
    );
};


// ------------------------------------------------------------------
// BLOQUE 2: PARTES (Reutilizable con Props)
// ------------------------------------------------------------------
interface BloquePartesProps {
    rolPropietario: string; // "VENDEDOR", "ARRENDADOR", etc.
    rolInteresado: string; // "COMPRADOR", "ARRENDATARIO", etc.
    tipoContrato: string; // "COMPRAVENTA", "ARRENDAMIENTO", etc.
}

export const BloquePartes: React.FC<BloquePartesProps> = ({ rolPropietario, rolInteresado, tipoContrato }) => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    // Opciones para los selects
    const nacionalidadOptions = ['Mexicano', 'Extranjero'];
    const estadoCivilOptions = ['Soltero', 'Casado'];
    const documentoOptions = ['INE', 'Pasaporte', 'Licencia', 'Cédula Profesional'];

    return (
        <div className="space-y-4 text-lg leading-relaxed">
            <h2 className="text-2xl font-bold text-title mb-6">REUNIDOS</h2>

            <p>
                <span className="font-bold">DE UNA PARTE,</span>{' '}
                <InlineInput value={typeof contratoActual?.form_data?.propietario_nombre === 'string' ? contratoActual.form_data.propietario_nombre : ''} onChange={handleChange('propietario_nombre')} placeholder="Nombre completo" widthClass="" />,
                mayor de edad,{' '}
                de nacionalidad <InlineSelect value={typeof contratoActual?.form_data?.propietario_nacionalidad === 'string' ? contratoActual.form_data.propietario_nacionalidad : ''} onChange={handleSelectChange('propietario_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad" />, {' '}
                <InlineSelect value={typeof contratoActual?.form_data?.propietario_estado_civil === 'string' ? contratoActual.form_data.propietario_estado_civil : ''} onChange={handleSelectChange('propietario_estado_civil')} options={estadoCivilOptions} placeholder="estado civil" />, {' '}
                identificado(a) con <InlineSelect value={typeof contratoActual?.form_data?.propietario_id_tipo === 'string' ? contratoActual.form_data.propietario_id_tipo : ''} onChange={handleSelectChange('propietario_id_tipo')} options={documentoOptions} placeholder="documento" /> {' '}
                <>número <InlineInput value={typeof contratoActual?.form_data?.propietario_id === 'string' ? contratoActual.form_data.propietario_id : ''} onChange={handleChange('propietario_id')} placeholder="123456" />, </>
                con domicilio en{' '}
                <InlineInput value={typeof contratoActual?.form_data?.propietario_direccion === 'string' ? contratoActual.form_data.propietario_direccion : ''} onChange={handleChange('propietario_direccion')} placeholder="" widthClass="" />,
                a quien en adelante se le denominará &quot;<span className="font-bold">EL {rolPropietario}</span>&quot;.
            </p>

            <p>
                <span className="font-bold">DE OTRA PARTE,</span>{' '}
                <InlineInput value={typeof contratoActual?.form_data?.interesado_nombre === 'string' ? contratoActual.form_data.interesado_nombre : ''} onChange={handleChange('interesado_nombre')} placeholder="Nombre completo" widthClass="" />,
                mayor de edad,{' '}
                de nacionalidad <InlineSelect value={typeof contratoActual?.form_data?.interesado_nacionalidad === 'string' ? contratoActual.form_data.interesado_nacionalidad : ''} onChange={handleSelectChange('interesado_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad" />, {' '}
                <InlineSelect value={typeof contratoActual?.form_data?.interesado_estado_civil === 'string' ? contratoActual.form_data.interesado_estado_civil : ''} onChange={handleSelectChange('interesado_estado_civil')} options={estadoCivilOptions} placeholder="estado civil" />, {' '}
                identificado(a) con <InlineSelect value={typeof contratoActual?.form_data?.interesado_id_tipo === 'string' ? contratoActual.form_data.interesado_id_tipo : ''} onChange={handleSelectChange('interesado_id_tipo')} options={documentoOptions} placeholder="documento" /> {' '}
                <>número <InlineInput value={typeof contratoActual?.form_data?.interesado_id === 'string' ? contratoActual.form_data.interesado_id : ''} onChange={handleChange('interesado_id')} placeholder="123456" />, </>
                con domicilio en{' '}
                <InlineInput value={typeof contratoActual?.form_data?.interesado_direccion === 'string' ? contratoActual.form_data.interesado_direccion : ''} onChange={handleChange('interesado_direccion')} placeholder="" widthClass="" />,
                a quien en adelante se le denominará &quot;<span className="font-bold">EL {rolInteresado}</span>&quot;.
            </p>

            <p>
                Ambas partes acuerdan celebrar el presente contrato de <span className="font-bold">{tipoContrato}</span>, sujeto a las siguientes cláusulas:
            </p>
        </div>
    );
};


// ------------------------------------------------------------------
// BLOQUE 3: TESTIGOS (Reutilizable)
// ------------------------------------------------------------------
export const BloqueTestigos = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-title mb-8">TESTIGOS</h2>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
                <div className="w-full sm:w-1/3">
                    <InlineInput 
                        value={typeof contratoActual?.form_data?.testigo_1 === 'string' ? contratoActual.form_data.testigo_1 : ''} 
                        onChange={handleChange('testigo_1')} 
                        placeholder="Nombre del Testigo 1" 
                        widthClass="w-full" 
                        disabled={contratoActual?.status === 'finalizado'}
                    />
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 text-sm">Testigo</p>
                </div>
                <div className="w-full sm:w-1/3">
                    <InlineInput 
                        value={typeof contratoActual?.form_data?.testigo_2 === 'string' ? contratoActual.form_data.testigo_2 : ''} 
                        onChange={handleChange('testigo_2')} 
                        placeholder="Nombre del Testigo 2" 
                        widthClass="w-full" 
                        disabled={contratoActual?.status === 'finalizado'}
                    />
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 text-sm">Testigo</p>
                </div>
            </div>
        </div>
    );
};


// ------------------------------------------------------------------
// BLOQUE 4: FIRMAS (Reutilizable con Props)
// ------------------------------------------------------------------
export const BloqueFirmas: React.FC<BloquePartesProps> = ({ rolPropietario, rolInteresado }) => {
    const { contratoActual } = useContratoStore();

    return (
        <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8 pt-8">
                <div className="w-full sm:w-1/3">
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 font-bold">{rolPropietario}</p>
                    <p className="text-sm">
                        {typeof contratoActual?.form_data?.propietario_nombre === 'string' 
                            ? contratoActual.form_data.propietario_nombre 
                            : '___________________'
                        }
                    </p>
                </div>
                <div className="w-full sm:w-1/3">
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 font-bold">{rolInteresado}</p>
                    <p className="text-sm">
                        {typeof contratoActual?.form_data?.interesado_nombre === 'string' 
                            ? contratoActual.form_data.interesado_nombre 
                            : '___________________'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

