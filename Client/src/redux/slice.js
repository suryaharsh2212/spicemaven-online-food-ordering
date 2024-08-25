import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phoneNo: '',
  loadingstate: false,
  showError: 'hidden',
  errorMessage: '',
  loggedIn: false,
  totalprice:0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPrice:(state,action)=>{
      state.totalprice=action.payload
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneNo = action.payload;
    },
    setLoginState: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLoadingstate: (state, action) => {
      state.loadingstate = action.payload;
    },
    setshowError: (state, action) => {
      state.showError = action.payload;
    },
    seterrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {
  setId,
  setEmail,
  setName,
  setPhoneNo,
  setLoginState,
  setLoadingstate,
  seterrorMessage,
  setshowError,
  logout,
  setPrice
} = userSlice.actions;
