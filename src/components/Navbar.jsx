import { Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon, ChartBarIcon,
  CursorArrowRaysIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import { Fragment, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/AuthAPI';

const solutions = [
  {
    name: 'Clients',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: 'customer',
    icon: ChartBarIcon,
  },
  {
    name: 'Factures',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: 'invoice',
    icon: CursorArrowRaysIcon,
  }
]


export default function Navbar() {

  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const handleClick = () => {
    AuthAPI.logout();
    setIsAuthenticated(false)
    navigate("/login")
  }

  const navigate = useNavigate();

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-10xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            <a href="#">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />

            </a>
            <span className="ml-5">SymReact</span>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">


            <Link to={"customer"} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Client
            </Link>


            <Link to={"invoice"} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Facture
            </Link>

          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  S'inscrire
                </Link>

                <Link to={"login"}
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Connexion
                </Link>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (

                    <Link to={item.href}
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
