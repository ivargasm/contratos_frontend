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
    BloqueDeclaracionesCompraVenta,
    BloqueClausulasCompraVenta
} from '@/app/components/wizard/BloquesCompraVenta';
import { InlineSelectWithChildren } from '@/app/components/ui/InlineComponents';
import { useContratoStore } from '@/app/store/useContratoStore';

export default function ContratoCompraVentaInteractivo({ params }: { params: { contract_type: string } }) {
    const { contratoActual, updateContratoFormData } = useContratoStore();

    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <ContractWizardTemplate
            contractType={params.contract_type || 'compra-venta'}
            title="Contrato de Compra-Venta"
            rolPropietario="EL VENDEDOR"
            rolInteresado="EL COMPRADOR"
            tipoContrato="COMPRAVENTA"
            buttonText="Guardar y Generar Contrato"
        >
            {/* Sección para seleccionar el tipo de bien */}
            <div className="bg-muted p-4 rounded-md">
                <label className="font-bold text-lg text-foreground mr-4">Tipo de bien a vender:</label>
                <InlineSelectWithChildren 
                    value={typeof contratoActual?.form_data?.tipo_bien === 'string' ? contratoActual.form_data.tipo_bien : ''} 
                    onChange={handleSelectChange('tipo_bien')} 
                    widthClass=""
                    disabled={contratoActual?.status === 'finalizado'}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Mueble">Bien Mueble (Ej: Coche, Muebles)</option>
                    <option value="Inmueble">Bien Inmueble (Ej: Casa, Terreno)</option>
                </InlineSelectWithChildren>
            </div>

            {/* ORQUESTACIÓN DE BLOQUES */}
            <section><BloqueLugarFecha /></section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Comparecientes</h2>
                <BloquePartes rolPropietario="EL VENDEDOR" rolInteresado="EL COMPRADOR" tipoContrato="COMPRAVENTA" />
            </section>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Declaraciones</h2>
                <BloqueDeclaracionesCompraVenta />
            </section>
            <p>EXPUESTO LO ANTERIOR, las partes se sujetan al tenor de las siguientes:</p>
            <hr className="border-border" />
            <section>
                <h2 className="text-2xl font-bold text-title mb-4">Cláusulas</h2>
                <BloqueClausulasCompraVenta />
            </section>
            <hr className="border-border" />
            <p>Leído que fue el presente contrato por ambas partes y enteradas de su contenido y alcance legal, lo firman en señal de conformidad por duplicado en el lugar y fecha al principio indicados.</p>
            <section>
                <BloqueFirmas rolPropietario="EL VENDEDOR" rolInteresado="EL COMPRADOR" tipoContrato="COMPRAVENTA" />
                <BloqueTestigos />
            </section>
        </ContractWizardTemplate>
    );
};