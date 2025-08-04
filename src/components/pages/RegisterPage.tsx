"use client"

import React from 'react'
import AuthLayout from '@/components/templates/AuthLayout'
import RegisterForm from '@/components/organisms/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
