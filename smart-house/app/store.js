import { configureStore } from "@reduxjs/toolkit";
import languageReducer from '../feature/languageSlice';
import themeReducer from '../feature/themeSlice';

export default configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer
  }
})