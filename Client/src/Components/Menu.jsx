import { useDispatch, useSelector } from 'react-redux';
import MenuCard from './MenuCard';
import SideBar from './SideBar';
import { addItem } from '../redux/cartslice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice';
import { ToastContainer, toast, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { UseGetItem } from '../hooks/useGetItem';
import { UseSearch } from '../hooks/UseSearch';

function Menu() {
  const navigate = useNavigate();
  const [type, setType] = useState('Starters');
  const [dishes, setDishes] = useState([]);
  const st = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  useEffect(() => {
    if (st === false) {
      navigate("/");
      alert("session expired");
      dispatch(logout());
    }
  }, [st, navigate, dispatch]);

  useEffect(() => {
    const callitem = async () => {
      try {
        const res = await UseGetItem(type);
        if (res && res.data) {
          setDishes(res.data);
        } else {
          console.error('No data found');
          setDishes([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setDishes([]);
      }
    };
    callitem();
  }, [type]);

  const handleAddToCart = (item) => {
    toast.warn(`${item.name} added to cart `, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
    dispatch(addItem(item));
  };

  const SelectType = (val) => {
    setType(val);
  }
  const finditembysearch = async () => {
    try {
      const res = await UseSearch(search);
      if (res.error) {
        toast.error(`${search} Item not Available...`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          transition: Bounce,
        });
      }
      if (res && res.data) {
        const searchResults = res.data;

        setDishes((prevDishes) => {
          const combinedDishes = [...searchResults, ...prevDishes];

          const uniqueDishes = combinedDishes.filter(
            (dish, index, self) =>
              index === self.findIndex((d) => d.name === dish.name)
          );

          return uniqueDishes;
        });
      }
    } catch (error) {
      console.error('Error searching for items:', error);
    }
  };



  return (
    <div>
      <div className='md:mr-5 md:ml-72 -mt-3 md:-mt-1 flex justify-center items-center'>
        <div className="relative w-full mt-3 p-3 md:p-5">
          <label htmlFor="Search" className="sr-only">Search</label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-full border-gray-300 py-2.5 pl-10 pr-12 h-14 bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3 mr-10">
            <button onClick={finditembysearch} className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <img className='h-5 w-5' src="https://cdn-icons-png.flaticon.com/128/3917/3917132.png" alt="Search Icon" />
            </button>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
        <div className="h-fit md:mt-5 w-full flex-1 rounded-lg bg-gray-50">
          <SideBar onSelectType={(val) => SelectType(val)} />
        </div>
        <div className="rounded-lg bg-gray-50 lg:col-span-5 overflow-y-auto p-4">
          <div className="grid h-screen grid-cols-1 md:grid-cols-4 scrollbar-hidden md:p-5 overflow-y-scroll lg:grid-cols-4">
            {dishes.length > 0 ? (
              dishes.map((ele, index) => (
                <MenuCard
                  key={index}
                  link={ele.image}
                  name={ele.name}
                  price={ele.price}
                  description={ele.description}
                  onAddToCart={() => handleAddToCart(ele)}
                />
              ))
            ) : (
              <div className='flex w-full justify-center items-center'>
                     <span className="loader"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
     
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick={true}
        theme="colored"
        transition={Flip}
      />
     
    </div>
  );
}

export default Menu;
