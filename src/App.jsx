import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chemins from "./pages/Chemins";
import Utilisateurs from "./pages/Utilisateurs";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/chemins"
          element={
            <PrivateRoute>
              <Chemins />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Utilisateurs />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
