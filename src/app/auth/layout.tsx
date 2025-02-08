import { Box, Card, CardContent } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ThirdPartyAuth from '@/components/auth/ThirdPartyAuth'

import type { ChildrenType } from '@/types'

const AuthLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box sx={{ pb: 5, pt: 5 }}>
          <Box sx={{ maxWidth: '448px' }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Link
                  href="/"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Image
                    src={'/vercel.svg'}
                    alt="logo"
                    height={24}
                    width={24}
                  />
                </Link>
              </CardContent>
              <CardContent sx={{ py: 3, px: 4.5 }}>
                {children}
                <ThirdPartyAuth />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AuthLayout
