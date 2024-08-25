import React from "react";
import Dropdown from "./Dropdown";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UseLogout } from "../hooks/useLogout";
import { setLoginState } from "../redux/slice";

export default function NavbarNew() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const loginState=useSelector((state)=>state.user.loggedIn)
  const name=useSelector((state)=>state.user.name)
  const id=useSelector((state)=>state.user.id)
  const dispatch=useDispatch()
 const navigate=useNavigate()
 const handlecart=()=>{
   navigate(`user/restro/${id}/cart`)
}
  const moveToprofile=()=>{
     navigate(`/user/restro/${id}/${name}`)
  }
 
  const handleLogout=async()=>{
      const res=await UseLogout();
      console.log("response from logged out",res);
      console.log(res.error);
      
      if(!res.error)
      {
        dispatch(setLoginState(false))
      navigate("/")
      }
      else{
        alert("Some error occured while Logging Out")
      }
      
      
  }
  
  return (
    <>
    <LoginModal/>
    <RegisterModal/>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-800 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              <i>SpiceHaven</i>
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
            //   onClick={() => setNavbarOpen(!navbarOpen)} 
            >
             
          
            <Dropdown/>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
           <ul className="flex flex-col lg:flex-row list-none mr-6 gap-2 lg:ml-auto">
           <li className={`nav-item flex items-center ${loginState? `hidden`:`visble` }`}>
    <button
      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
      onClick={() => document.getElementById('my_modal_3').showModal()}
    >
      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
      <span className="ml-2">Login</span>
    </button>
  </li>
  <li className={`nav-item flex items-center ${loginState? `hidden`:`visble` }`}>
    <button
      onClick={() => document.getElementById('my_modal_6').showModal()}
      className="px-3 py-2 flex items-center justify-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    >
      <i className="fas fa-user-plus text-lg leading-lg text-white opacity-75"></i>
      <span className="ml-2">Signup</span>
    </button>
  </li>
  <li className="nav-item flex items-center">
    <button onClick={handlecart}
      className="px-3 py-2 flex items-center justify-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    >
      <img className="h-10 w-10" src="https://cdn-icons-png.flaticon.com/128/5542/5542644.png" alt="Logo" />
    </button>
  </li>
  {loginState?
  <li className="nav-item flex items-center">
  <button
    onClick={moveToprofile}
    className="px-3 py-2 flex items-center justify-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
  >
    <img className="h-9 w-9" src="https://cdn-icons-png.flaticon.com/128/3870/3870822.png" alt="Logo" />
  </button>
</li>
  :
  <></>
  }
  {loginState?
  <li className="nav-item flex items-center">
  <button
   onClick={handleLogout} 
    className="px-3 py-2 flex items-center justify-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
  >
    <img className="h-9 w-9" src="https://cdn-icons-png.flaticon.com/128/16851/16851384.png" alt="Logo" />
  </button>
</li>
  :
  <></>
  }
</ul>

          </div>
        </div>
      </nav>
    </>
  );
}