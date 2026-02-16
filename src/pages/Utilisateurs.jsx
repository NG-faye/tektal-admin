import { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, Ban } from 'lucide-react';

const Utilisateurs = () => {
  const [users, setUsers] = useState([]);

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

      <div className="space-y-3">
        {users.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
            <Users className="mx-auto mb-2 opacity-10" size={48} />
            <p>Base de données utilisateurs vide.</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FEBD00]/20 text-[#FEBD00] flex items-center justify-center font-bold">
                  {user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{user.nom}</h3>
                  <p className="text-xs text-gray-400">{user.telephone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#FEBD00] transition-colors"><ShieldCheck size={20} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Ban size={20} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Utilisateurs;