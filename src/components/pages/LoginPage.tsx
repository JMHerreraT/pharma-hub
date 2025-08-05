"use client"

import React from 'react'
import AuthLayout from '@/components/templates/AuthLayout'
import LoginForm from '@/components/organisms/LoginForm'
import { PublicRoute } from '@/components/guards/AuthGuard'

const LoginPage = () => {
  return (
    <PublicRoute redirectTo="/dashboard">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </PublicRoute>
  )
}

export default LoginPage
