import { Search, Users, ShieldCheck, Ban } from "lucide-react";
import { useConnectedUsers } from "../api/hooks";

const Utilisateurs = () => {
  const { data: users, loading, error, refetch } = useConnectedUsers();

  const handleBan = (id) => {
    // Ici tu peux appeler ton endpoint pour bannir un utilisateur
    alert(`Bannir utilisateur ${id} - à implémenter`);
  };

  const handleVerify = (id) => {
    // Ici tu peux appeler ton endpoint pour vérifier un utilisateur
    alert(`Vérifier utilisateur ${id} - à implémenter`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Gestion des Utilisateurs</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher un membre..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FEBD00] outline-none"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Chargement des utilisateurs...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Erreur: {JSON.stringify(error)}</p>
      ) : users.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
          <Users className="mx-auto mb-2 opacity-10" size={48} />
          <p>Base de données utilisateurs vide.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FEBD00]/20 text-[#FEBD00] flex items-center justify-center font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{user.username}</h3>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div> 
              <div className="flex gap-2">
                <button 
                  className="p-2 text-gray-400 hover:text-[#FEBD00] transition-colors"
                  onClick={() => handleVerify(user.id)}
                >
                  <ShieldCheck size={20} />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => handleBan(user.id)}
                >
                  <Ban size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;
