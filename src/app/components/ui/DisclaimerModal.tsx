import React, { useState } from 'react';

interface DisclaimerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void | Promise<void>;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, onAccept }) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleAccept = async () => {
        if (isAccepted && !isLoading) {
            setIsLoading(true);
            try {
                await onAccept();
            } finally {
                setIsLoading(false);
                setIsAccepted(false); // Reset para próxima vez
            }
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setIsAccepted(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-red-600">⚠️ Aviso Importante: ¡Esto no es Asesoría Legal!</h2>
                        <button 
                            onClick={handleClose}
                            disabled={isLoading}
                            className={`text-2xl font-bold transition-colors ${
                                isLoading 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="space-y-4 text-foreground">
                        <p className="text-lg font-medium">Antes de continuar, por favor, lee y acepta los siguientes puntos:</p>
                        
                        <div className="space-y-4">
                            <div className="border-l-4 border-yellow-500 pl-4">
                                <h3 className="font-bold text-lg">1. Somos una Herramienta, no un Abogado.</h3>
                                <p>Esta aplicación te ayuda a generar documentos legales basados en la información que proporcionas. <span className="font-bold text-red-600">NO ofrecemos asesoría legal</span> ni sustituimos la consulta con un abogado calificado.</p>
                            </div>
                            
                            <div className="border-l-4 border-orange-500 pl-4">
                                <h3 className="font-bold text-lg">2. El Documento es Tu Responsabilidad.</h3>
                                <p>Tú eres el único responsable de que el contrato generado se ajuste a tus necesidades específicas y sea legalmente válido para tu situación. Las leyes pueden variar y tu caso puede tener circunstancias únicas que esta herramienta no contemple.</p>
                            </div>
                            
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="font-bold text-lg">3. No hay Relación Abogado-Cliente.</h3>
                                <p>El uso de este servicio no crea una relación abogado-cliente. Tus datos no están protegidos por el secreto profesional.</p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg mt-6">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isAccepted}
                                    onChange={(e) => setIsAccepted(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <span className="text-sm font-medium">
                                    He leído, entiendo y acepto estos términos.
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
                                isLoading 
                                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleAccept}
                            disabled={!isAccepted || isLoading}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                                isAccepted && !isLoading
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isLoading && (
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span>{isLoading ? 'Preparando contrato...' : 'Acepto y Continuar'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};