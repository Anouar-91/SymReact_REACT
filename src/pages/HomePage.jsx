import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Besoin de gérer vos clients ou vos factures ?</span>
          <span className="block text-indigo-600">Bienvenue dans SymReact</span>
        </h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Link to="login" className="mt-3 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Se connecter
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="register" className="mt-3 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-5 py-2 text-base font-medium text-indigo-600 shadow-sm ">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
