import React from 'react';
import { useContratoStore } from '@/app/store/useContratoStore';
import { InlineInput, InlineTextArea } from '@/app/components/ui/InlineComponents';

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: ANTECEDENTES DE CONFIDENCIALIDAD
// ------------------------------------------------------------------
export const BloqueAntecedentesConfidencialidad = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <h2 className="text-2xl font-bold text-title">Antecedentes</h2>
            <p>
                <span className="font-bold">I.</span> Que &quot;Las Partes&quot; tienen la intención de entablar discusiones y negociaciones relacionadas con:
            </p>
            <div className="bg-muted p-4 rounded-md mt-2">
                <InlineTextArea 
                    value={typeof contratoActual?.form_data?.proposito_acuerdo === 'string' ? contratoActual.form_data.proposito_acuerdo : ''} 
                    onChange={handleTextAreaChange('proposito_acuerdo')} 
                    placeholder="[Describir el propósito, ej: una posible relación comercial, un proyecto de desarrollo, una inversión, etc.]" 
                    rows={3}
                />
            </div>
            <p>(en lo sucesivo, el &quot;Propósito Permitido&quot;).</p>
            
            <p>
                <span className="font-bold">II.</span> Que para la consecución del &quot;Propósito Permitido&quot;, &quot;Las Partes&quot; prevén la necesidad de intercambiar cierta información que es de carácter confidencial y de propiedad exclusiva de cada una de ellas, por lo que desean establecer los términos y condiciones bajo los cuales dicha información será protegida.
            </p>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: DECLARACIONES DE CONFIDENCIALIDAD
// ------------------------------------------------------------------
export const BloqueDeclaracionesConfidencialidad = () => {
    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <p>
                    <span className="font-bold">ÚNICA.-</span> &quot;Las Partes&quot; declaran y se reconocen mutuamente, con la personalidad jurídica con la que cada una comparece, tener la capacidad legal y la autoridad suficiente para suscribir y obligarse en los términos del presente Acuerdo.
                </p>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// BLOQUE ESPECÍFICO: CLÁUSULAS DE CONFIDENCIALIDAD
// ------------------------------------------------------------------
export const BloqueClausulasConfidencialidad = () => {
    const { contratoActual, updateContratoFormData } = useContratoStore();
    
    const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateContratoFormData(key, e.target.value);
    };
    
    const handleTextAreaChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateContratoFormData(key, e.target.value);
    };

    return (
        <div className="space-y-6 text-lg leading-relaxed">
            <div>
                <p><span className="font-bold">PRIMERA.- INFORMACIÓN CONFIDENCIAL.</span> Para los efectos de este Acuerdo, se entenderá como &quot;Información Confidencial&quot; toda información divulgada por una de las partes (la &quot;Parte Divulgadora&quot;) a la otra (la &quot;Parte Receptora&quot;), ya sea de forma oral, visual, escrita, electrónica o en cualquier otro medio, que incluya, de manera enunciativa mas no limitativa:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Secretos comerciales</li>
                    <li>Información confidencial</li>
                    <li>Know-how</li>
                    <li>Invenciones</li>
                    <li>Procesos</li>
                    <li>Fórmulas</li>
                    <li>Código fuente</li>
                    <li>Datos técnicos</li>
                    <li>Diseños</li>
                    <li>Planes de negocio</li>
                    <li>Información financiera</li>
                    <li>Listas de clientes</li>
                    <li>Estrategias de marketing</li>
                    {(typeof contratoActual?.form_data?.categorias_informacion === 'string' ? contratoActual.form_data.categorias_informacion : '') && 
                        (typeof contratoActual?.form_data?.categorias_informacion === 'string' ? contratoActual.form_data.categorias_informacion : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                    <li>Cualquier otra información que sea designada como confidencial o que por su naturaleza deba ser considerada como tal.</li>
                </ul>
                <div className="mt-4">
                    <p className="font-bold mb-2">Categorías adicionales de información confidencial:</p>
                    <InlineTextArea value={typeof contratoActual?.form_data?.categorias_informacion === 'string' ? contratoActual.form_data.categorias_informacion : ''} onChange={handleTextAreaChange('categorias_informacion')} placeholder="Agregar categorías específicas de información confidencial (una por línea)" rows={3}/>
                </div>
            </div>
            
            <div>
                <p><span className="font-bold">SEGUNDA.- OBLIGACIONES DE LA PARTE RECEPTORA.</span> Cada &quot;Parte Receptora&quot; se obliga a:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>....</li>
                </ul>
            </div>

            <div>
                <p><span className="font-bold">TERCERA.- EXCEPCIONES.</span> Las obligaciones de confidencialidad no aplicarán a aquella información que la &quot;Parte Receptora&quot; pueda demostrar fehacientemente:</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Era de dominio público al momento de su divulgación o pasó a serlo sin que mediara incumplimiento de este Acuerdo.</li>
                    <li>Ya estaba en su posesión de forma legítima y sin restricciones de confidencialidad antes de recibirla de la &quot;Parte Divulgadora&quot;.</li>
                    <li>Fue desarrollada de forma independiente por la &quot;Parte Receptora&quot; sin acceso o referencia a la &quot;Información Confidencial&quot;.</li>
                    <li>Fue recibida legítimamente de un tercero sin obligación de confidencialidad.</li>
                    {(typeof contratoActual?.form_data?.excepciones === 'string' ? contratoActual.form_data.excepciones : '') && 
                        (typeof contratoActual?.form_data?.excepciones === 'string' ? contratoActual.form_data.excepciones : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))
                    }
                </ul>
                <div className="mt-4">
                    <p className="font-bold mb-2">Excepciones adicionales:</p>
                    <InlineTextArea value={typeof contratoActual?.form_data?.excepciones === 'string' ? contratoActual.form_data.excepciones : ''} onChange={handleTextAreaChange('excepciones')} placeholder="Agregar excepciones específicas (una por línea)" rows={3}/>
                </div>
            </div>

            <div>
                <p><span className="font-bold">CUARTA.- DIVULGACIÓN REQUERIDA POR LEY....</span></p>
            </div>

            <div>
                <p><span className="font-bold">QUINTA.- NO OTORGAMIENTO DE DERECHOS....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SEXTA.- DEVOLUCIÓN O DESTRUCCIÓN....</span></p>
            </div>

            <div>
                <p><span className="font-bold">SÉPTIMA.- VIGENCIA Y TERMINACIÓN.</span> El presente Acuerdo entrará en vigor en la fecha de su firma y permanecerá vigente por un período de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.duracion === 'string' ? contratoActual.form_data.duracion : ''} onChange={handleChange('duracion')} placeholder="un (1) año" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> a partir del <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_inicio === 'string' ? contratoActual.form_data.fecha_inicio : ''} onChange={handleChange('fecha_inicio')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span> y hasta el <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.fecha_fin === 'string' ? contratoActual.form_data.fecha_fin : ''} onChange={handleChange('fecha_fin')} placeholder="[Día de Mes de Año]" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>.</p>
            </div>

            <div>
                <p><span className="font-bold">OCTAVA.- INEXISTENCIA DE OBLIGACIÓN....</span></p>
            </div>
            
            <div>
                <p><span className="font-bold">NOVENA.- INCUMPLIMIENTO....</span></p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA.- ACUERDO COMPLETO.</span> Este documento constituye el acuerdo íntegro entre &quot;Las Partes&quot; en relación con la materia de confidencialidad y sustituye cualquier negociación o acuerdo previo, oral o escrito.</p>
            </div>

            <div>
                <p><span className="font-bold">DÉCIMA PRIMERA.- JURISDICCIÓN Y LEY APLICABLE.</span> Para la interpretación y cumplimiento de este Acuerdo, &quot;Las Partes&quot; se someten expresamente a las leyes aplicables de México y a la jurisdicción de los tribunales competentes en la ciudad de <span className="font-bold"><InlineInput value={typeof contratoActual?.form_data?.ciudad_jurisdiccion === 'string' ? contratoActual.form_data.ciudad_jurisdiccion : ''} onChange={handleChange('ciudad_jurisdiccion')} placeholder="Santiago de Querétaro, Querétaro" widthClass="" disabled={contratoActual?.status === 'finalizado'}/></span>, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
            </div>
            {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '') && (
                <div>
                    <p><span className="font-bold">DÉCIMA SEGUNDA.- CLÁUSULAS ADICIONALES.</span></p>
                    <ul className="list-disc ml-6">
                        {(typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : '').split('\n').map((item: string, index: number) => (
                            item.trim() && <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <p><span className="font-bold">Cláusulas Adicionales:</span></p>
                <InlineTextArea value={typeof contratoActual?.form_data?.clausulas_adicionales === 'string' ? contratoActual.form_data.clausulas_adicionales : ''} onChange={handleTextAreaChange('clausulas_adicionales')} placeholder="Agregar cláusulas adicionales (una por línea)" rows={4}/>
            </div>
        </div>
    );
};