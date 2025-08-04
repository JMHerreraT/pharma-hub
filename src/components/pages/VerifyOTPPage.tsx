"use client"

import React from 'react'
import AuthLayout from '@/components/templates/AuthLayout'
import VerifyOTPForm from '@/components/organisms/VerifyOTPForm'

const VerifyOTPPage = () => {
  return (
    <AuthLayout>
      <VerifyOTPForm />
    </AuthLayout>
  )
}

export default VerifyOTPPage
