# 🎯 Role Mapping Implementation - PharmaHub Frontend

## 📋 Overview

Este documento describe la implementación completa del sistema de roles en el frontend de PharmaHub, siguiendo el **Role Mapping Guide** proporcionado.

---

## 🔄 Role Mapping Table

### Frontend Roles → Cognito Roles

| Frontend Role | Cognito Role | Description | Permissions |
|---------------|--------------|-------------|-------------|
| `SUPER_ADMIN` | `super_admin` | Super Administrador - Acceso completo | Todos los permisos |
| `ADMIN` | `admin` | Administrador - Acceso completo a organización | Todos excepto super admin |
| `SYSTEM_ADMIN` | `system_admin` | Administrador de Sistema | Sistema, reportes, usuarios |
| `CUSTOMER_MANAGER` | `customer_manager` | Gestor de Clientes | Clientes, reportes básicos |
| `SALES_OPERATOR` | `sales_operator` | Operador de Ventas | Ventas, productos, pedidos |
| `PHARMACIST` | `pharmacist` | Farmacéutico | Medicamentos, consultas |
| `ASSISTANT` | `assistant` | Asistente | Acceso limitado |
| `BASIC_USER` | `basic_user` | Usuario Básico | Solo dashboard y consultas |

---

## 🎯 Implementation Status

### ✅ Completed

1. **✅ Tipos de roles actualizados** (`src/types/auth.ts`)
   - `UserRole` type con todos los 8 roles
   - `User` interface actualizada
   - `InviteUserData` interface actualizada

2. **✅ Roles implementados** (`src/lib/roles.ts`)
   - `SUPER_ADMIN` - Acceso completo
   - `ADMIN` - Acceso completo a organización
   - `SYSTEM_ADMIN` - Administrador de sistema
   - `CUSTOMER_MANAGER` - Gestor de clientes
   - `SALES_OPERATOR` - Operador de ventas
   - `PHARMACIST` - Farmacéutico
   - `ASSISTANT` - Asistente
   - `BASIC_USER` - Usuario básico

3. **✅ Mapeo de Cognito** (`src/lib/roles.ts`)
   - `COGNITO_ROLE_MAPPING` - Mapeo completo
   - `mapCognitoRoleToRoleId()` - Función helper

4. **✅ Formulario de invitación actualizado** (`src/components/organisms/InviteUserForm/index.tsx`)
   - Todos los 8 roles disponibles
   - UI actualizada con nombres descriptivos

5. **✅ Hook de autenticación actualizado** (`src/hooks/use-auth.ts`)
   - Soporte para `UserRole` type
   - Mapeo correcto de claims de Cognito

6. **✅ Página de invitación actualizada** (`src/app/(admin)/dashboard/invite/page.tsx`)
   - Usa `mapCognitoRoleToRoleId()` para verificación de permisos

---

## 🔐 Permission Matrix

### Super Admin (`super_admin`)
- ✅ **Todos los permisos**
- ✅ **Acceso completo a todo el sistema**
- ✅ **Puede crear otros super admins**

### Admin (`admin`)
- ✅ **Acceso completo a organización**
- ✅ **Puede invitar usuarios**
- ✅ **Gestión de sucursales**
- ❌ **No puede crear super admins**

### System Admin (`system_admin`)
- ✅ **Configuraciones del sistema**
- ✅ **Actividad y logs**
- ✅ **Gestión de usuarios**
- ✅ **Feature flags**
- ❌ **No acceso a ventas/productos**

### Customer Manager (`customer_manager`)
- ✅ **Gestión completa de clientes**
- ✅ **Clientes frecuentes**
- ✅ **Reportes básicos**
- ❌ **No acceso a ventas/productos**

### Sales Operator (`sales_operator`)
- ✅ **Ventas y pedidos**
- ✅ **Gestión de productos**
- ✅ **Medicamentos (solo vista)**
- ❌ **No gestión de clientes**

### Pharmacist (`pharmacist`)
- ✅ **Gestión de medicamentos**
- ✅ **Consultas farmacéuticas**
- ✅ **Productos (edición)**
- ✅ **AI Assistant**
- ❌ **No ventas/pedidos**

### Assistant (`assistant`)
- ✅ **Dashboard básico**
- ✅ **Vista de productos**
- ✅ **Vista de ventas**
- ✅ **Vista de clientes**
- ❌ **No gestión**

### Basic User (`basic_user`)
- ✅ **Dashboard básico**
- ✅ **Consultas**
- ❌ **No gestión**

---

## 🚀 Usage Examples

### 1. Verificar permisos de usuario

```typescript
import { PermissionManager, PERMISSIONS, mapCognitoRoleToRoleId } from '@/lib/roles'

// Verificar si usuario puede invitar usuarios
const canInviteUsers = PermissionManager.hasPermission(
  mapCognitoRoleToRoleId(user.role),
  PERMISSIONS.USER_MANAGEMENT
)
```

### 2. Mapear rol de Cognito

```typescript
import { mapCognitoRoleToRoleId } from '@/lib/roles'

// Mapear rol de Cognito al frontend
const roleId = mapCognitoRoleToRoleId('pharmacist') // Returns 'PHARMACIST'
```

### 3. Invitar usuario con nuevo rol

```typescript
import { useInviteUser } from '@/lib/auth-services'

const inviteUserMutation = useInviteUser()

await inviteUserMutation.mutateAsync({
  email: 'user@example.com',
  name: 'John Doe',
  role: 'pharmacist', // Nuevo tipo UserRole
  businessId: 'farmacia-demo-centro'
})
```

---

## 🔧 Migration Notes

### Backward Compatibility
- ✅ **Roles legacy soportados**: `admin`, `pharmacist`, `assistant`
- ✅ **Mapeo automático**: Roles legacy se mapean a nuevos roles
- ✅ **Fallback**: Roles desconocidos → `BASIC_USER`

### Type Safety
- ✅ **TypeScript**: Todos los tipos están tipados correctamente
- ✅ **Zod validation**: Schemas actualizados para nuevos roles
- ✅ **Runtime validation**: Verificación de roles en runtime

---

## 📊 Testing Scenarios

### Test Case 1: Super Admin Invitation
```typescript
// Invitar super admin
const result = await inviteUserMutation.mutateAsync({
  email: 'super.admin@example.com',
  name: 'Super Admin',
  role: 'super_admin'
})
```

### Test Case 2: Customer Manager Invitation
```typescript
// Invitar customer manager
const result = await inviteUserMutation.mutateAsync({
  email: 'customer.manager@example.com',
  name: 'Customer Manager',
  role: 'customer_manager'
})
```

### Test Case 3: Role Validation
```typescript
// Verificar permisos
const canAccess = PermissionManager.hasPermission(
  mapCognitoRoleToRoleId('pharmacist'),
  PERMISSIONS.MEDICATIONS_MANAGE
) // Returns true
```

---

## 🎯 Next Steps

1. **✅ Frontend Implementation**: Completado
2. **🔄 Backend Integration**: Pendiente
3. **🧪 Testing**: Pendiente
4. **📚 Documentation**: Completado
5. **🚀 Deployment**: Pendiente

---

## 📝 Notes

1. **Role Hierarchy**: Super Admin > Admin > System Admin > Others
2. **Permission Inheritance**: Higher roles inherit permissions from lower roles
3. **Multi-Tenancy**: Roles are scoped to organization/branch level
4. **Audit Trail**: All role changes are logged in ActivityLogs
5. **Backward Compatibility**: Legacy roles are still supported

---

*Esta implementación cubre completamente el Role Mapping Guide proporcionado.*
