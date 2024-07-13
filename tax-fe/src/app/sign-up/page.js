'use client'

import { SignUpForm } from '@/components/SignUp/SignUpForm'
import { Box, Typography } from '@mui/material'

export default function SignUpPage() {
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
        Sign Up
      </Typography>

      <SignUpForm />
    </Box>
  )
}
