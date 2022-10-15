import React, { useState, useContext } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import AuthAPI from '../services/AuthAPI';
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'


function LoginPage({onLogin}) {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [loading, setLoading] =useState(false)


  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)

    e.preventDefault();
    try {
        const token = await AuthAPI.authenticate(credentials)
        setError("")
        setIsAuthenticated(true)
        setLoading(false)
        navigate('/customer')
        
    } catch (error) {
      toast.error('Une erreur est survenue')
      setLoading(false)

        console.log(error.response.data)
        setError("Aucun compte ne correspond à ces identifiants !")
    }
}
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Se connecter à l'application
            </h2>

          </div>
          {!loading  ?(
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={credentials.username}
                  id="email-address"
                  name="username"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  onChange={handleChange}

                  value={credentials.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Connexion
              </button>
            </div>
          </form>
          ):(
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#0d6efd" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{marginLeft:'50%', transform: 'translateX(-10%)'}}
        wrapperClassName=""
        visible={true}
         />
      )}
        </div>
      </div>
    </>
  )
}

export default LoginPage