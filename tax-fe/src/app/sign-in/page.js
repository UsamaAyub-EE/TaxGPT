'use client'

import { SignInForm } from '@/components/SignIn/SignInForm'
import { Box, Typography } from '@mui/material'

export default function SignInPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      }}>
      <Typography gutterBottom variant="h2">
        Sign In
      </Typography>

      <SignInForm />
    </Box>
  )
}
