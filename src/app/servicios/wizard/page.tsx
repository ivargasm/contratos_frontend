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
    BloqueDeclaracionesPrestacionServicios,
    BloqueClausulasPrestacionServicios
} from '@/app/components/wizard/BloquesPrestacionServicios';

function ContratoPrestacionServiciosClient({ contractType }: { contractType: string }) {
    return (
        <ContractWizardTemplate
            contractType={contractType}
            title="Contrato de Prestación de Servicios Profesionales"
            rolPropietario="PRESTADOR"
            rolInteresado="CLIENTE"
            tipoContrato="PRESTACIÓN DE SERVICIOS"
            buttonText="Guardar y Generar Contrato"
        >
            {/* ORQUESTACIÓN DE BLOQUES */}
            <section><BloqueLugarFecha /></section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                <BloquePartes rolPropietario="PRESTADOR" rolInteresado="CLIENTE" tipoContrato="PRESTACIÓN DE SERVICIOS" />
            </section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                <BloqueDeclaracionesPrestacionServicios />
            </section>
            <p>EXPUESTO LO ANTERIOR, las partes acuerdan sujetarse a las siguientes:</p>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                <BloqueClausulasPrestacionServicios />
            </section>
            <hr className="border-border" />
            <p>Leído que fue el presente contrato y enteradas las partes de su contenido y alcance legal, lo firman por duplicado en la ciudad y fecha al principio indicadas.</p>
            <section>
                <BloqueFirmas rolPropietario="PRESTADOR" rolInteresado="CLIENTE" tipoContrato="PRESTACIÓN DE SERVICIOS" />
                <BloqueTestigos />
            </section>
        </ContractWizardTemplate>
    );
}

export default function ContratoPrestacionServiciosInteractivo({ params }: { params: { contract_type: string } }) {
    return <ContratoPrestacionServiciosClient contractType={params.contract_type || 'servicios'} />;
}