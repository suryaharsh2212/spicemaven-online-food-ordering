import React from 'react';
import { UseRegister } from '../hooks/useRegister';
import { useDispatch, useSelector } from "react-redux"
import { setEmail, setId, setName, setPhoneNo, setLoginState, seterrorMessage, setshowError } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import Alerterror from './Alerterror';
import { EmailVerifier, PhoneNoVerifier } from '../Utility/Verification';
function RegisterModal() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)



    const handlesubmit = async (e) => {
        e.preventDefault()
        const form = document.getElementById('form');
        const formdata = new FormData(form);


        const formDataObject = {};
        formdata.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formDataObject);
        if (!PhoneNoVerifier(formDataObject.phoneNo)) {
            dispatch(setshowError('visible'))
            dispatch(seterrorMessage('PhoneNo is not valid'))
        }
        else if (!EmailVerifier(formDataObject.email)) {
            dispatch(setshowError('visible'))
            dispatch(seterrorMessage('email is not valid'))
        }
        else if (!formDataObject.password.length >= 8) {
            dispatch(setshowError('visible'))
            dispatch(seterrorMessage('Password length must be of length 8'))
        }
        else {
            const res = await UseRegister(formDataObject);
            if (!res.error) {
                dispatch(setId(res.user.id))
                dispatch(setName(res.user.name))
                dispatch(setEmail(res.user.email))
                dispatch(setLoginState(true))
                dispatch(setPhoneNo(res.user.phoneNo))
                document.getElementById("my_modal_6").close()
                navigate(`/user/restro/${res.user.id}`)
                dispatch(setshowError('hidden'))
                dispatch(seterrorMessage(''))
            }
            else {
                dispatch(setshowError('visible'))
                dispatch(seterrorMessage(res.message))
            }
        }







    }

    


    return (
        <div>
            <dialog id="my_modal_6" className="modal flex justify-center">
            <Alerterror isVisible={user.showError} message={user.errorMessage} />
                <div className="modal-box">
                <button
        className="btn z-50 btn-sm btn-circle scale-125 btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById('my_modal_6').close()}
    >
        ✕
    </button>
                    <h1 className='text-center text-2xl mb-5'>Register your Account</h1>
               
                    <div className=' flex justify-center items-center p-5' >
                      


                        <form onSubmit={handlesubmit} id='form' className="  md:mt-5 grid grid-cols-6 w-80 md:w-96  gap-6">

                            <div className="col-span-6 ">
                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    name="name"
                                    className="mt-1 p-3 w-full rounded-md border-gray-700 bg-gray-100 text-sm text-gray-700 shadow-sm"
                                />
                            </div>



                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 p-3 text-sm text-gray-700 shadow-sm"
                                />
                            </div>
                            <div className="col-span-6">
                                <label htmlFor="PhoneNo" className="block text-sm font-medium text-gray-700">PhoneNo </label>

                                <input
                                    type="text"
                                    id="PhoneNo"
                                    name="phoneNo"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 p-3 text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 ">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="mt-1 w-full p-3  rounded-md border-gray-200 bg-gray-100  text-sm text-gray-700 shadow-sm"
                                />
                            </div>







                            <div className="col-span-6 flex flex-col sm:items-center sm:gap-4 mt-5">
                                <button type='submit'
                                    className="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 w-full py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500"
                                >
                                    {user.loadingstate
                                        ? <div className='flex justify-center'><img className="w-7 h-7 animate-spin " src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" />Loading....</div>
                                        : <>Signup</>
                                    }
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <button onClick={() => { document.getElementById('my_modal_3').showModal(), dispatch(setshowError('hidden')); document.getElementById('my_modal_6').close(); dispatch(setshowError(false)) }} className="text-gray-700 underline">Log in</button>.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default RegisterModal;




