import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/chemins");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold text-[#FEBD00]">Tektal Admin</h1>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Connexion</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FEBD00] outline-none"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#FEBD00] outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FEBD00] hover:bg-yellow-400 text-black font-semibold py-3 rounded-xl transition"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;