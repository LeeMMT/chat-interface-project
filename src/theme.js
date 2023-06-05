import { createTheme } from '@mui/material/styles'
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
