import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './features/authSlice'
import pop_option from './features/pop_up'
import newContentCreateModal from './features/ModalSlice'
export const store = configureStore({
  reducer: {
    Auth:authReducer,
    Pop_Up:pop_option, // FOR SLideBAR POP BUTTON
    Modal:newContentCreateModal
  },
})
export type MODAL_VALUE = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type POP_UP_Button = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch