import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Collapse, Alert } from '@mui/material'
import Container from '@mui/material/Container'
import { useSignInLogic } from './signInLogic'

export default function SignIn() {
  const { signInError, register, handleSubmit, onSubmit, errors, alertOpen, setAlertOpen } = useSignInLogic()

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Please enter a valid email address.',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'Password is required.',
                })}
                error={!!errors.password}
                helperText={errors.password?.message || null}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {signInError && (
              <Grid item xs={12}>
                <Collapse in={alertOpen}>
                  <Alert onClose={() => setAlertOpen(false)} severity="error">
                    {signInError}
                  </Alert>
                </Collapse>
              </Grid>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/sign-up" variant="body2">
                Don't have an account yet? Sign up now
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
