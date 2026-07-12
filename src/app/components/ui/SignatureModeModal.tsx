import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SignerRequest {
    name: string;
    email: string;
    role: string;
}

export interface AutoSigner {
    id: number;
    name: string;
    role: string;
}

interface SignatureModeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: (mode: 'tradicional' | 'electronica', signers?: SignerRequest[], autoSignerId?: number | null) => void;
    isProPlan: boolean;
    contractRoles?: string[]; // e.g. ["Vendedor", "Comprador"]. Si es vacío o undefined, permite agregar dinámicamente.
    buttonText?: string;
    autoSigners?: AutoSigner[];
}

export const SignatureModeModal: React.FC<SignatureModeModalProps> = ({ isOpen, onClose, onContinue, isProPlan, contractRoles, buttonText = "Continuar al Aviso Legal", autoSigners = [] }) => {
    const [mode, setMode] = useState<'tradicional' | 'electronica'>('tradicional');
    const isDynamic = !contractRoles || contractRoles.length === 0;
    
    const [signers, setSigners] = useState<SignerRequest[]>([]);
    const [selectedAutoSigner, setSelectedAutoSigner] = useState<number | null>(null);

    useEffect(() => {
        if (!isDynamic) {
            setSigners(contractRoles.map(role => ({ name: '', email: '', role })));
        } else {
            // Un firmante por defecto si es dinámico
            setSigners([{ name: '', email: '', role: '' }]);
        }
    }, [contractRoles, isDynamic, isOpen]);

    if (!isOpen) return null;

    const handleSignerChange = (index: number, field: keyof SignerRequest, value: string) => {
        const updated = [...signers];
        updated[index][field] = value;
        setSigners(updated);
    };

    const addSigner = () => {
        setSigners([...signers, { name: '', email: '', role: '' }]);
    };

    const removeSigner = (index: number) => {
        setSigners(signers.filter((_, i) => i !== index));
    };

    const handleContinue = () => {
        if (mode === 'electronica') {
            const allFilled = signers.every(s => s.name.trim() !== '' && s.email.trim() !== '' && (isDynamic ? s.role.trim() !== '' : true));
            if (!allFilled) {
                toast.error("Por favor, llena todos los datos de los firmantes.");
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const allValidEmails = signers.every(s => emailRegex.test(s.email.trim()));
            if (!allValidEmails) {
                toast.error("Por favor, ingresa correos electrónicos válidos.");
                return;
            }

            if (signers.length === 0 && !selectedAutoSigner) {
                toast.error("Debes agregar al menos un firmante o seleccionar una firma automática.");
                return;
            }
            onContinue(mode, signers, selectedAutoSigner);
        } else {
            onContinue(mode);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Elige el Modo de Firma</h2>
                
                <div className="space-y-4 mb-6">
                    {/* Tradicional */}
                    <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${mode === 'tradicional' ? 'border-primary bg-primary/10' : 'border-border'}`}
                        onClick={() => setMode('tradicional')}
                    >
                        <h3 className="font-bold text-lg text-foreground">🖋️ Firma Tradicional</h3>
                        <p className="text-muted-foreground text-sm mt-1">Generar documento en blanco para imprimir y firmar con pluma.</p>
                    </div>

                    {/* Electrónica */}
                    <div 
                        className={`border rounded-lg p-4 transition-colors relative ${mode === 'electronica' ? 'border-primary bg-primary/10' : 'border-border'} ${!isProPlan ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => { if (isProPlan) setMode('electronica'); }}
                    >
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                            💻 Firma Electrónica 
                            {!isProPlan && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Exclusivo PRO</span>}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">Envía el documento por correo a los involucrados para que lo firmen digitalmente desde su celular o computadora.</p>
                        
                        {mode === 'electronica' && isProPlan && (
                            <div className="mt-4 space-y-4 bg-background p-4 border rounded-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-sm">Datos de los Firmantes</h4>
                                    {isDynamic && (
                                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); addSigner(); }}>
                                            <Plus className="w-4 h-4 mr-1" /> Agregar
                                        </Button>
                                    )}
                                </div>
                                
                                {autoSigners.length > 0 && (
                                    <div className="mb-4 bg-primary/5 p-3 rounded-md border border-primary/20">
                                        <label className="block text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Inyectar Firma Automática (Opcional)</label>
                                        <select 
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            value={selectedAutoSigner || ""}
                                            onChange={(e) => setSelectedAutoSigner(e.target.value ? parseInt(e.target.value) : null)}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="">-- No inyectar --</option>
                                            {autoSigners.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                                            ))}
                                        </select>
                                        <p className="text-[11px] text-muted-foreground mt-1">Si seleccionas un perfil, el contrato se firmará automáticamente a su nombre al generarse.</p>
                                    </div>
                                )}
                                
                                {signers.map((signer, i) => (
                                    <div key={i} className="flex gap-2 flex-col sm:flex-row items-end sm:items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-100 dark:border-gray-700">
                                        <div className="flex-1 space-y-2 w-full">
                                            {isDynamic && (
                                                <Input 
                                                    placeholder="Rol (ej. Cliente, Representante)"
                                                    value={signer.role}
                                                    onChange={(e) => handleSignerChange(i, 'role', e.target.value)}
                                                    className="w-full text-sm h-8"
                                                />
                                            )}
                                            <div className="flex gap-2">
                                                <Input 
                                                    placeholder={isDynamic ? "Nombre" : `Nombre del ${signer.role}`}
                                                    value={signer.name}
                                                    onChange={(e) => handleSignerChange(i, 'name', e.target.value)}
                                                    className="flex-1 h-9"
                                                />
                                                <Input 
                                                    type="email"
                                                    placeholder="Correo Electrónico"
                                                    value={signer.email}
                                                    onChange={(e) => handleSignerChange(i, 'email', e.target.value)}
                                                    className="flex-1 h-9"
                                                />
                                            </div>
                                        </div>
                                        {isDynamic && signers.length > 1 && (
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); removeSigner(i); }}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleContinue}>{buttonText}</Button>
                </div>
            </div>
        </div>
    );
};
