import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import FrequentCustomersDataTable from '../FrequentCustomersDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

// Mock data de clientes frecuentes (mismo que FrequentCustomersPage)
const clientesFrecuentes = [
  {
    id: "12345678",
    name: "María González Pérez",
    email: "maria.gonzalez@email.com",
    phone: "555-0123",
    address: "Av. Principal 123, Col. Centro",
    totalPurchases: 15,
    totalSpent: 2450.75,
    lastPurchase: "2024-01-10",
    loyaltyPoints: 245,
    tier: "Gold",
    joinDate: "2023-06-15",
    favoriteCategory: "Analgésicos",
    birthDate: "1985-03-22"
  },
  {
    id: "87654321",
    name: "Carlos Rodríguez López",
    email: "carlos.rodriguez@email.com",
    phone: "555-0456",
    address: "Calle 5 de Mayo 456, Col. Reforma",
    totalPurchases: 22,
    totalSpent: 3850.25,
    lastPurchase: "2024-01-08",
    loyaltyPoints: 385,
    tier: "Diamond",
    joinDate: "2023-02-10",
    favoriteCategory: "Vitaminas",
    birthDate: "1978-11-14"
  },
  {
    id: "11223344",
    name: "Ana Silva Martínez",
    email: "ana.silva@email.com",
    phone: "555-0789",
    address: "Blvd. Insurgentes 789, Col. Roma",
    totalPurchases: 18,
    totalSpent: 2890.50,
    lastPurchase: "2024-01-12",
    loyaltyPoints: 289,
    tier: "Gold",
    joinDate: "2023-09-20",
    favoriteCategory: "Dermatología",
    birthDate: "1990-07-28"
  }
]

const LazyFrequentCustomersDataTable = () => {
  const { isLoading } = useSimulateLoading({ delay: 1300 })

  if (isLoading) {
    return <DataTableSkeleton rows={8} columns={9} showHeader={false} />
  }

  return (
    <FrequentCustomersDataTable
      customers={clientesFrecuentes.map((customer, index) => ({
        id: index + 1,
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        totalPurchases: customer.totalPurchases,
        totalSpent: customer.totalSpent,
        lastPurchase: customer.lastPurchase,
        loyaltyPoints: customer.loyaltyPoints,
        tier: customer.tier,
        joinDate: customer.joinDate,
        favoriteCategory: customer.favoriteCategory,
        birthDate: customer.birthDate,
      }))}
      enableRowsPerPage={true}
      enablePagination={true}
      defaultItemsToShow={8}
    />
  )
}

export default LazyFrequentCustomersDataTable
