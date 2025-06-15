import { useDispatch } from 'react-redux';
import MenuCard from './MenuCard';
import SideBar from './SideBar';
import { addItem } from '../redux/cartslice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice';
import { ToastContainer, toast, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { UseGetItem } from '../hooks/useGetItem';
import { UseSearch } from '../hooks/UseSearch';
import { Search } from 'lucide-react';

function Menu() {
  const navigate = useNavigate();
  const [type, setType] = useState('Starters');
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const debounceRef = useRef(null);
  const lastErrorSearch = useRef('');

  useEffect(() => {
    if (!token) {
      navigate('/');
      alert('Session expired');
      dispatch(logout());
    }
  }, [navigate, dispatch]);

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
    toast.warn(`${item.name} added to cart`, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Flip,
    });
    dispatch(addItem(item));
  };

  const SelectType = (val) => {
    setType(val);
  };

  const finditembysearch = async () => {
    try {
      const res = await UseSearch(search);
      if (res.error) {
        if (lastErrorSearch.current !== search) {
          lastErrorSearch.current = search;
          toast.error(`${search} Item not Available...`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            transition: Bounce,
          });
        }
        return;
      }

      if (res && res.data) {
        const searchResults = res.data;
        setDishes((prevDishes) => {
          const combined = [...searchResults, ...prevDishes];
          const unique = combined.filter(
            (dish, index, self) =>
              index === self.findIndex((d) => d.name === dish.name)
          );
          return unique;
        });
      }
    } catch (error) {
      console.error('Error searching for items:', error);
    }
  };

  useEffect(() => {
    if (search.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        finditembysearch();
      }, 500);
    }
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  return (
    <div>
      {/* Search bar */}
      <div className="md:mr-5 md:ml-72 -mt-3 md:-mt-1 flex justify-center items-center">
        <div className="relative w-full mt-3 p-3 md:p-5">
          <label htmlFor="Search" className="sr-only">Search</label>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="Search"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  finditembysearch();
                }
              }}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
        {/* Sidebar */}
        <div className="h-full w-full rounded-lg bg-gray-50 px-4 py-6">
          <SideBar onSelectType={SelectType} />
        </div>

        {/* Menu cards */}
        <div className="lg:col-span-5 bg-white p-4 overflow-y-scroll -mt-5 md:-mt-2 h-screen scrollbar-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dishes.length > 0 ? (
              dishes.map((ele, index) => (
                <MenuCard
                  key={index}
                  link={ele.image}
                  name={ele.name}
                  price={ele.price}
                  rating={'4.5'}
                  category={type}
                  description={ele.description}
                  onAddToCart={() => handleAddToCart(ele)}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
        theme="colored"
        transition={Flip}
      />
    </div>
  );
}

export default Menu;
