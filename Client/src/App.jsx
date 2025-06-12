
import { Outlet } from 'react-router-dom'
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from './redux/slice';
import Footer from './Components/Footer'
import Final_Navbar from './Components/Nav_Bar';
import TestModeBanner from './assets/Banner';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
  const token = localStorage.getItem("token");
  

  if (token) {
    // dispatch(setLoginState(true));

  }
}, []);
  return (
    <div>

      <Final_Navbar/>
      <TestModeBanner/>
      <Outlet />
      <Footer />

    </div>
  )
}

export default App;
