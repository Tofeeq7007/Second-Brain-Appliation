import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    ModalOpen:boolean,
}

const initialState: CounterState = {
    ModalOpen:false
}

export const ModalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    Open: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.ModalOpen = true;
    },
    Close: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.ModalOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { Open, Close } = ModalSlice.actions

export default ModalSlice.reducer