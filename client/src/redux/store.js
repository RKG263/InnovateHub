import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/UserReducer/userReducer';
import { otherReducer } from './reducers/OtherReducer/otherReducer';


const store = configureStore({
  reducer: {
    user:   userReducer,
    other : otherReducer,
  },
});
export default store;
export const server = 'http://localhost:8000/api/v1'; 