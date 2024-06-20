import { server } from '../store';
import axios from 'axios';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'contactRequest' });

    const { data } = await axios.post(
      `${server}/other/contact`,
      { name, email, message },
      config
    );

    dispatch({ type: 'contactSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    });
  }
};
export const Approach = (senderId, receiverId ,name, email ,description, url) => async dispatch  => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'approachRequest' });
    const {data} = await axios.post(`${server}/other/approach`, {
      senderId, receiverId,name , email , description , url
    } , config);

    dispatch({type : 'approachSuccess' , payload : data.message})
  } catch (error) {
    dispatch({
      type: 'approachFail',
      payload: error.response.data.message,
    });
  }
};
export const fetchNotification = (userId) => async dispatch  => {
  try {
    dispatch({ type: 'fetchNotifcationRequest' });
    //  console.log(userId);
    const { data } = await axios.post(`${server}/other/fetchnotifications`,{userId} , {
          withCredentials: true,
    });
    dispatch({ type: 'fetchNotifcationSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchNotifcationfail', payload: error.response.data.message });
  }
};

