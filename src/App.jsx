import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chemins from "./pages/Chemins";
import Utilisateurs from "./pages/Utilisateurs";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/chemins" element={
          <PrivateRoute>
            <Layout><Chemins /></Layout>
          </PrivateRoute>
        } />
        <Route path="/utilisateurs" element={
          <PrivateRoute>
            <Layout><Utilisateurs /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;