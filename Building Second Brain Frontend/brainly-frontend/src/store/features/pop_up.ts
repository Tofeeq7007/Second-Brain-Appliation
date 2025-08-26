import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    openPopUP:boolean,
}

const initialState: CounterState = {
    openPopUP:false
}

export const Pop_up = createSlice({
  name: 'Pop_Up',
  initialState,
  reducers: {
    revert: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.openPopUP = !state.openPopUP;
    },
  },
})

// Action creators are generated for each case reducer function
export const { revert } = Pop_up.actions

export default Pop_up.reducer