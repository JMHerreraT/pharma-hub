import React from 'react'
import InviteBreadcrumb from '@/components/molecules/InviteBreadcrumb'

const InviteUserPageHeader = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <InviteBreadcrumb />

      {/* Título y subtítulo */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Invitar Usuario</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Invita nuevos usuarios a tu organización</p>
      </div>
    </div>
  )
}

export default InviteUserPageHeader
