'use client'

import React from 'react';
import { ContractWizardTemplate } from '@/app/components/wizard/ContractWizardTemplate';
import { 
    BloqueLugarFecha, 
    BloqueTestigos,
    BloqueFirmas
} from '@/app/components/wizard/BloquesGenericos';
import {
    BloquePartesLaboral,
    BloqueDeclaracionesLaboral,
    BloqueClausulasLaboral
} from '@/app/components/wizard/BloquesLaboral';

export default function ContratoLaboralInteractivo({ params }: { params: { contract_type: string } }) {
    return (
        <ContractWizardTemplate
            contractType={params.contract_type || 'laboral'}
            title="Contrato Individual de Trabajo"
            rolPropietario="EL PATRÓN"
            rolInteresado="EL TRABAJADOR"
            tipoContrato="LABORAL"
            buttonText="Finalizar Contrato"
        >
            {/* ORQUESTACIÓN DE BLOQUES */}
            <section><BloqueLugarFecha /></section>
            <hr className="border-border" />
            <section>
                <BloquePartesLaboral />
            </section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                <BloqueDeclaracionesLaboral />
            </section>
            <p>EXPUESTO LO ANTERIOR, las partes acuerdan sujetarse a las siguientes:</p>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                <BloqueClausulasLaboral />
            </section>
            <hr className="border-border" />
            <p>Leído que fue el presente contrato y enteradas las partes de su contenido y alcance legal, lo firman por duplicado en la ciudad y fecha al principio indicadas.</p>
            <section>
                <BloqueFirmas rolPropietario="EL PATRÓN" rolInteresado="EL TRABAJADOR" tipoContrato="LABORAL" />
                <BloqueTestigos />
            </section>
        </ContractWizardTemplate>
    );
};