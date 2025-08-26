import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    user:string,
    isauthenticated:boolean
}

const initialState: CounterState = {
  user: "",
  isauthenticated:false,
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state,action:PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload
      state.isauthenticated = true
    },
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = ""
      state.isauthenticated = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions

export default AuthSlice.reducer