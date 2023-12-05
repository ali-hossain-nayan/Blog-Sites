import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import contactSlice from './contactSlice';



const store = configureStore({
    reducer: {
        auth : authSlice,
        contact: contactSlice,
        
    }
});


export default store;