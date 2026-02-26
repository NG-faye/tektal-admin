import { useState } from "react";

const etablissementsData = [
  { id: 1, nom: "Pédagogues", categorie: "École", adresse: "PGRV+CMG, Dakar" },
  // Vous pouvez ajouter d'autres établissements ici
];

export default function EtablissementsPage() {
  const [search, setSearch] = useState("");

  const filtered = etablissementsData.filter((e) =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.categorie.toLowerCase().includes(search.toLowerCase()) ||
    e.adresse.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-64 p-4 shadow-md md:shadow-none flex flex-col">
        <h1 className="text-xl font-bold mb-4">Tektal Admin</h1>
        <nav className="flex flex-col gap-2 mb-4">
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="#" className="flex items-center gap-2 p-2 rounded bg-yellow-400 text-white">Chemins</a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">Utilisateurs</a>
        </nav>
        <div className="mt-auto flex items-center gap-2 p-2">
          <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">A</div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-500">admin@tektal.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold">Gestion des Établissements</h2>
          <button className="bg-yellow-400 text-white px-4 py-2 rounded w-full md:w-auto">
            + Ajouter un établissement
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Rechercher un lieu (école, hôpital…)"
          className="w-full md:w-1/2 p-2 border rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse md:table">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Catégorie</th>
                <th className="p-2 text-left">Adresse</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="flex flex-col md:table-row border-b md:border-none p-2 md:p-0 mb-2 md:mb-0">
                  <td className="md:table-cell p-2"><strong>Nom:</strong> {e.nom}</td>
                  <td className="md:table-cell p-2"><strong>Catégorie:</strong> {e.categorie}</td>
                  <td className="md:table-cell p-2"><strong>Adresse:</strong> {e.adresse}</td>
                  <td className="md:table-cell p-2 flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded w-full md:w-auto">Modifier</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}