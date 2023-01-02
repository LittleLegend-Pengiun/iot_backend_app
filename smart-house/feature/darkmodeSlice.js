import { createSlice } from "@reduxjs/toolkit";
import { Li, Dar } from '../resources/darkmode';

const darkmodeSlice = createSlice({
  name: 'darkmode',
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

export const { changeToLi, changeToDar } = darkmodeSlice.actions

export default darkmodeSlice.reducer;