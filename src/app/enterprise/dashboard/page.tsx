"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FileText, Users, Zap, TrendingUp, AlertTriangle, CheckCircle2, Clock, Loader2, ArrowUpRight } from "lucide-react";
import { useAuthStore } from "../../store/Store";
import { getEnterpriseActivity, getTemplates, ActivityResponse, TemplateResponse } from "../../lib/enterprise";
import { getEnterpriseUsers } from "../../lib/settings";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function EnterpriseDashboard() {
    const router = useRouter();
    const { user, url, userValid } = useAuthStore();
    const planType = user?.company?.plan_type || "free";
    const isFree = planType === "free";
    const generationsCount = user?.company?.generations_count || 0;
    const totalContractsGenerated = user?.company?.total_contracts_generated || 0;

    // Parse last_generation_reset and calculate next reset (add 1 month)
    let nextResetText = "N/A";
    if (user?.company?.last_generation_reset) {
        const lastReset = new Date(user.company.last_generation_reset);
        lastReset.setMonth(lastReset.getMonth() + 1);
        nextResetText = lastReset.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const limitFree = parseInt(process.env.NEXT_PUBLIC_LIMIT_CONTRACTS_FREE || "10", 10);
    const limitStarter = parseInt(process.env.NEXT_PUBLIC_LIMIT_CONTRACTS_STARTER || "50", 10);
    const limitBusiness = parseInt(process.env.NEXT_PUBLIC_LIMIT_CONTRACTS_BUSINESS || "300", 10);

    let maxGenerations = limitFree;
    let maxGenerationsText = limitFree.toString();

    if (planType === "starter") {
        maxGenerations = limitStarter;
        maxGenerationsText = limitStarter.toString();
    } else if (planType === "business") {
        maxGenerations = limitBusiness;
        maxGenerationsText = limitBusiness.toString();
    } else if (planType === "enterprise") {
        maxGenerations = 1000000;
        maxGenerationsText = "Ilimitado";
    }

    const creditsRemaining = maxGenerationsText === "Ilimitado" ? "Ilimitado" : Math.max(0, maxGenerations - generationsCount);
    const percentage = Math.min((generationsCount / maxGenerations) * 100, 100);

    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [templatesCount, setTemplatesCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [loadingActivities, setLoadingActivities] = useState(true);
    const [upgrading, setUpgrading] = useState(false);

    useEffect(() => {
        userValid();

        const fetchData = async () => {
            try {
                // Fetch data in parallel
                const [acts, tpls, usrs] = await Promise.all([
                    getEnterpriseActivity(url).catch(() => []),
                    getTemplates(url).catch(() => []),
                    getEnterpriseUsers(url).catch(() => [])
                ]);
                setActivities(acts as ActivityResponse[]);
                setTemplatesCount((tpls as TemplateResponse[]).length);
                // usrs has shape UserResponse[]
                setUsersCount((usrs as unknown[]).length);
            } catch (err) {
                console.error("Error cargando datos del dashboard", err);
            } finally {
                setLoadingActivities(false);
            }
        };
        fetchData();
    }, [url, userValid]);

    const handleUpgrade = () => {
        setUpgrading(true);
        router.push("/enterprise/settings#billing");
    };

    // Calculate chart data from activities
    const chartData = useMemo(() => {
        if (!activities || activities.length === 0) {
            // Dummy data if empty so chart doesn't look broken
            const dummy = [];
            for (let i = 14; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                dummy.push({
                    name: d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
                    contratos: 0
                });
            }
            return dummy;
        }

        // Group by day for the last 14 days
        const dataMap = new Map();
        for (let i = 14; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            dataMap.set(key, 0);
        }

        activities.forEach(act => {
            const d = new Date(act.created_at);
            const key = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            if (dataMap.has(key)) {
                // If it's bulk, it might be multiple, but we count the batch as 1 or count generated contracts if we have that data. Let's just increment by 1 for now or act.amount if exists.
                dataMap.set(key, dataMap.get(key) + 1);
            }
        });

        return Array.from(dataMap.entries()).map(([name, contratos]) => ({ name, contratos }));
    }, [activities]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel Empresarial</h1>
                    <p className="text-gray-500 mt-1">
                        Resumen de uso y métricas de tus plantillas.
                    </p>
                </div>
                {isFree && (
                    <button
                        onClick={handleUpgrade}
                        disabled={upgrading}
                        className="bg-[#C2A359] text-white hover:bg-[#b0924e] disabled:opacity-70 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#C2A359]/20"
                    >
                        {upgrading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Mejorar a PRO
                    </button>
                )}
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Generados</p>
                        <div className="p-2 bg-[#C2A359]/10 rounded-lg text-[#C2A359]">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalContractsGenerated}</h2>
                    </div>
                    <div className="mt-2 text-xs font-medium text-gray-500 flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> Mensual: {generationsCount} / {maxGenerationsText}
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plantillas Activas</p>
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                            <FileText className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{templatesCount}</h2>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Créditos Restantes</p>
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <Zap className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{creditsRemaining}</h2>
                        </div>
                        <div className="mt-1 text-[10px] text-gray-400 uppercase tracking-wide">
                            Se reinicia: {nextResetText}
                        </div>
                    </div>
                    {/* Background Progress Indicator */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gray-100 dark:bg-gray-800 w-full">
                        <div
                            className={`h-full ${percentage >= 90 ? 'bg-red-500' : 'bg-purple-500'}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Miembros Equipo</p>
                        <div className="p-2 bg-teal-500/10 rounded-lg text-teal-500">
                            <Users className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{usersCount}</h2>
                        {usersCount > 0 && (
                            <div className="flex -space-x-2">
                                {[...Array(Math.min(3, usersCount))].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-[#1C212B] flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {(user?.username?.[0] || 'U').toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MIDDLE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Actividad de Generación</h2>
                        <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none text-gray-700 dark:text-gray-300">
                            <option>Últimos 14 días</option>
                        </select>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorContratos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C2A359" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C2A359" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#C2A359' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="contratos"
                                    stroke="#C2A359"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorContratos)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pending Actions (Alerts) */}
                <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Avisos y Recomendaciones</h2>
                    <div className="space-y-4 flex-1">

                        {isFree ? (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-red-800 dark:text-red-400">Plan Gratuito Activo</h4>
                                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">Sube a un plan PRO para desbloquear la generación masiva y más plantillas.</p>
                                </div>
                            </div>
                        ) : percentage >= 80 ? (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">Límite Cercano</h4>
                                    <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">Has consumido el {percentage.toFixed(0)}% de tus contratos de este mes.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-green-800 dark:text-green-400">Suscripción Activa</h4>
                                    <p className="text-xs text-green-600 dark:text-green-300 mt-1">Tu plan {planType.toUpperCase()} está funcionando perfectamente.</p>
                                </div>
                            </div>
                        )}

                        {templatesCount === 0 && (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400">Sube tu primera plantilla</h4>
                                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">Ve a &apos;Gestión de Plantillas&apos; para comenzar a generar contratos.</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <Users className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">Invita a tu equipo</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Colabora con otros miembros agregándolos desde la configuración.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="bg-white dark:bg-[#1C212B] border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Lotes y Generaciones Recientes</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="pb-4 font-medium">Nombre de Plantilla</th>
                                <th className="pb-4 font-medium">Tipo</th>
                                <th className="pb-4 font-medium">Fecha</th>
                                <th className="pb-4 font-medium text-right">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                            {loadingActivities ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Loader2 className="w-6 h-6 animate-spin text-[#C2A359]" />
                                            <span>Cargando actividades...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : activities.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        No hay generaciones recientes. ¡Inicia una ahora!
                                    </td>
                                </tr>
                            ) : (
                                activities.slice(0, 5).map((act) => (
                                    <tr key={act.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 font-medium flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                            </div>
                                            {act.template?.name || "Contrato Empresarial"}
                                        </td>
                                        <td className="py-4">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {(act.contract_type || act.type) === "enterprise_bulk" ? "Lote Masivo" : "Individual"}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(act.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                                                    ${act.status === 'Completado' || act.status?.toLowerCase().includes('success') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : act.status?.toLowerCase().includes('fail') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                    {act.status || 'Completado'}
                                                </span>
                                                {/* Mini progress bar for esthetics */}
                                                <div className="w-24 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${(act.status === 'Completado' || act.status?.toLowerCase().includes('success')) ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: '100%' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
