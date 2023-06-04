import { createTheme } from '@mui/material/styles'

import { Source_Serif_Pro } from 'next/font/google'
const sourceSerifPro = Source_Serif_Pro({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

import { Nunito } from 'next/font/google'
const nunito = Nunito({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f2e71',
    },
    secondary: {
      main: '#7bb4c4',
    },
  },
  typography: {
    fontFamily: nunito.style.fontFamily,
  },
})
