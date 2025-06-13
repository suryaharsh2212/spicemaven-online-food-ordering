
import { Outlet } from 'react-router-dom'
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from './redux/slice';
import Footer from './Components/Footer'
import Final_Navbar from './Components/Nav_Bar';
import TestModeBanner from './assets/Banner';
import { ToastContainer,  Flip, } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
  const token = localStorage.getItem("token");
  
}, []);
  return (
    <div>

      <Final_Navbar/>
      <TestModeBanner/>
      <Outlet />
      <Footer />
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip} 
      />
    </div>
  )
}

export default App;
