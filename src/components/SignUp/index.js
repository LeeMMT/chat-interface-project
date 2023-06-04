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
import Container from '@mui/material/Container'
import { Alert, Collapse } from '@mui/material'
import { useSignUpLogic } from './SignUpLogic'

export default function SignUp() {
  const { handleSubmit, onSubmit, register, errors, signUpError, alertOpen, setAlertOpen } = useSignUpLogic()
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
          Sign up
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
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  validate: {
                    hasUpperCase: (value) => /[A-Z]/.test(value) || 'Password must contain at least 1 uppercase letter',
                    hasNumber: (value) => /\d/.test(value) || 'Password must contain at least 1 number',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message || 'Password should contain at least 6 characters, at least one uppercase letter, and at least one number'}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {signUpError && (
              <Grid item xs={12}>
                <Collapse in={alertOpen}>
                  <Alert onClose={() => setAlertOpen(false)} severity="error">
                    {signUpError}
                  </Alert>
                </Collapse>
              </Grid>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="sign-in" variant="body2">
                Already have an account? Sign in now
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
