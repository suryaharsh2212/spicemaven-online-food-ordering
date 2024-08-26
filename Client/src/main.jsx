
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Hero from './assets/Hero.jsx';
import Menu from './Components/Menu.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import Profile from './Components/Profile.jsx'; 
import Cart from './Components/Cart.jsx';

import Finalizedetail from './Components/Finalizedetail.jsx';
import Order_confo from './Components/Order_confo.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Hero />} />
      <Route path='/user/restro/:id' element={<Menu />} />
      <Route path='/user/restro/:id/:name' element={<Profile />} />
      <Route path='/user/restro/:id/cart' element={<Cart/>}/>
      <Route path='/user/restro/:id/location' element={<Finalizedetail/>}/>
      <Route path='/user/restro/:id/confirmOrder' element={<Order_confo/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
