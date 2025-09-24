import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineSelect } from '@/app/components/ui/InlineComponents';


// ------------------------------------------------------------------
// BLOQUE 1: LUGAR Y FECHA (Reutilizable)
// ------------------------------------------------------------------
export const BloqueLugarFecha = () => {
    const { formData, updateFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(key, e.target.value);
    };

    return (
        <p className="text-lg leading-relaxed">
            En la ciudad de{' '}
            <InlineInput value={formData.ciudad || ''} onChange={handleChange('ciudad')} placeholder="Ciudad" widthClass="" />{' '}
            el día{' '}
            <InlineInput value={formData.dia || ''} onChange={handleChange('dia')} placeholder="Día" widthClass="" type="number" />{' '}
            de{' '}
            <InlineInput value={formData.mes || ''} onChange={handleChange('mes')} placeholder="Mes" widthClass="" />{' '}
            del año{' '}
            <InlineInput value={formData.anio || ''} onChange={handleChange('anio')} placeholder="Año" widthClass="" type="number" />.
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
    const { formData, updateFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(key, e.target.value);
    };
    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormData(key, e.target.value);
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
                <InlineInput value={formData.propietario_nombre || ''} onChange={handleChange('propietario_nombre')} placeholder="Nombre completo" widthClass="" />,
                mayor de edad,{' '}
                de nacionalidad <InlineSelect value={formData.propietario_nacionalidad || ''} onChange={handleSelectChange('propietario_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad"  />, {' '}
                <InlineSelect value={formData.propietario_estado_civil || ''} onChange={handleSelectChange('propietario_estado_civil')} options={estadoCivilOptions} placeholder="estado civil"  />, {' '}
                identificado(a) con <InlineSelect value={formData.propietario_id_tipo || ''} onChange={handleSelectChange('propietario_id_tipo')} options={documentoOptions} placeholder="documento"  /> {' '}
                {formData.propietario_id && (
                    <>número <InlineInput value={formData.propietario_id || ''} onChange={handleChange('propietario_id')} placeholder="123456"  />, </>
                )}
                {!formData.propietario_id && (
                    <>número <InlineInput value={formData.propietario_id || ''} onChange={handleChange('propietario_id')} placeholder="123456"  />, </>
                )}
                con domicilio en{' '}
                <InlineInput value={formData.propietario_direccion || ''} onChange={handleChange('propietario_direccion')} placeholder="" widthClass="" />,
                a quien en adelante se le denominará &quot;<span className="font-bold">EL {rolPropietario}</span>&quot;.
            </p>
            
            <p>
                <span className="font-bold">DE OTRA PARTE,</span>{' '}
                <InlineInput value={formData.interesado_nombre || ''} onChange={handleChange('interesado_nombre')} placeholder="Nombre completo" widthClass="" />,
                mayor de edad,{' '}
                de nacionalidad <InlineSelect value={formData.interesado_nacionalidad || ''} onChange={handleSelectChange('interesado_nacionalidad')} options={nacionalidadOptions} placeholder="nacionalidad"  />, {' '}
                <InlineSelect value={formData.interesado_estado_civil || ''} onChange={handleSelectChange('interesado_estado_civil')} options={estadoCivilOptions} placeholder="estado civil"  />, {' '}
                identificado(a) con <InlineSelect value={formData.interesado_id_tipo || ''} onChange={handleSelectChange('interesado_id_tipo')} options={documentoOptions} placeholder="documento"  /> {' '}
                {formData.interesado_id && (
                    <>número <InlineInput value={formData.interesado_id || ''} onChange={handleChange('interesado_id')} placeholder="123456"  />, </>
                )}
                {!formData.interesado_id && (
                    <>número <InlineInput value={formData.interesado_id || ''} onChange={handleChange('interesado_id')} placeholder="123456"  />, </>
                )}
                con domicilio en{' '}
                <InlineInput value={formData.interesado_direccion || ''} onChange={handleChange('interesado_direccion')} placeholder="" widthClass="" />,
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
    const { formData, updateFormData } = useContratoStore();
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(key, e.target.value);
    };

    return (
        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-title mb-8">TESTIGOS</h2>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
                <div className="w-full sm:w-1/3">
                    <InlineInput value={formData.testigo_1 || ''} onChange={handleChange('testigo_1')} placeholder="Nombre del Testigo 1" widthClass="w-full" />
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 text-sm">Testigo</p>
                </div>
                <div className="w-full sm:w-1/3">
                    <InlineInput value={formData.testigo_2 || ''} onChange={handleChange('testigo_2')} placeholder="Nombre del Testigo 2" widthClass="w-full" />
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
    const { formData } = useContratoStore();

    return (
        <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8 pt-8">
                <div className="w-full sm:w-1/3">
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 font-bold">{rolPropietario}</p>
                    <p className="text-sm">{formData.propietario_nombre || '___________________'}</p>
                </div>
                <div className="w-full sm:w-1/3">
                    <hr className="mt-2 border-foreground" />
                    <p className="mt-2 font-bold">{rolInteresado}</p>
                    <p className="text-sm">{formData.interesado_nombre || '___________________'}</p>
                </div>
            </div>
        </div>
    );
};

