import { configureStore } from '@reduxjs/toolkit'
import characterSlice from './slices/characters'
import authSlice from './slices/auth'

export const makeStore = () => {
  return configureStore({
    reducer: {
      characters: characterSlice,
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
