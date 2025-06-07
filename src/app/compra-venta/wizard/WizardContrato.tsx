// components/wizard/WizardContrato.tsx
"use client"

import { useState } from "react"
import { InfoGeneral, DataInfoGeneral } from "../../components/wizard/InfoGeneral"
import { Propietario, DataPropietario } from "../../components/wizard/Propietario"
import { Interesado, DataInteresado } from "../../components/wizard/Interesado"
import { Bien, DatosBien } from "../../components/wizard/Bien"
import { Pago, DataPago } from "../../components/wizard/Pago"
import { EntregaBien, DatosEntregaBien } from "../../components/wizard/EntregaBien"
import { ClausulasAdicionales, DataClausulasAdicionales } from "../../components/wizard/ClausulasAdicionales"
import { GarantiasAdicionales, DataGarantiasAdicionales } from "../../components/wizard/GarantiasAdicionales"
import { ObligacionesPropietario, DatosObligacionesPropietario } from "@/app/components/wizard/ObligacionesPropietario"
import { ObligacionesInteresado, DatosObligacionesInteresado } from "@/app/components/wizard/ObligacionesInteresado"
import { IncumplimientoContrato, DataIncumplimientoContrato } from "@/app/components/wizard/IncumplimientoContrato"
import { Jurisdiccion, DataJurisdiccion } from "@/app/components/wizard/Jurisdiccion"
import { TestigosData, Testigos } from "@/app/components/wizard/Testigos"
import { Revision } from "@/app/components/wizard/Revision"
import { useContratoStore } from "@/app/store/useContratoStore"

interface FormData extends DataInfoGeneral, DataPropietario, DataInteresado, DatosBien, DataPago, DatosEntregaBien, DataGarantiasAdicionales, DatosObligacionesPropietario, DatosObligacionesInteresado, DataIncumplimientoContrato, DataJurisdiccion, DataClausulasAdicionales, TestigosData { }

export const WizardContrato = () => {
    const [step, setStep] = useState(1)
    const { formData, setFormData } = useContratoStore()

    const handleNext = (data: Partial<FormData>) => {
        setFormData({ ...formData, ...data })
        setStep((prev) => prev + 1)
    }

    const handleBack = () => setStep((prev) => prev - 1)

    return (
        <div className="w-[100%] md:w-[50%] flex items-center justify-center py-12 px-4">
            {step === 1 && (
                <InfoGeneral onNext={handleNext} defaultData={formData as unknown as DataInfoGeneral} />
            )}
            {step === 2 && (
                <Propietario onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataPropietario} />
            )}
            {step === 3 && (
                <Interesado onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataInteresado} />
            )}
            {step === 4 && (
                <Bien onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DatosBien} />
            )}
            {step === 5 && (
                <Pago onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataPago} />
            )}
            {step === 6 && (
                <EntregaBien onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DatosEntregaBien} />
            )}
            {step === 7 && (
                <GarantiasAdicionales onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataGarantiasAdicionales} />
            )}
            {step === 8 && (
                <ObligacionesPropietario onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DatosObligacionesPropietario} />
            )}
            {step === 9 && (
                <ObligacionesInteresado onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DatosObligacionesInteresado} />
            )}
            {step === 10 && (
                <IncumplimientoContrato onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataIncumplimientoContrato} />
            )}
            {step === 11 && (
                <Jurisdiccion onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataJurisdiccion} />
            )}
            {step === 12 && (
                <ClausulasAdicionales onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as DataClausulasAdicionales} />
            )}
            {step === 13 && (
                <Testigos onNext={handleNext} onBack={handleBack} defaultData={formData as unknown as TestigosData} />
            )}
            {step === 14 && (
                <Revision onBack={handleBack} />
            )}
        </div>
    )
}
