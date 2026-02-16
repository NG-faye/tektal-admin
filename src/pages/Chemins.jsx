import { useState, useEffect } from 'react';
import { Search, Map, Trash2, CheckCircle } from 'lucide-react';

const Chemins = () => {
  const [chemins, setChemins] = useState([]); 

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Gestion des Chemins</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher un trajet..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FEBD00] outline-none"
        />
      </div>

      <div className="space-y-3">
        {chemins.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
            <Map className="mx-auto mb-2 opacity-10" size={48} />
            <p>Aucun chemin à afficher pour le moment.</p>
          </div>
        ) : (
          chemins.map((chemin) => (
            <div key={chemin.id} className="bg-white p-5 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FEBD00]/10 text-[#FEBD00] rounded-lg"><Map size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-800">{chemin.titre}</h3>
                  <p className="text-sm text-gray-500">Par {chemin.auteur}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#FEBD00] transition-colors"><CheckCircle size={20} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chemins;