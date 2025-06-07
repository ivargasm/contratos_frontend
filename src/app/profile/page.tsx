"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from "../store/Store";
import { getContracts } from "../lib/api";
import ProtectedRoute from "../components/ProtectedRoutes";

interface Contract {
  id: number;
  type: string;
  data: Record<string, unknown>;
  file_path: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // Simular carga de contratos
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts(useAuthStore.getState().url);
        // console.log('Contratos recibidos:', data);
        // Asegurarnos de que data sea un array
        const contractsData = Array.isArray(data) ? data : [];
        setContracts(contractsData);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage({ text: 'Perfil actualizado correctamente', type: 'success' });
    } catch {
      setMessage({ text: 'Error al actualizar el perfil', type: 'error' });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }
    try {
      setMessage({ text: 'Contraseña actualizada correctamente', type: 'success' });
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch {
      setMessage({ text: 'Error al cambiar la contraseña', type: 'error' });
    }
  };

  // Función para formatear la fecha (ya no es necesaria, pero la dejamos por si acaso)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ProtectedRoute>
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
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'profile' 
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
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'contracts' 
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
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'settings' 
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
                {message.text && (
                  <div className={`mb-4 p-4 rounded ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {message.text}
                  </div>
                )}

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
                                        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    </div>
                  </div>
                )}

                {activeTab === 'contracts' && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Mis Contratos</h2>
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
                      <div className="overflow-hidden border border-border rounded-lg">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Tipo
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Fecha
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Archivo
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Acciones</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {contracts.map((contract) => (
                              <tr key={contract.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                  {contract.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">
                                  {contract.type.replace('_', ' ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                  {new Date(contract.created_at).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button 
                                    onClick={() => window.open(`${useAuthStore.getState().url}/contracts/preview/${contract.id}`, '_blank')}
                                    className="text-primary hover:underline"
                                  >
                                    Ver PDF
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a 
                                    href={`${contract.file_path}`}
                                    download
                                    target="_blank"
                                    className="text-primary hover:text-primary/80"
                                  >
                                    Descargar
                                  </a>
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
                                  value={formData.username}
                                  onChange={handleInputChange}
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
                                  value={formData.email}
                                  onChange={handleInputChange}
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
                                  value={formData.currentPassword}
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
                                  value={formData.newPassword}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-input rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm bg-background"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                                  Confirmar nueva contraseña
                                </label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  value={formData.confirmPassword}
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
    </ProtectedRoute>
  );
}
