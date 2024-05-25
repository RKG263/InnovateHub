import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({}, (builder) => {

  builder
    .addCase('loginRequest', (state) => {
           state.loading = true;
    })
    .addCase('loginSuccess', (state , action) => {
            state.loading = false;
            state.isAuthenticated = true; 
            state.user = action.payload.user;
            state.message = action.payload.message;
    })
    .addCase('loginFail', (state ,action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = `Please Enter Correct Feild`;
    })
    .addCase('clearError' ,( state) => {
         state.error = null;
    })
    .addCase('clearMessage' , (state)=>{
           state.message = null;
    })
    .addCase('registerRequest' , state => {
      state.loading = true;
    })
    .addCase('registerSuccess',(state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('registerFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    .addCase('logoutRequest', state => {
      state.loading = true;
    })
    .addCase('logoutSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase('logoutFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    .addCase('loadUserRequest', (state ,action) => {
      state.loading = true;
    })
    .addCase('loadUserSuccess' ,( state,action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('loadUserFail' , (state,action)=>{
      state.loading = false;
      state.isAuthenticated = false;
      // state.error = action.payload;
    })
   
});

