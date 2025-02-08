'use client'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PasswordInput from '@/components/form/PasswordInput'
import FormInput from '@/components/form/TextInput'
import { saveSession, type LoginFormFields } from '@/redux/slices/auth'
import type { AppDispatch, RootState } from '@/redux/store'
import { ROUTES } from '@/config/constants'

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const error = useSelector((state: RootState) => state.auth.error)
  const user = useSelector((state: RootState) => state.auth.user)
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
    password: yup.string().required('Please enter password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'john@example.com',
      password: 'password123',
    },
  })

  const handleLogin = (data: LoginFormFields) => dispatch(saveSession(data))

  useEffect(() => {
    if (user && isAuthenticated) push(ROUTES.HOME)
  }, [isAuthenticated])

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: 'error' })
  }, [error])

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <FormInput
        name="email"
        type="email"
        label="Email Address"
        control={control}
      />

      <Box sx={{ mt: 2 }}>
        <PasswordInput
          name="password"
          type="password"
          label={'Password'}
          control={control}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          size={'large'}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </form>
  )
}
