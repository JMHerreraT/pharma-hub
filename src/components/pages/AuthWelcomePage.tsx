"use client"

import React from 'react'
import AuthLayout from '@/components/templates/AuthLayout'
import AuthWelcomeContent from '@/components/organisms/AuthWelcomeContent'

const AuthWelcomePage = () => {
  return (
    <AuthLayout>
      <AuthWelcomeContent />
    </AuthLayout>
  )
}

export default AuthWelcomePage
