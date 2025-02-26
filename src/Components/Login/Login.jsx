import Logo from '../../assets/ventologoN.svg'
import ModalPassword from '../Modal/ModalPassword'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react'
import Fondo from '../../assets/fondo-vento.webp'

export default function Login({ setIsAuthenticated }) {

  const [loading, setLoading] = useState(false);
  const [modalOP, setModalOP] = useState(false);

  const navigate = useNavigate();

  const OlviPass = () => {
    console.log('olvido')
    setModalOP(true)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage:`url(${Fondo})` }}>
      {
          modalOP && <ModalPassword modal={setModalOP}/>
      }
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm sm:max-w-md">
        <div className="text-center">
          <img alt="Vento" src={Logo} className="mx-auto h-12 w-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Inicia Sesión</h2>
        </div>

        <Formik
          initialValues={{ usuario: '', pass: '' }}
          validate={() => {}}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setLoading(true);
            let url = `https://script.google.com/macros/s/AKfycbwiiVgb0-f8pGdhbTT2NK1sDDhbQ4KRl3UW5B138RbDiftt1SejPWu0eD_m6CS4SN-TpA/exec?usuario=${values.usuario}&password=${values.pass}`;

            console.log(url)

            fetch(url,{method:"GET",headers: {
              "Content-Type": "text/plain;charset=utf-8",
          },})
              .then((response) => response.json())
              .then((data) => {
                setLoading(false);
                setSubmitting(false)
                if (data.success === true) {
                  localStorage.setItem("usuario", JSON.stringify(data));
                  localStorage.setItem("isAuthenticated", "true");
                  setIsAuthenticated(true);
                  navigate('/Inicio');
                } else {
                  Swal.fire({ title: data.message, icon: "error", draggable: true });
                }
              });
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-900">Correo o Usuario:</label>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={values.usuario}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="pass" className="block text-sm font-medium text-gray-900">Contraseña</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); OlviPass(); }} className="text-sm text-blue-600 hover:text-blue-500">¿Olvidaste tu contraseña?</a>
                </div>
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  value={values.pass}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition duration-200"
              >
                Iniciar Sesión
              </button>
            </form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta? <a href="#" className="text-blue-600 hover:text-blue-500 font-semibold">Solicítala</a>
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="text-gray-700">Cargando...</p>
          </div>
        </div>
      )}
    </div>
  );
}
