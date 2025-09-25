"use client";

import { useState } from 'react';

export default function DocsPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'getting-started': true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const contractTypes = [
    {
      name: "Compra-Venta",
      description: "Contratos para la transferencia de propiedad de bienes muebles e inmuebles",
      features: ["Bienes muebles e inmuebles", "Precios y formas de pago", "Garantías y saneamiento"]
    },
    {
      name: "Arrendamiento",
      description: "Contratos de renta para propiedades y bienes",
      features: ["Inmuebles y bienes muebles", "Rentas y depósitos", "Términos y condiciones"]
    },
    {
      name: "Comodato",
      description: "Préstamo gratuito de bienes para uso temporal",
      features: ["Préstamo sin costo", "Términos de devolución", "Responsabilidades"]
    },
    {
      name: "Prestación de Servicios",
      description: "Contratos para servicios profesionales y comerciales",
      features: ["Servicios profesionales", "Honorarios y pagos", "Términos de entrega"]
    },
    {
      name: "Confidencialidad",
      description: "Acuerdos de no divulgación de información confidencial",
      features: ["Protección de información", "Términos de confidencialidad", "Excepciones"]
    },
    {
      name: "Laboral",
      description: "Contratos de trabajo con todas las prestaciones de ley",
      features: ["Relaciones laborales", "Salarios y prestaciones", "Derechos y obligaciones"]
    }
  ];

  return (
    <div className="min-h-screen bg-background mt-12">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Documentación</h1>
          <p className="text-xl text-primary-foreground/90">
            Guía completa para usar EasyContract y generar contratos legales de forma sencilla
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabla de contenidos */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tabla de Contenidos</h2>
          <nav className="space-y-2">
            <a href="#getting-started" className="block text-primary hover:underline">1. Introducción</a>
            <a href="#how-it-works" className="block text-primary hover:underline">2. ¿Cómo funciona?</a>
            <a href="#contract-types" className="block text-primary hover:underline">3. Tipos de contratos</a>
            <a href="#pricing" className="block text-primary hover:underline">4. Precios y límites</a>
            <a href="#editing" className="block text-primary hover:underline">5. Edición de contratos</a>
            <a href="#account" className="block text-primary hover:underline">6. Gestión de cuenta</a>
            <a href="#faq" className="block text-primary hover:underline">7. Preguntas frecuentes</a>
          </nav>
        </div>

        {/* Sección 1: Introducción */}
        <section id="getting-started" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('getting-started')}
          >
            <span className="mr-2">{openSections['getting-started'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">1. Introducción</h2>
          </div>
          
          {openSections['getting-started'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">¿Qué es EasyContract?</h3>
              <p className="mb-4">
                EasyContract es una aplicación web diseñada para facilitar la creación de contratos legales 
                de manera sencilla y accesible. Está dirigida a personas que:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>No tienen conocimientos especializados en leyes</li>
                <li>No pueden costear los servicios de un abogado</li>
                <li>Necesitan generar contratos de forma rápida y confiable</li>
                <li>Buscan una solución económica para sus necesidades legales básicas</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Objetivo Principal</h4>
                <p className="text-blue-700">
                  Democratizar el acceso a documentos legales básicos, permitiendo que cualquier persona 
                  pueda crear contratos profesionales sin necesidad de conocimientos jurídicos especializados.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Sección 2: Cómo funciona */}
        <section id="how-it-works" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('how-it-works')}
          >
            <span className="mr-2">{openSections['how-it-works'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">2. ¿Cómo funciona?</h2>
          </div>
          
          {openSections['how-it-works'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Proceso paso a paso:</h3>
                  <ol className="list-decimal ml-6 space-y-3">
                    <li><strong>Registro:</strong> Crea tu cuenta gratuita</li>
                    <li><strong>Selección:</strong> Elige el tipo de contrato que necesitas</li>
                    <li><strong>Formulario:</strong> Completa los datos requeridos</li>
                    <li><strong>Vista previa:</strong> Revisa el contrato generado</li>
                    <li><strong>Descarga:</strong> Obtén tu contrato en formato PDF</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Características principales:</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Interfaz intuitiva y fácil de usar</li>
                    <li>Formularios guiados paso a paso</li>
                    <li>Vista previa en tiempo real</li>
                    <li>Contratos legalmente válidos</li>
                    <li>Descarga inmediata en PDF</li>
                    <li>Historial de contratos creados</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sección 3: Tipos de contratos */}
        <section id="contract-types" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('contract-types')}
          >
            <span className="mr-2">{openSections['contract-types'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">3. Tipos de contratos disponibles</h2>
          </div>
          
          {openSections['contract-types'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-6">
                EasyContract ofrece 6 tipos de contratos diferentes, cada uno adaptado a necesidades específicas:
              </p>
              
              <div className="grid gap-6">
                {contractTypes.map((contract, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{contract.name}</h3>
                    <p className="text-muted-foreground mb-3">{contract.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Incluye:</h4>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        {contract.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Sección 4: Precios */}
        <section id="pricing" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('pricing')}
          >
            <span className="mr-2">{openSections['pricing'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">4. Precios y límites</h2>
          </div>
          
          {openSections['pricing'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">🆓 Plan Gratuito</h3>
                  <ul className="space-y-2 text-green-700">
                    <li><strong>2 contratos gratuitos</strong> al registrarte</li>
                    <li>Acceso a todos los tipos de contrato</li>
                    <li>Descarga inmediata en PDF</li>
                    <li>Edición por 48 horas</li>
                    <li>Descarga permanente</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">💳 Contratos Adicionales</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li><strong>$500 MXN por contrato</strong></li>
                    <li>Pago seguro con Stripe</li>
                    <li>Mismas características que el plan gratuito</li>
                    <li>Sin límite de contratos</li>
                    <li>Facturación disponible</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante</h4>
                <p className="text-yellow-700">
                  Una vez agotados tus 2 contratos gratuitos, necesitarás comprar contratos adicionales 
                  para continuar usando el servicio. Cada compra te da derecho a generar un contrato adicional.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Sección 5: Edición */}
        <section id="editing" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('editing')}
          >
            <span className="mr-2">{openSections['editing'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">5. Edición de contratos</h2>
          </div>
          
          {openSections['editing'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Ventana de edición de 48 horas</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">✅ Dentro de las 48 horas:</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Puedes editar todos los campos del contrato</li>
                    <li>Regenerar el PDF con los cambios</li>
                    <li>Descargar las versiones actualizadas</li>
                    <li>Hacer tantos cambios como necesites</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">❌ Después de 48 horas:</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>No se puede editar el contrato</li>
                    <li>El contrato queda &quot;bloqueado&quot;</li>
                    <li>Solo disponible para descarga</li>
                    <li>Necesitarías crear un nuevo contrato</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Consejo</h4>
                <p className="text-blue-700">
                  Revisa cuidadosamente tu contrato antes de que expire el período de edición. 
                  Puedes usar la función de vista previa para verificar que toda la información sea correcta.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Sección 6: Gestión de cuenta */}
        <section id="account" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('account')}
          >
            <span className="mr-2">{openSections['account'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">6. Gestión de cuenta</h2>
          </div>
          
          {openSections['account'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Panel de usuario</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">📊 Dashboard</h4>
                  <p className="text-muted-foreground">
                    Ve el resumen de tu cuenta: contratos creados, contratos disponibles y último contrato generado.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">📄 Mis Contratos</h4>
                  <p className="text-muted-foreground">
                    Lista completa de todos tus contratos con opciones para descargar y editar (si están dentro del período permitido).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">⚙️ Configuración</h4>
                  <p className="text-muted-foreground">
                    Actualiza tu información personal, cambia tu contraseña y gestiona la configuración de tu cuenta.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">💳 Comprar contratos</h4>
                  <p className="text-muted-foreground">
                    Botón directo para comprar contratos adicionales cuando hayas agotado tu límite gratuito.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sección 7: FAQ */}
        <section id="faq" className="mb-12">
          <div 
            className="flex items-center cursor-pointer mb-4"
            onClick={() => toggleSection('faq')}
          >
            <span className="mr-2">{openSections['faq'] ? '▼' : '▶'}</span>
            <h2 className="text-2xl font-bold">7. Preguntas frecuentes</h2>
          </div>
          
          {openSections['faq'] && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">¿Los contratos son legalmente válidos?</h4>
                  <p className="text-muted-foreground">
                    Sí, todos los contratos están basados en marcos legales vigentes y son válidos ante la ley. 
                    Sin embargo, recomendamos consultar con un abogado para casos complejos.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">¿Puedo usar mis contratos gratuitos en cualquier momento?</h4>
                  <p className="text-muted-foreground">
                    Sí, no hay límite de tiempo para usar tus 2 contratos gratuitos. Puedes usarlos cuando los necesites.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">¿Qué pasa si necesito más de 2 contratos?</h4>
                  <p className="text-muted-foreground">
                    Puedes comprar contratos adicionales por $500 MXN cada uno. El pago es seguro a través de Stripe.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">¿Puedo descargar mis contratos después de las 48 horas?</h4>
                  <p className="text-muted-foreground">
                    Sí, siempre podrás descargar tus contratos. Solo la edición se bloquea después de 48 horas.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">¿Ofrecen soporte técnico?</h4>
                  <p className="text-muted-foreground">
                    Sí, puedes contactarnos a través del formulario de contacto para cualquier duda técnica o problema con la plataforma.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Call to action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para crear tu primer contrato?</h2>
          <p className="mb-6">
            Regístrate gratis y obtén 2 contratos sin costo para empezar.
          </p>
          <div className="space-x-4">
            <a 
              href="/auth/register" 
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Registrarse Gratis
            </a>
            <a 
              href="/contract-selector" 
              className="inline-block border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Ver Contratos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}