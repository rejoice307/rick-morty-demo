import type { Metadata } from 'next'
// import { Inter_Tight } from "next/font/google";
import React from 'react'
import type { ChildrenType } from '@/types'

import ProvidersWrapper from '@/components/ProvidersWrapper'

import './globals.css'

// const geistSans = Inter_Tight({
//   variable: "--font-inter-tight",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

export const metadata: Metadata = {
  title: {
    default: 'Rick & Morty',
    template: '%s | Rick & Morty',
  },
  description: 'Encyclopedia of Rick & Morty Show',
}

const RootLayout = ({ children }: ChildrenType) => {
  return (
    <html lang="en">
      <body className={'geistSans.variable'}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}

export default RootLayout
