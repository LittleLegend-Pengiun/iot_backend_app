import { configureStore } from "@reduxjs/toolkit";
import languageReducer from '../feature/languageSlice';
import darkmodeReducer from '../feature/darkmodeSlice';

export default configureStore({
  reducer:{
    language: languageReducer,
    darkmode: darkmodeReducer
  }
})