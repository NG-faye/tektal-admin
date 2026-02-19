import { useState } from "react";
import StatCard from "../components/StatCard";
import { usePathsList, useConnectedUsers } from "../api/hooks";

const Dashboard = () => {
  const { data: chemins, loading: loadingPaths } = usePathsList();
  const [users] = useState([]);
  const [officiels] = useState(0);
  const [vues] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-500">Aperçu global de la plateforme Tektal</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Chemins" 
          value={loadingPaths ? "..." : chemins?.length || 0} 
        />
        <StatCard 
          label="Utilisateurs" 
          value={users?.length || 0} 
        />
        <StatCard 
          label="Officiels" 
          value={officiels} 
        />
        <StatCard 
          label="Vues totales" 
          value={vues} 
        />
      </div>
      <div className="bg-white p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 font-medium">
        Graphiques et activités récentes en attente du serveur...
      </div>
    </div>
  );
};

export default Dashboard;