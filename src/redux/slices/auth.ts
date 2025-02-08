'use client'

import { API_ROUTES, AUTH } from '@/config/constants'
import HttpClient from '@/libs/http'
import type { UserType } from '@/types/auth'
import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { setCookie, deleteCookie } from 'cookies-next/client'

type AuthStateType = {
  isAuthenticated: boolean
  user?: UserType
  isLoading: boolean
  error?: string
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: undefined,
  isLoading: false,
}

export type LoginFormFields = {
  email: string
  password: string
}

export const saveSession = createAsyncThunk(
  'auth/save-session',
  async (user: LoginFormFields) => {
    try {
      const data = (await HttpClient.post(API_ROUTES.BE + '/auth/login', user))
        .data as UserType
      // const data = await fetch({ method: 'POST', url: '/api/auth/login', body: user })
      setCookie(AUTH.COOKIE_TOKEN, data.token)
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeSession: (state) => {
      state.isAuthenticated = initialState.isAuthenticated
      state.user = undefined
      deleteCookie(AUTH.COOKIE_TOKEN)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthStateType>) => {
    builder.addCase(saveSession.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
      state.error = undefined
    })
    builder.addCase(saveSession.pending, (state) => {
      state.isLoading = true
      state.error = undefined
    })
    builder.addCase(saveSession.rejected, (state, payload) => {
      state.isLoading = false
      state.error = payload.error.message
    })
  },
})

export const { removeSession } = authSlice.actions
export default authSlice.reducer
