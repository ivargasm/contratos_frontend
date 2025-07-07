// components/wizard/WizardContrato.tsx
"use client"

import { useState } from "react"
import { InfoGeneral, DataInfoGeneral } from "../../components/wizard/InfoGeneral"
import { Propietario, DataPropietario } from "../../components/wizard/Propietario"
import { Interesado, DataInteresado } from "../../components/wizard/Interesado"
import { InfoConfidencial, DatosInfoConfidencial } from "../../components/wizard/InfoConfidencialidad"
import { Excepciones, DatosExcepciones } from "../../components/wizard/Excepciones"
import { Plazos, DatosPlazos } from "../../components/wizard/Plazos"
import { ObligacionesPropietario, DatosObligacionesPropietario } from "@/app/components/wizard/ObligacionesPropietario"
import { ObligacionesInteresado, DatosObligacionesInteresado } from "@/app/components/wizard/ObligacionesInteresado"
import { Jurisdiccion, DataJurisdiccion } from "@/app/components/wizard/Jurisdiccion"
import { TestigosData, Testigos } from "@/app/components/wizard/Testigos"
import { Revision } from "@/app/components/wizard/Revision"
import { useContratoStore } from "@/app/store/useContratoStore"

interface FormData extends DataInfoGeneral, DataPropietario, DataInteresado, DatosInfoConfidencial, DatosExcepciones, DatosPlazos, DatosObligacionesPropietario, DatosObligacionesInteresado, DataJurisdiccion, TestigosData { }

export const WizardContrato = () => {
    const [step, setStep] = useState(1)
    const { formData, setFormData } = useContratoStore()

    const handleNext = (data: Partial<FormData>) => {
        // Ensure all values are strings (no undefined)
        const sanitizedData = Object.fromEntries(
            Object.entries({ ...formData, ...data }).map(([key, value]) => [key, value === undefined ? "" : value])
        ) as Record<string, string>;
        setFormData(sanitizedData)
        setStep((prev) => prev + 1)
    }

    const handleBack = () => setStep((prev) => prev - 1)

    return (
        <div className="w-[100%] md:w-[50%] flex items-center justify-center py-12 px-4">
            {step === 1 && (
                <InfoGeneral
                    onNext={(data: DataInfoGeneral) => handleNext(data as Partial<FormData>)}
                    defaultData={formData as unknown as DataInfoGeneral}
                />
            )}
            {step === 2 && (
                <Propietario onNext={(data: DataPropietario) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DataPropietario} />
            )}
            {step === 3 && (
                <Interesado onNext={(data: DataInteresado) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DataInteresado} />
            )}
            {step === 4 && (
                <InfoConfidencial onNext={(data: DatosInfoConfidencial) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DatosInfoConfidencial} />
            )}
            {step === 5 && (
                <Excepciones onNext={(data: DatosExcepciones) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DatosExcepciones} />
            )}
            {step === 6 && (
                <Plazos onNext={(data: DatosPlazos) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DatosPlazos} />
            )}
            {step === 7 && (
                <ObligacionesPropietario onNext={(data: DatosObligacionesPropietario) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DatosObligacionesPropietario} />
            )}
            {step === 8 && (
                <ObligacionesInteresado onNext={(data: DatosObligacionesInteresado) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DatosObligacionesInteresado} />
            )}
            {step === 9 && (
                <Jurisdiccion onNext={(data: DataJurisdiccion) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as DataJurisdiccion} />
            )}
            {step === 10 && (
                <Testigos onNext={(data: TestigosData) => handleNext(data as Partial<FormData>)} onBack={handleBack} defaultData={formData as unknown as TestigosData} />
            )}
            {step === 11 && (
                <Revision onBack={handleBack} />
            )}
        </div>
    )
}
