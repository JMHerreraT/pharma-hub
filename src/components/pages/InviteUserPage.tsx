"use client"

import React from 'react'
import InviteUserPageHeader from '@/components/organisms/InviteUserPageHeader'
import InviteUserForm from '@/components/organisms/InviteUserForm'

const InviteUserPage = ({ organization }: { organization?: {
  id: string
  organizationName: string
  branches: Array<{ id: string; name: string; businessId: string; city: string }>
} }) => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con título, breadcrumb y acciones */}
        <InviteUserPageHeader />

        {/* Contenido centrado y ancho ampliado */}
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <InviteUserForm organization={ organization } className="max-w-2xl sm:max-w-3xl" />
        </div>
      </div>
    </div>
  )
}

export default InviteUserPage
