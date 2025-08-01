// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403 - Acceso Denegado</h1>
      <p className="text-gray-700 text-lg mb-6">
        No tienes permiso para ver esta página.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
