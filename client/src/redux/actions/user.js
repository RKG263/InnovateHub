import { server } from '../store';
import axios from 'axios';

export const login = (email, password , role) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/login`,
      { email, password , role},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};



export const register = formdata => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' });
  
      const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/register`, formdata, {
    
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
  
      const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/auth/logout`, {
            withCredentials: true,
      });
      dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
  };