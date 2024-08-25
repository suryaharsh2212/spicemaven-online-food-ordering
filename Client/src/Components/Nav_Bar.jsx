
'use client'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,

} from '@headlessui/react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import LoginModal from '../assets/LoginModal'
import RegisterModal from '../assets/RegisterModal'
import { UseLogout } from '../hooks/useLogout'
import { setLoginState } from '../redux/slice'

export default function Final_Navbar() {
  const [open, setOpen] = useState(false)
  const cart = useSelector((state) => state.cart.items)
  const loginState = useSelector((state) => state.user.loggedIn)
  const name = useSelector((state) => state.user.name)
  const id = useSelector((state) => state.user.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlecart = () => {
    navigate(`user/restro/${id}/cart`)
  }
  const moveToprofile = () => {
    navigate(`/user/restro/${id}/${name}`)
    setOpen(false)
  }
  const myOrder = () => {
    navigate(`/user/restro/${id}/confirmOrder`)
    setOpen(false)
  }
  const handleLogout = async () => {
    const res = await UseLogout();
    console.log("response from logged out", res);
    console.log(res.error);

    if (!res.error) {
      dispatch(setLoginState(false))
      navigate("/")
    }
    else {
      alert("Some error occured while Logging Out")
    }


  }

  return (
    <div className=" bg-zinc-100 z-50 w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}


            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <button
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                  className={`-m-2 block p-2 font-medium text-gray-900 ${loginState ? 'hidden' : 'visible'}`}>
                  Sign in
                </button>
                <button
                  onClick={moveToprofile}
                  className={`-m-2 block p-2 font-medium text-gray-900 ${loginState ? 'visible' : 'hidden'}`}>
                  Profile
                </button>
              </div>
              <div className="flow-root">
                <button
                  onClick={() => document.getElementById('my_modal_6').showModal()}
                  className={`-m-2 block p-2 font-medium text-gray-900 ${loginState ? 'hidden' : 'visible'}`}>
                  Create account
                </button>
                <button
                  onClick={handleLogout}
                  className={`-m-2 block p-2 font-medium text-gray-900 ${loginState ? 'visible' : 'hidden'}`}>
                  Logout
                </button>


              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <button
                onClick={myOrder}
                className={`-m-2 block p-2 font-medium text-gray-900 ${loginState ? 'visible' : 'hidden'}`}>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/5530/5530730.png"
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">My orders</span>
                {/* <span className="sr-only">, change currency</span> */}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white w-full">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <div >

               
                  <h1 className=' text-3xl text-amber-600 ' style={{ fontFamily: 'CustomFont' }} >Spice Heaven</h1>
                </div>
              </div>

              {/* Flyout menus */}


              <div className="ml-auto flex items-center">
                <div className={`hidden lg:flex lg:flex-1 lg:items-center items-end ml-4 lg:justify-end lg:space-x-6 ${loginState ? 'hidden' : 'visible'}`} >
                  <button onClick={() => document.getElementById('my_modal_3').showModal()} className={`text-sm font-medium text-gray-700 hover:text-gray-800 ${loginState ? 'hidden' : 'visible'}`}>
                    Sign in
                  </button>
                  <div className={`lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 mt-1 ${loginState ? 'visible' : 'hidden'}`}>
                    <Menu as="div" className={`relative inline-block text-left ${loginState ? 'visible' : 'hidden'}`}>
                      <div>

                        <MenuButton>
                          <img className='h-8 w-8 mt-1' src="https://cdn-icons-png.flaticon.com/128/3870/3870822.png" alt="" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={handleLogout}
                              className="flex py-2 w-full text-sm  px-4 text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              <div  className={`text-sm font-medium   rounded-md text-whitehover:bg-orange-400 ${loginState ? 'visible' : 'hidden'}`}>
                                Logout
                              </div>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={moveToprofile}
                              className="flex w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              <div  className={`text-sm font-medium text-gray-700 hover:text-gray-800 ${loginState ? 'visible' : 'hidden'}`}>
                                Profile
                              </div>
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <button onClick={() => document.getElementById('my_modal_6').showModal()} className={`text-sm font-medium bg-orange-500 p-3 rounded-md text-white hover:bg-orange-400 ${loginState ? 'hidden' : 'visible'}`}>
                    Create account
                  </button>
                  <button onClick={myOrder} className={`text-sm font-medium btn p-3 rounded-md text-whitehover:bg-orange-400 ${loginState ? 'visible' : 'hidden'}`}>
                    My orders
                  </button>

                </div>





                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={handlecart}
                    className="group -m-2 flex items-center p-2">

                    <img className='h-8 w-8 md:ml-5' src="https://cdn-icons-png.flaticon.com/128/3643/3643914.png" alt="" />
                    <span className="badge badge-sm indicator-item mb-2 text-white bg-cyan-500">{cart.length}</span>


                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal />
      <RegisterModal />
    </div>
  )
}
