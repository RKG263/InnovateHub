import { server } from '../store';
import axios from 'axios';

export const login = (email, password , role) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
<<<<<<< HEAD
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/login`,
      { email, password , role},
      {
=======
      `${server}/auth/login`,
      { email, password , role},
      {
        // headers: {
        //   'Content-type': 'application/json',
        // },

>>>>>>> 34959a4bb0adb4f315ea83832c7c77d5beb276fc
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};
<<<<<<< HEAD



export const register = formdata => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' });
  
      const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/register`, formdata, {
    
=======
export const register = (name , email , password , role)  => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' }); 
      const { data } = await axios.post(`${server}/auth/register`, {name , email , password , role}, {
        // headers: {
        //   'Content-type': 'multipart/form-data',
        // },
  
>>>>>>> 34959a4bb0adb4f315ea83832c7c77d5beb276fc
        withCredentials: true,
      });
  
      dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
      dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
  };
  export const logout = () => async dispatch => {
    try {
      dispatch({ type: 'logoutRequest' });
  
<<<<<<< HEAD
      const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/logout`, {
=======
      const { data } = await axios.get(`${server}/auth/logout`, {
>>>>>>> 34959a4bb0adb4f315ea83832c7c77d5beb276fc
            withCredentials: true,
      });
      dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
  };