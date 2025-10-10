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
    BloqueAntecedentesConfidencialidad,
    BloqueDeclaracionesConfidencialidad,
    BloqueClausulasConfidencialidad
} from '@/app/components/wizard/BloquesConfidencialidad';

function AcuerdoConfidencialidadClient({ contractType }: { contractType: string }) {
    return (
        <ContractWizardTemplate
            contractType={contractType}
            title="Acuerdo de Confidencialidad"
            rolPropietario="PARTE DIVULGADORA"
            rolInteresado="PARTE RECEPTORA"
            tipoContrato="CONFIDENCIALIDAD"
            buttonText="Guardar y Generar Acuerdo"
        >
            {/* ORQUESTACIÓN DE BLOQUES */}
            <section><BloqueLugarFecha /></section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                <BloquePartes rolPropietario="PARTE DIVULGADORA" rolInteresado="PARTE RECEPTORA" tipoContrato="CONFIDENCIALIDAD" />
            </section>
            <hr className="border-border" />
            <p>Ambas partes, en lo sucesivo denominadas conjuntamente como &quot;Las Partes&quot;, celebran el presente <span className="font-bold">ACUERDO DE CONFIDENCIALIDAD</span>, sujeto a los siguientes antecedentes y cláusulas:</p>
            <section>
                <BloqueAntecedentesConfidencialidad />
            </section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                <BloqueDeclaracionesConfidencialidad />
            </section>
            <p>En virtud de lo anterior, &quot;Las Partes&quot; acuerdan sujetarse a las siguientes:</p>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                <BloqueClausulasConfidencialidad />
            </section>
            <hr className="border-border" />
            <p>Habiendo leído y entendido el presente Acuerdo, y en señal de plena conformidad con su contenido y alcance legal, &quot;Las Partes&quot; lo suscriben por duplicado en el lugar y fecha indicados al principio de este documento.</p>
            <section>
                <BloqueFirmas rolPropietario="PARTE DIVULGADORA" rolInteresado="PARTE RECEPTORA" tipoContrato="CONFIDENCIALIDAD" />
                <BloqueTestigos />
            </section>
        </ContractWizardTemplate>
    );
}

export default function AcuerdoConfidencialidadInteractivo({ params }: { params: { contract_type: string } }) {
    return <AcuerdoConfidencialidadClient contractType={params.contract_type || 'confidencialidad'} />;
}