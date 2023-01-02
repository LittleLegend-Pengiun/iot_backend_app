import { createSlice } from "@reduxjs/toolkit";
import { Li, Dar } from '../resources/darkmode';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: Li },
  reducers: {
    changeToLi: state => {
      state.value = Li
    },
    changeToDar: state => {
      state.value = Dar
    }
  }
})

export const { changeToLi, changeToDar } = themeSlice.actions

export default themeSlice.reducer;