import { useState } from "react";
import {
  Search,
  Map,
  Trash2,
  CheckCircle,
  PlusCircle,
  Video,
  X
} from "lucide-react";

import { usePathsList, usePathActions, useCreatePath } from "../api/hooks";

const Chemins = () => {
  const { data, loading, error, refetch } = usePathsList();
  const chemins = data || [];

  const { approve, reject, remove } = usePathActions(refetch);
  const { create, loading: creating } = useCreatePath(refetch);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    depart: "",
    arrivee: "",
    details: "",
    video: null
  });

  // 🔍 Recherche fonctionnelle
  const filteredChemins = chemins.filter((chemin) =>
    (chemin.depart || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (chemin.arrivee || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (chemin.details || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("depart", formData.depart);
    data.append("arrivee", formData.arrivee);
    data.append("details", formData.details);

    if (formData.video) {
      data.append("video", formData.video);
    }

    await create(data);

    setFormData({
      depart: "",
      arrivee: "",
      details: "",
      video: null
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Gestion des Chemins
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#FEBD00] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl transition"
        >
          <PlusCircle size={18} />
          Créer un parcours
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Rechercher un trajet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FEBD00] outline-none"
        />
      </div>

      {/* États */}
      {loading && (
        <p className="text-gray-500 text-center">
          Chargement des chemins...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-center">
          Erreur : {JSON.stringify(error)}
        </p>
      )}

      {!loading && filteredChemins.length === 0 && (
        <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
          <Map className="mx-auto mb-2 opacity-10" size={48} />
          <p>Aucun chemin trouvé.</p>
        </div>
      )}

      {/* Liste */}
      <div className="space-y-3">
        {filteredChemins.map((chemin) => (
          <div
            key={chemin.id}
            className="bg-white p-5 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-bold text-slate-800">
                {chemin.depart} → {chemin.arrivee}
              </h3>
              <p className="text-sm text-gray-500">
                {chemin.details}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => approve(chemin.id)}
                className="text-green-500 hover:scale-110 transition"
              >
                <CheckCircle size={20} />
              </button>

              <button
                onClick={() => reject(chemin.id)}
                className="text-red-500 hover:scale-110 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CREATION */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold">
              Nouveau Parcours
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">

              <input
                type="text"
                placeholder="Lieu de départ"
                value={formData.depart}
                onChange={(e) =>
                  setFormData({ ...formData, depart: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
                required
              />

              <input
                type="text"
                placeholder="Lieu d'arrivée"
                value={formData.arrivee}
                onChange={(e) =>
                  setFormData({ ...formData, arrivee: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
                required
              />

              <textarea
                placeholder="Détails du parcours"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
                rows={3}
                required
              />

              {/* Upload vidéo */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Video size={16} />
                  Ajouter une vidéo
                </label>

                <input
                  type="file"
                  accept="video/*"
                  capture="environment"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video: e.target.files[0]
                    })
                  }
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-[#FEBD00] hover:bg-yellow-400 text-black font-semibold py-2 rounded-xl transition"
              >
                {creating ? "Création..." : "Créer le parcours"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chemins;
