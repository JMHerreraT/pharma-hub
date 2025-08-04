// Sistema de Roles y Permisos - Pharmacy Dashboard
// ================================================================

// Definición de permisos granulares
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view' as const,

  // Productos
  PRODUCTS_VIEW: 'products:view' as const,
  PRODUCTS_CREATE: 'products:create' as const,
  PRODUCTS_EDIT: 'products:edit' as const,
  PRODUCTS_DELETE: 'products:delete' as const,

  // Medicamentos
  MEDICATIONS_VIEW: 'medications:view' as const,
  MEDICATIONS_MANAGE: 'medications:manage' as const,

  // Pedidos
  ORDERS_VIEW: 'orders:view' as const,
  ORDERS_MANAGE: 'orders:manage' as const,

  // Ventas
  SALES_VIEW: 'sales:view' as const,
  SALES_MANAGE: 'sales:manage' as const,

  // Clientes
  CUSTOMERS_VIEW: 'customers:view' as const,
  CUSTOMERS_MANAGE: 'customers:manage' as const,
  CUSTOMERS_FREQUENT_VIEW: 'customers:frequent:view' as const,

  // Reportes
  REPORTS_VIEW: 'reports:view' as const,
  REPORTS_GENERATE: 'reports:generate' as const,

  // Sistema
  SYSTEM_VIEW: 'system:view' as const,
  SYSTEM_ACTIVITY: 'system:activity' as const,
  SYSTEM_CALENDAR: 'system:calendar' as const,
  SYSTEM_AI_ASSISTANT: 'system:ai_assistant' as const,

  // Feature Flags - NUEVO
  FEATURE_MANAGEMENT: 'feature:management' as const,

  // Administración
  ADMIN_FULL_ACCESS: 'admin:full_access' as const,
} as const

// Tipo para los permisos
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Definición de roles disponibles
export const ROLES = {
  // Super Administrador - Acceso completo
  SUPER_ADMIN: {
    id: 'super_admin',
    name: 'Super Administrador',
    description: 'Acceso completo a todas las funcionalidades del sistema',
    permissions: [
      PERMISSIONS.ADMIN_FULL_ACCESS,
      // Dashboard
      PERMISSIONS.DASHBOARD_VIEW,
      // Ventas
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.SALES_MANAGE,
      // Productos
      PERMISSIONS.PRODUCTS_VIEW,
      PERMISSIONS.PRODUCTS_CREATE,
      PERMISSIONS.PRODUCTS_EDIT,
      PERMISSIONS.PRODUCTS_DELETE,
      // Pedidos
      PERMISSIONS.ORDERS_VIEW,
      PERMISSIONS.ORDERS_MANAGE,
      // Medicamentos
      PERMISSIONS.MEDICATIONS_VIEW,
      PERMISSIONS.MEDICATIONS_MANAGE,
      // Clientes
      PERMISSIONS.CUSTOMERS_VIEW,
      PERMISSIONS.CUSTOMERS_MANAGE,
      PERMISSIONS.CUSTOMERS_FREQUENT_VIEW,
      // Reportes
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      // Sistema
      PERMISSIONS.SYSTEM_VIEW,
      PERMISSIONS.SYSTEM_ACTIVITY,
      PERMISSIONS.SYSTEM_CALENDAR,
      PERMISSIONS.SYSTEM_AI_ASSISTANT,
      // Feature Flags
      PERMISSIONS.FEATURE_MANAGEMENT,
    ] as Permission[]
  },

  // Administrador de Clientes - Solo gestión de clientes
  CUSTOMER_MANAGER: {
    id: 'customer_manager',
    name: 'Gestor de Clientes',
    description: 'Acceso completo a la gestión de clientes y clientes frecuentes',
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      // Clientes
      PERMISSIONS.CUSTOMERS_VIEW,
      PERMISSIONS.CUSTOMERS_MANAGE,
      PERMISSIONS.CUSTOMERS_FREQUENT_VIEW,
      // Reportes básicos
      PERMISSIONS.REPORTS_VIEW,
    ] as Permission[]
  },

  // Administrador de Sistema - Solo funcionalidades del sistema
  SYSTEM_ADMIN: {
    id: 'system_admin',
    name: 'Administrador de Sistema',
    description: 'Acceso a configuraciones del sistema, actividad y herramientas administrativas',
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      // Sistema completo
      PERMISSIONS.SYSTEM_VIEW,
      PERMISSIONS.SYSTEM_ACTIVITY,
      PERMISSIONS.SYSTEM_CALENDAR,
      PERMISSIONS.SYSTEM_AI_ASSISTANT,
      // Reportes del sistema
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
    ] as Permission[]
  },

  // Vendedor - Solo Ventas, Productos y Pedidos
  SALES_OPERATOR: {
    id: 'sales_operator',
    name: 'Operador de Ventas',
    description: 'Acceso a ventas, productos y gestión de pedidos',
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      // Ventas
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.SALES_MANAGE,
      // Productos
      PERMISSIONS.PRODUCTS_VIEW,
      PERMISSIONS.PRODUCTS_EDIT,
      // Pedidos
      PERMISSIONS.ORDERS_VIEW,
      PERMISSIONS.ORDERS_MANAGE,
      // Medicamentos (solo visualización)
      PERMISSIONS.MEDICATIONS_VIEW,
      // Reportes básicos
      PERMISSIONS.REPORTS_VIEW,
    ] as Permission[]
  },

  // Empleado Básico - Acceso limitado
  BASIC_USER: {
    id: 'basic_user',
    name: 'Usuario Básico',
    description: 'Acceso básico solo a dashboard y consultas',
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      // Solo visualización básica
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.PRODUCTS_VIEW,
      PERMISSIONS.ORDERS_VIEW,
      PERMISSIONS.MEDICATIONS_VIEW,
    ] as Permission[]
  },
}

// Tipo para los roles
export type RoleId = keyof typeof ROLES
export type Role = typeof ROLES[RoleId]

// Mapa de rutas y sus permisos requeridos
export const ROUTE_PERMISSIONS = {
  '/dashboard': [PERMISSIONS.DASHBOARD_VIEW],
  '/dashboard/sales': [PERMISSIONS.SALES_VIEW],
  '/dashboard/products': [PERMISSIONS.PRODUCTS_VIEW],
  '/dashboard/orders': [PERMISSIONS.ORDERS_VIEW],
  '/dashboard/medications': [PERMISSIONS.MEDICATIONS_VIEW],
  '/dashboard/customers': [PERMISSIONS.CUSTOMERS_VIEW],
  '/dashboard/frequent-customers': [PERMISSIONS.CUSTOMERS_FREQUENT_VIEW],
  '/dashboard/quick-reports': [PERMISSIONS.REPORTS_VIEW],
  '/dashboard/activity': [PERMISSIONS.SYSTEM_ACTIVITY],
  '/dashboard/calendar': [PERMISSIONS.SYSTEM_CALENDAR],
  '/dashboard/ai-assistant': [PERMISSIONS.SYSTEM_AI_ASSISTANT],
  '/dashboard/feature-flags': [PERMISSIONS.FEATURE_MANAGEMENT],
} as const

// Funciones helper para verificación de permisos
export class PermissionManager {
  /**
   * Verifica si un rol tiene un permiso específico
   */
  static hasPermission(roleId: RoleId, permission: Permission): boolean {
    const role = ROLES[roleId]
    if (!role) return false

    // Super admin tiene acceso a todo
    if (role.permissions.includes(PERMISSIONS.ADMIN_FULL_ACCESS as Permission)) {
      return true
    }

    return role.permissions.includes(permission)
  }

  /**
   * Verifica si un rol tiene acceso a una ruta específica
   */
  static canAccessRoute(roleId: RoleId, route: string): boolean {
    const requiredPermissions = ROUTE_PERMISSIONS[route as keyof typeof ROUTE_PERMISSIONS]
    if (!requiredPermissions) return false

    return requiredPermissions.some((permission: Permission) =>
      this.hasPermission(roleId, permission)
    )
  }

  /**
   * Obtiene todas las rutas accesibles para un rol
   */
  static getAccessibleRoutes(roleId: RoleId): string[] {
    return Object.keys(ROUTE_PERMISSIONS).filter(route =>
      this.canAccessRoute(roleId, route)
    )
  }

  /**
   * Verifica si un rol puede ver la sección de clientes (dropdown)
   */
  static canViewCustomers(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.CUSTOMERS_VIEW)
  }

  /**
   * Verifica si un rol puede gestionar clientes frecuentes
   */
  static canManageFrequentCustomers(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.CUSTOMERS_FREQUENT_VIEW)
  }

  /**
   * Verifica si un rol puede acceder a configuraciones del sistema
   */
  static canAccessSystemSettings(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.SYSTEM_VIEW)
  }

  /**
   * Verifica si un rol puede realizar ventas
   */
  static canCreateSales(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.SALES_MANAGE)
  }

  /**
   * Verifica si un rol puede gestionar productos
   */
  static canManageProducts(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.PRODUCTS_EDIT) ||
           this.hasPermission(roleId, PERMISSIONS.PRODUCTS_CREATE) ||
           this.hasPermission(roleId, PERMISSIONS.PRODUCTS_DELETE)
  }

  /**
   * Verifica si un rol puede gestionar pedidos
   */
  static canManageOrders(roleId: RoleId): boolean {
    return this.hasPermission(roleId, PERMISSIONS.ORDERS_MANAGE)
  }

  /**
   * Obtiene los permisos de un rol
   */
  static getRolePermissions(roleId: RoleId): Permission[] {
    const role = ROLES[roleId]
    return role ? [...role.permissions] : []
  }

  /**
   * Obtiene información completa de un rol
   */
  static getRoleInfo(roleId: RoleId): Role | null {
    return ROLES[roleId] || null
  }

  /**
   * Lista todos los roles disponibles
   */
  static getAllRoles(): Role[] {
    return Object.values(ROLES)
  }
}

// Contexto de usuario simulado (esto normalmente vendría de auth)
export interface UserContext {
  id: string
  name: string
  email: string
  roleId: RoleId
  isActive: boolean
}

// Hook simulado para obtener el contexto del usuario actual
export const getCurrentUser = (): UserContext => {
  // En una app real, esto vendría del contexto de autenticación
  return {
    id: '1',
    name: 'Jorge Herrera',
    email: 'jorge@pharmacy.com',
    roleId: 'SUPER_ADMIN', // Cambiar según el usuario logueado
    isActive: true
  }
}

// Función helper para verificar permisos del usuario actual
export const userCan = (permission: Permission): boolean => {
  const user = getCurrentUser()
  return PermissionManager.hasPermission(user.roleId, permission)
}

// Función helper para verificar acceso a rutas del usuario actual
export const userCanAccessRoute = (route: string): boolean => {
  const user = getCurrentUser()
  return PermissionManager.canAccessRoute(user.roleId, route)
}

// Ejemplos de uso:
// ================================================================

// Verificar si el usuario actual puede ver clientes
// const canViewCustomers = userCan(PERMISSIONS.CUSTOMERS_VIEW)

// Verificar si un rol específico puede gestionar pedidos
// const canManage = PermissionManager.canManageOrders('SALES_OPERATOR')

// Obtener rutas accesibles para un rol
// const routes = PermissionManager.getAccessibleRoutes('CUSTOMER_MANAGER')

// Verificar acceso a ruta específica
// const hasAccess = userCanAccessRoute('/dashboard/customers')

export default PermissionManager
