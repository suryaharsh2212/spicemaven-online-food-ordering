
import { Outlet } from 'react-router-dom'

import NavbarNew from './assets/NavbarNew'
import Footer from './Components/Footer'
import Final_Navbar from './Components/Nav_Bar';


function App() {
  return (
    <div>

      {/* <NavbarNew />   */}
      <Final_Navbar/>
      <Outlet />
      <Footer />

    </div>
  )
}

export default App;
