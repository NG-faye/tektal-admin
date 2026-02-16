import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// 1. On importe les vraies pages qu'on a créées
import Dashboard from './pages/Dashboard';
import Chemins from './pages/Chemins';
import Utilisateurs from './pages/Utilisateurs';

function App() {
  return (
    <Router>
      <Routes>
        {/* Le MainLayout contient la Sidebar et l'Outlet */}
        <Route path="/" element={<MainLayout />}>
          {/* 2. On utilise les vrais composants ici */}
          <Route index element={<Dashboard />} />
          <Route path="chemins" element={<Chemins />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;