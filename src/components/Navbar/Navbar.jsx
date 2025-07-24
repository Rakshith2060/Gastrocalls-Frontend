import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector} from 'react-redux'
import AccountOptions from './AccountOptions'
import { Link } from 'react-router-dom'


export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user)

  const navigation = [
    { name: 'Home', href: '/' },
    ...(isAuthenticated ? [
      { name: 'Appointments', href: '/appointments' },
      { name: 'Calender', href: '/calender' },
    ] : []),
    ...(isAuthenticated
      ? []
      : [
          { name: 'Login', href: '/login' },
          { name: 'Register', href: '/register' },
        ]),
        
  ]

  return (
    <Disclosure as="nav" className="bg-white shadow-2xl fixed top-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="w-full px-10">
            <div className="flex h-30 justify-between items-center">
              <div className="flex-shrink-0 p-10">
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/gastro-logo.svg" alt="GastroCalls Logo" className="h-20 w-auto" />
                  <span className="text-gray-700 text-3xl font-bold poppins-bold">GastroCalls</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 ml-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:underline hover:decoration-blue-500 hover:decoration-[5px] px-10 rounded-md text-2xl font-medium poppins-bold"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {isAuthenticated && (
              <AccountOptions />
            )}

              {/* Mobile Toggle */}
              <div className="md:hidden flex items-center ml-auto">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
