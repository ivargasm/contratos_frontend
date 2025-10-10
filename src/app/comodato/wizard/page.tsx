'use client'

import React from 'react';
import { ContractWizardTemplate } from '@/app/components/wizard/ContractWizardTemplate';
import { 
    BloqueLugarFecha, 
    BloquePartes,
    BloqueTestigos,
    BloqueFirmas
} from '@/app/components/wizard/BloquesGenericos';
import {
    BloqueDeclaracionesComodato,
    BloqueClausulasComodato
} from '@/app/components/wizard/BloquesComodato';
import { InlineSelectWithChildren } from '@/app/components/ui/InlineComponents';
import { useContratoStore } from '@/app/store/useContratoStore';

function ContratoComodatoClient({ contractType }: { contractType: string }) {
    const { contratoActual, updateContratoFormData } = useContratoStore();

    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    const getTitle = () => {
        const tipoBien = typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : '';
        return `Contrato de Comodato ${tipoBien === "Mueble" ? "de Bien Mueble" : "de Bien Inmueble"}`;
    };

    return (
        <ContractWizardTemplate
            contractType={contractType}
            title={getTitle()}
            rolPropietario="COMODANTE"
            rolInteresado="COMODATARIO"
            tipoContrato="COMODATO"
            buttonText="Guardar y Generar Contrato"
        >
            {/* Sección para seleccionar el tipo de bien */}
            <div className="bg-muted p-4 rounded-md">
                <label className="font-bold text-lg text-foreground mr-4">Tipo de bien en comodato:</label>
                <InlineSelectWithChildren 
                    value={typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : ''} 
                    onChange={handleSelectChange('tipo_bien')} 
                    widthClass="w-48" 
                    disabled={contratoActual?.status === 'finalizado'}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Mueble">Bien Mueble (Ej: Vehículo, Equipo)</option>
                    <option value="Inmueble">Bien Inmueble (Ej: Casa, Local)</option>
                </InlineSelectWithChildren>
            </div>

            {/* ORQUESTACIÓN DE BLOQUES */}
            <section><BloqueLugarFecha /></section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                <BloquePartes rolPropietario="COMODANTE" rolInteresado="COMODATARIO" tipoContrato="COMODATO" />
            </section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                <BloqueDeclaracionesComodato />
            </section>
            <p>EXPUESTO LO ANTERIOR, LOS COMPARECIENTES (LAS PARTES) FORMALIZAN EL PRESENTE, AL TENOR DE LAS SIGUIENTES:</p>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                <BloqueClausulasComodato />
            </section>
            <hr className="border-border" />
            <p>Leído que fue el presente contrato y enteradas las partes de su contenido y alcance legal, lo firman por duplicado en la ciudad indicada al principio.</p>
            <section>
                <BloqueFirmas rolPropietario="COMODANTE" rolInteresado="COMODATARIO" tipoContrato="COMODATO" />
                <BloqueTestigos />
            </section>
        </ContractWizardTemplate>
    );
}

export default function ContratoComodatoInteractivo({ params }: { params: { contract_type: string } }) {
    return <ContratoComodatoClient contractType={params.contract_type || 'comodato'} />;
}