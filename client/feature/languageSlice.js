import { createSlice } from "@reduxjs/toolkit";
import { Vi, Eng, Fr, Ger, Span } from '../resources/langauge';

const languageSlice = createSlice({
  name: 'language',
  initialState: { value: Vi },
  reducers: {
    changeToVi: state => {
      state.value = Vi
    },
    changeToEng: state => {
      state.value = Eng
    },
    changeToFr: state => {
      state.value = Fr
    },
    changeToGer: state => {
      state.value = Ger
    },
    changeToSpan: state => {
      state.value = Span
    },

  }
})

export const { changeToVi, changeToEng, changeToFr, changeToGer,changeToSpan } = languageSlice.actions

export default languageSlice.reducer;