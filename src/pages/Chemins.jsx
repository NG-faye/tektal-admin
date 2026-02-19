import React, { useState, useEffect } from 'react';

const Chemin = () => {
  // --- ÉTAT ---
  const [etablissements, setEtablissements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  
  // Données du formulaire
  const [formData, setFormData] = useState({ nom: '', categorie: 'École', adresse: '' });

  // --- CHARGEMENT INITIAL (Local Storage) ---
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('etablissements')) || [
      { nom: "Pédagogues", categorie: "École", adresse: "PGRV+CMG, Dakar" },
      { nom: "Idrissa Pouye", categorie: "Hôpital", adresse: "134 Rue GY 530, Dakar" }
    ];
    setEtablissements(saved);
  }, []);

  // --- ACTIONS ---
  const handleSave = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingIndex !== null) {
      updatedList = [...etablissements];
      updatedList[editingIndex] = formData;
    } else {
      updatedList = [...etablissements, formData];
    }
    
    setEtablissements(updatedList);
    localStorage.setItem('etablissements', JSON.stringify(updatedList));
    closeModal();
  };

  const deleteEtab = (index) => {
    if (window.confirm("Supprimer cet établissement ?")) {
      const updatedList = etablissements.filter((_, i) => i !== index);
      setEtablissements(updatedList);
      localStorage.setItem('etablissements', JSON.stringify(updatedList));
    }
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setFormData(etablissements[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ nom: '', categorie: 'École', adresse: '' });
    setEditingIndex(null);
  };

  // --- FILTRE ---
  const filteredData = etablissements.filter(etab => 
    etab.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etab.categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      
      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-black text-slate-800">Gestion des Établissements</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 px-6 py-2.5 rounded-xl font-bold w-full md:w-auto shadow-sm transition-all active:scale-95"
          >
            + Ajouter un établissement
          </button>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher un lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 bg-white outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="space-y-4">
          {filteredData.map((etab, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 flex-1 gap-2 md:gap-4 items-center">
                  <span className="font-bold text-slate-800">{etab.nom}</span>
                  <span className="text-slate-500 text-sm">{etab.categorie}</span>
                  <span className="text-slate-400 text-sm truncate">{etab.adresse}</span>
                </div>
                <div className="flex items-center gap-2 border-t md:border-none pt-3 md:pt-0">
                  <button 
                  onClick={() => openEditModal(index)}
                  className="flex-1 md:flex-none bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-sm active:opacity-90"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => deleteEtab(index)}
                  className="flex-1 md:flex-none bg-[#dc3545] hover:bg-[#bb2d3b] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-sm active:opacity-90"
                >
                  Supprimer
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center border-b p-5 bg-slate-50">
              <h3 className="font-black text-lg">{editingIndex !== null ? 'Modifier' : 'Nouvel'} établissement</h3>
              <button onClick={closeModal} className="text-slate-400 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <input 
                required 
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none"
              />
              <select 
                value={formData.categorie}
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none"
              >
                <option>École</option>
                <option>Hôpital</option>
                <option>Restaurant</option>
              </select>
              <input 
                required 
                placeholder="Adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none"
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold">Annuler</button>
                <button type="submit" className="flex-1 bg-amber-400 py-3 rounded-xl font-bold">Confirmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chemin;