import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setLoginState, setPhoneNo, setId, setName, setshowError, seterrorMessage, setLoadingstate } from '../redux/slice';
import { UseLogin } from '../hooks/useLogin'; // Assuming this is the correct path
import Alert from './Alert';
import Alerterror from './Alerterror';

function LoginModal() {
  const [data, setData] = React.useState('');
  const [password, setPassword] = React.useState('');
  const user = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingstate(true));

    const res = await UseLogin(data, password);

    if (res.error) {
      dispatch(setshowError('visible'));
      dispatch(seterrorMessage(res.message));
    } else {
      dispatch(setEmail(res.user.email));
      dispatch(setId(res.user.id));
      dispatch(setPhoneNo(res.user.phoneNo));
      dispatch(setName(res.user.name));
      dispatch(setLoginState(true));

      document.getElementById('my_modal_3').close();
      navigate(`/user/restro/${res.user.id}`);
    }

    dispatch(setLoadingstate(false));
    setData('');
    setPassword('');
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal modal-middle bg-transparent">
        <div className="bg-white relative p-4 sm:p-6 lg:p-8">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById('my_modal_3').close()}
          >
            ✕
          </button>

          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg w-80">
              <h1 className="text-center text-2xl font-bold text-orange-600 sm:text-3xl">
                Get started today
              </h1>

              <Alerterror isVisible={user.showError} message={user.errorMessage} />

              <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
                <p className="text-center text-lg font-medium">Sign in to your account</p>

                <div>
                  <label htmlFor="email" className="sr-only">Email/PhoneNo</label>
                  <div className="relative">
                    <input
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      type="text"
                      className="w-full rounded-lg p-4 pe-12 text-sm bg-slate-100"
                      placeholder="Enter email or Phone no"
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 bg-slate-100 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="block w-full rounded-lg bg-orange-600 px-5 py-3 text-sm font-medium text-white"
                >
                  {user.loadingstate
                    ? <div className='flex justify-center'><img className="w-7 h-7 animate-spin " src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" /></div>
                    : <>Login</>
                  }
                </button>

                <p className="text-center text-sm text-gray-500">
                  No account? <button onClick={() => { document.getElementById('my_modal_6').showModal(); document.getElementById('my_modal_3').close() }} className="underline">Sign up</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default LoginModal;
