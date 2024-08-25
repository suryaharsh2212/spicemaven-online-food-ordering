
import { Outlet } from 'react-router-dom'


import Footer from './Components/Footer'
import Final_Navbar from './Components/Nav_Bar';


function App() {
  return (
    <div>

      <Final_Navbar/>
      <Outlet />
      <Footer />

    </div>
  )
}

export default App;
