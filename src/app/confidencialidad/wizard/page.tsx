import ProtectedRoute from "@/app/components/ProtectedRoutes"
import { WizardContrato } from "./WizardContrato"

export default function ConfidencialidadWizard() {
    return (
        <section className="w-full min-h-[100vh] flex items-center justify-center">
            <ProtectedRoute>
                <WizardContrato />        

            </ProtectedRoute>

        </section>
    )
}
