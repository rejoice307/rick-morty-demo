import type { Metadata } from 'next'
import LoginForm from './LoginForm'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage = () => {
  return (
    <>
      <Box sx={{ textAlign: 'center', mx: 'auto', width: '75%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: '16px' }}>
          Log In
        </Typography>
        <Typography variant="h6" sx={{ mb: '36px' }}>
          Enter your email address and password to access admin panel.
        </Typography>
      </Box>
      <LoginForm />
    </>
  )
}

export default LoginPage
