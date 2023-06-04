import { UserProvider } from '@/contexts/userContext'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme } from '@/theme'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}
