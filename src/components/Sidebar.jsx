import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Route, Users } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Chemins', path: '/chemins', icon: <Route size={20} /> },
    { name: 'Utilisateurs', path: '/utilisateurs', icon: <Users size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-900">Tektal Admin</h1>
        <p className="text-sm text-gray-500 font-medium">Panneau de contrôle</p>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2"> 
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                ? 'bg-[#FEBD00] text-white font-bold' 
                : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FEBD00] text-white flex items-center justify-center font-bold">
          A
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-slate-900 truncate">Admin</p>
          <p className="text-xs text-gray-500 truncate">admin@tektal.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;