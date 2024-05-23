import { server } from '../store';
import axios from 'axios';

export const login = (email, password , role) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/auth/login`,
      { email, password , role},
      {
        // headers: {
        //   'Content-type': 'application/json',
        // },

        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};
export const register = (name , email , password , role)  => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' }); 
      const { data } = await axios.post(`${server}/auth/register`, {name , email , password , role}, {
        // headers: {
        //   'Content-type': 'multipart/form-data',
        // },
  
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
  
      const { data } = await axios.get(`${server}/auth/logout`, {
            withCredentials: true,
      });
      dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
  };