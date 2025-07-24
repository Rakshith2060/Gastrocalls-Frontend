import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const AccountOptions = () => {
    const dispatch = useDispatch()

  return (
    <Menu as="div" className="relative ml-4">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src={"/default-avatar.svg"} // fallback avatar
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                  />
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                </Menu.Button>

                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                        >
                          Account
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => dispatch(logout())}
                          className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
  )
}

export default AccountOptions