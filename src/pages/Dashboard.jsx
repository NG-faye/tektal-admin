import { useState, useEffect } from 'react';
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({ chemins: 0, users: 0, officiels: 0, vues: 0 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-500">Aperçu global de la plateforme Tektal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Chemins" value={stats.chemins} />
        <StatCard label="Utilisateurs" value={stats.users} />
        <StatCard label="Officiels" value={stats.officiels} />
        <StatCard label="Vues totales" value={stats.vues} />
      </div>

      <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 font-medium">
        Graphiques et activités récentes en attente du serveur...
      </div>
    </div>
  );
};

export default Dashboard;