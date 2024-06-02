import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/UserReducer/userReducer';
import { otherReducer } from './reducers/OtherReducer/otherReducer';


const store = configureStore({
  reducer: {
    user:   userReducer,
    other : otherReducer
  },
});
export default store;
export const server = `${import.meta.env.VITE_URL}/api/v1`; 