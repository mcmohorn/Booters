import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import areasReducer from './redux/areasSlice'
import logger from 'redux-logger'
export default configureStore({
  reducer: {
    areas: areasReducer,
    // jumps: jumpsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})