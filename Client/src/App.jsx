import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Ably from 'ably';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Components/Footer';
import Final_Navbar from './Components/Nav_Bar';
import TestModeBanner from './assets/Banner';

function App() {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const ably = new Ably.Realtime({
      key: 'D3oMJQ.KLXXSg:fF4sPNms7-Fusun_3tsOPg0K1LWPryvPoL9dahM15qA'
    });
    const channel = ably.channels.get('restaurant-status');

    channel.subscribe('status-change', (message) => {
      const { acceptingOrders } = message.data;
      setStatus(acceptingOrders);
      localStorage.setItem('restaurantStatus', acceptingOrders);

      const toastId = 'restaurant-status-toast';


      if (!toast.isActive(toastId, { containerId: 'restaurantStatus' })) {
        toast.success(
          `Restaurant is now ${acceptingOrders ? 'accepting' : 'not accepting'} orders.`,
          {
            containerId: 'restaurantStatus',
            toastId: toastId,
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce
          }
        );
      }
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, []);

  return (
    <div>
      <Final_Navbar />
      <TestModeBanner
        msg={
          status
            ? 'Restaurant is accepting orders now'
            : 'Restaurant is currently not accepting orders'
        }
      />
      <Outlet />
      <Footer />

      <ToastContainer
        containerId="restaurantStatus"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
