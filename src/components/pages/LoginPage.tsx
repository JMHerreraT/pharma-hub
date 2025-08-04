"use client"

import React from 'react'
import AuthLayout from '@/components/templates/AuthLayout'
import LoginForm from '@/components/organisms/LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
