import { createSlice } from "@reduxjs/toolkit";
import { Vi, Eng } from '../resources/langauge';

const languageSlice = createSlice({
  name: 'language',
  initialState: { value: Vi },
  reducers: {
    changeToVi: state => {
      state.value = Vi
    },
    changeToEng: state => {
      state.value = Eng
    }
  }
})

export const { changeToVi, changeToEng } = languageSlice.actions

export default languageSlice.reducer;