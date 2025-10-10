"use client";

import { useState, useEffect, Suspense } from 'react';
import { useAuthStore } from "../store/Store";
import { useContratoStore, ContratoCompleto } from "../store/useContratoStore";
import { createPaymentLink, downloadContract, getContracts, getContractDetails, getAvailableContracts, changePassword } from "../lib/api";
import ProtectedRoute from "../components/ProtectedRoutes";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function ProfileContent() {
  const { user, logout, url } = useAuthStore();
  const { setContratoActual } = useContratoStore();
  const [contracts, setContracts] = useState<ContratoCompleto[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [formDataProfile, setFormDataProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const searchParams = useSearchParams();
  const [availableContracts, setAvailableContracts] = useState<number | null>(null);
  const router = useRouter();

  // --- Efecto para mostrar mensaje de éxito tras el pago ---
  useEffect(() => {
      const paymentStatus = searchParams.get('payment_status');
      if (paymentStatus === 'success') {
          toast.success("¡Pago exitoso! Tu contrato se ha creado y aparecerá en la lista en breve.");
          router.replace('/profile', { scroll: false });
      }
      else if (paymentStatus === 'cancelled') {
          toast.error("El pago fue cancelado. No se ha creado ningún contrato.");
          router.replace('/profile', { scroll: false });
      }
  }, [searchParams, router]);


  // Simular carga de contratos
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts(useAuthStore.getState().url);
        // const contractsData = Array.isArray(data) ? data : [];
        setContracts(data);

        const available = await getAvailableContracts(useAuthStore.getState().url);
        setAvailableContracts(available);
      } catch (error) {
        console.error('Error al obtener contratos o contador:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // NUEVO: Manejador para la edición desde el perfil
  const handleEditContract = async (contractId: number, tipoContrato: string) => {
    try {
        toast.loading("Cargando borrador...");
        // 1. Hacemos el fetch para obtener los datos COMPLETOS del contrato
        const contractDetails = await getContractDetails(useAuthStore.getState().url, contractId);
        
        // 2. Guardamos el objeto completo en el store
        setContratoActual(contractDetails);
        
        toast.dismiss();
        toast.success("Borrador cargado, redirigiendo...");
        
        // 3. Navegamos a la página del wizard
        router.push(`/${tipoContrato}/wizard`);

    } catch (error) {
        toast.dismiss();
        toast.error((error as Error).message || "No se pudo cargar el contrato para editar.");
        console.error("Error al obtener el contrato para editar:", error);
    }
  };

  const handleNewVersion = async (contractId: number) => {
        try {
            toast.loading("Creando enlace de pago...");
            const paymentUrl = await createPaymentLink(url, "new_version", contractId);
            toast.dismiss();
            window.location.href = paymentUrl; // Redirigir al usuario a Stripe
        } catch {
            toast.dismiss();
            toast.error("No se pudo iniciar el proceso de pago.");
        }
    };

    const handleDuplicate = async (contractId: number) => {
        try {
            toast.loading("Creando enlace de pago...");
            const paymentUrl = await createPaymentLink(url, "duplicate", contractId);
            toast.dismiss();
            window.location.href = paymentUrl; // Redirigir al usuario a Stripe
        } catch {
            toast.dismiss();
            toast.error("No se pudo iniciar el proceso de pago.");
        }
    };

    const handleBuyNew = async () => {
        try {
            toast.loading("Creando enlace de pago...");
            // Para un contrato nuevo, no necesitamos un ID de contrato original
            const paymentUrl = await createPaymentLink(url, "new");
            toast.dismiss();
            window.location.href = paymentUrl;
        } catch {
            toast.dismiss();
            toast.error("No se pudo iniciar el proceso de pago.");
        }
    };


  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('al menos una mayúscula');
    if (!/[a-z]/.test(password)) errors.push('al menos una minúscula');
    if (!/\d/.test(password)) errors.push('al menos un número');
    if (!/[!@#$%^&*_(),.?":{}|<>\-+=\[\]~]/.test(password)) errors.push('al menos un carácter especial');
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.success('Perfil actualizado correctamente');
    } catch {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formDataProfile.newPassword !== formDataProfile.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    // Validar que la nueva contraseña no sea igual a la actual
    if (formDataProfile.currentPassword === formDataProfile.newPassword) {
      toast.error('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    // Validar requisitos de la nueva contraseña
    const passwordErrors = validatePassword(formDataProfile.newPassword);
    if (passwordErrors.length > 0) {
      toast.error(`La contraseña debe tener: ${passwordErrors.join(', ')}`);
      return;
    }

    try {
      await changePassword(url, formDataProfile.currentPassword, formDataProfile.newPassword);
      toast.success('Contraseña actualizada correctamente');
      setFormDataProfile(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Error al cambiar la contraseña');
    }
  };

  const handleDownloadContract = async (contractId: number) => {
    try {
        // toast.loading("Preparando descarga...");
        await downloadContract(url, contractId);
        toast.dismiss();
        toast.success("Descarga iniciada.");
    } catch (error) {
        toast.dismiss();
        toast.error((error as Error).message);
        console.error('Error al descargar el contrato:', error);
    }
  };

  // Función para formatear la fecha (ya no es necesaria, pero la dejamos por si acaso)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  

  return (
      <main className="min-h-screen bg-background mt-12">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 w-full">
            <article className="bg-card shadow overflow-hidden rounded-lg">
              <header className="px-4 py-5 sm:px-6 bg-primary text-primary-foreground">
                <h1 className="text-2xl font-bold">Mi Perfil</h1>
                <p className="mt-1 text-white/90">Administra tu cuenta y configuración</p>
              </header>

              <nav className="border-b border-border">
                <ul className="flex -mb-px">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors cursor-pointer ${activeTab === 'profile'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                        }`}
                      aria-current={activeTab === 'profile' ? 'page' : undefined}
                    >
                      Perfil
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('contracts')}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors cursor-pointer ${activeTab === 'contracts'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                        }`}
                      aria-current={activeTab === 'contracts' ? 'page' : undefined}
                    >
                      Mis Contratos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors cursor-pointer ${activeTab === 'settings'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                        }`}
                      aria-current={activeTab === 'settings' ? 'page' : undefined}
                    >
                      Configuración
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="p-6">

                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{user?.username}</h2>
                        <p className="text-foreground">{user?.email}</p>
                        <p className="text-sm text-gray-500">Rol: {user?.role}</p>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="bg-primary/5 p-4 rounded-lg border border-border">
                        <h3 className="text-sm font-medium text-foreground">Total de Contratos</h3>
                        <p className="mt-1 text-3xl font-semibold text-primary">{contracts.length}</p>
                      </div>
                      <div className="bg-accent/5 p-4 rounded-lg border border-border">
                        <h3 className="text-sm font-medium text-foreground">Último contrato</h3>
                        <p className="mt-1 text-lg font-semibold text-accent">
                          {contracts.length > 0 ? formatDate(contracts[0].created_at) : 'N/A'}
                        </p>
                      </div>
                      <div className="bg-yellow-100 dark:bg-yellow-900/10 p-4 rounded-lg border border-border">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          Contratos disponibles
                        </h3>
                        <p className="mt-1 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                          {availableContracts !== null ? availableContracts : '...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contracts' && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Mis Contratos</h2>
                    <button
                      onClick={() => handleBuyNew()}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors mb-4 cursor-pointer"
                    >
                      Comprar contrato adicional
                    </button>
                    {loading ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : contracts.length === 0 ? (
                      <div className="text-center py-12">
                        <svg
                          className="mx-auto h-12 w-12 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-foreground">No hay contratos</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Comienza generando tu primer contrato.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-border rounded-lg">
                        <table className="w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Contrato
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Tipo
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Estado
                              </th>
                              <th scope="col" className="px-8 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-background divide-y divide-border">
                            {contracts.map((contract) => (
                              <tr key={contract.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                  {contract.form_data?.nombre_contrato 
                                    ? `${contract.form_data.nombre_contrato} (v${contract.version})`
                                    : contract.parent_id 
                                      ? `${contract.parent_id} (v${contract.version})` 
                                      : `${contract.id} (v${contract.version})`
                                  }
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">
                                  {contract.contract_type ? contract.contract_type.replace(/_/g, ' ') : 'No especificado'}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    contract.status === 'borrador' 
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' 
                                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  }`}>
                                    {contract.status}
                                  </span>
                                </td>
                                <td className="px-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex justify-end space-x-3 pr-4">
                                    {contract.status === 'borrador' ? (
                                      <button
                                        onClick={() => handleEditContract(contract.id, contract.contract_type)}
                                        className="text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-primary/10 cursor-pointer"
                                      >
                                        Editar Borrador
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => handleNewVersion(contract.id)}
                                          className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors px-2 py-1 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 cursor-pointer"
                                        >
                                          Crear Versión
                                        </button>
                                        <button
                                          onClick={() => handleDuplicate(contract.id)}
                                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800/20 cursor-pointer"
                                        >
                                          Duplicar
                                        </button>
                                      </>
                                    )}
                                    <button
                                      onClick={() => handleDownloadContract(contract.id)}
                                      className="text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-primary/10 cursor-pointer"
                                    >
                                      Descargar
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                )}

                {activeTab === 'settings' && (
                  <section>
                    <h2 className="text-xl font-semibold mb-6">Configuración de la Cuenta</h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <section className="bg-card shadow px-4 py-5 sm:rounded-lg sm:p-6 border border-border">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                          <header className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-foreground">Información Personal</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Actualiza tu información de contacto.</p>
                          </header>
                          <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium text-foreground">
                                  Nombre de usuario
                                </label>
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  value={formDataProfile.username}
                                  onChange={handleInputChange}
                                  disabled
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                />
                              </div>
                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                  Correo electrónico
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={formDataProfile.email}
                                  onChange={handleInputChange}
                                  disabled
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
                                >
                                  Guardar cambios
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </form>

                    <form onSubmit={handlePasswordChange} className="mt-8">
                      <section className="bg-card shadow px-4 py-5 sm:rounded-lg sm:p-6 border border-border">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                          <header className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-foreground">Cambiar contraseña</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Actualiza tu contraseña regularmente para mantener tu cuenta segura.</p>
                          </header>
                          <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground">
                                  Contraseña actual
                                </label>
                                <input
                                  type="password"
                                  name="currentPassword"
                                  id="currentPassword"
                                  value={formDataProfile.currentPassword}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-foreground">
                                  Nueva contraseña
                                </label>
                                <input
                                  type="password"
                                  name="newPassword"
                                  id="newPassword"
                                  value={formDataProfile.newPassword}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                  required
                                />
                                {formDataProfile.newPassword && (
                                  <div className="mt-2 text-xs space-y-1">
                                    <div className={`flex items-center ${formDataProfile.newPassword.length >= 8 ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className="mr-1">{formDataProfile.newPassword.length >= 8 ? '✓' : '✗'}</span>
                                      Mínimo 8 caracteres
                                    </div>
                                    <div className={`flex items-center ${/[A-Z]/.test(formDataProfile.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className="mr-1">{/[A-Z]/.test(formDataProfile.newPassword) ? '✓' : '✗'}</span>
                                      Al menos una mayúscula
                                    </div>
                                    <div className={`flex items-center ${/[a-z]/.test(formDataProfile.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className="mr-1">{/[a-z]/.test(formDataProfile.newPassword) ? '✓' : '✗'}</span>
                                      Al menos una minúscula
                                    </div>
                                    <div className={`flex items-center ${/\d/.test(formDataProfile.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className="mr-1">{/\d/.test(formDataProfile.newPassword) ? '✓' : '✗'}</span>
                                      Al menos un número
                                    </div>
                                    <div className={`flex items-center ${/[!@#$%^&*_(),.?":{}|<>\-+=\[\]~]/.test(formDataProfile.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className="mr-1">{/[!@#$%^&*_(),.?":{}|<>\-+=\[\]~]/.test(formDataProfile.newPassword) ? '✓' : '✗'}</span>
                                      Al menos un carácter especial (!@#$%^&*_(),.?&quot;:{ }|&lt;&gt;-+=[]~)
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                                  Confirmar nueva contraseña
                                </label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  value={formDataProfile.confirmPassword}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                  required
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
                                >
                                  Cambiar contraseña
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </form>

                    <section className="mt-8 bg-card shadow px-4 py-5 sm:rounded-lg sm:p-6 border border-border">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <header className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-foreground">Cerrar sesión</h3>
                          <p className="mt-1 text-sm text-muted-foreground">Cierra tu sesión actual en todos los dispositivos.</p>
                        </header>
                        <div className="mt-5 md:mt-0 md:col-span-2 flex items-center">
                          <button
                            type="button"
                            onClick={logout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-destructive hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive transition-colors"
                          >
                            Cerrar sesión en todos los dispositivos
                          </button>
                        </div>
                      </div>
                    </section>
                  </section>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="min-h-screen bg-background mt-12 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
        <ProfileContent />
      </Suspense>
    </ProtectedRoute>
  );
}
