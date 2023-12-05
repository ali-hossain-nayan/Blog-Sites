import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import contactSlice from './contactSlice';


//here we create the store and inside object always return the reducer and give the 
//reducer we create authSlice reducer and pass it here
const store = configureStore({
    reducer: {
        auth : authSlice,
        contact: contactSlice,
        //this key value comes from our authslice same as key value as reucers is a object
        //TODO: add more slices here for posts
    }
});


export default store;