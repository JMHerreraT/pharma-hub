import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-client';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';
import type {
  LoginCredentials,
  RegisterData,
  OTPVerification,
  ForgotPasswordData,
  ResetPasswordData,
  InviteUserData,
  User,
  UserRole
} from '@/types/auth';

// Tipos para la nueva estructura de respuesta
export interface Branch {
  name: string;
  id: string;
  address: string;
  isActive: boolean;
  city: string;
  phone: string;
  businessId: string;
}

export interface Organization {
  id: string;
  organizationName: string;
  organizationCode?: string;
  branches: Branch[];
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateBusinessIdResponse {
  organization: Organization;
  selectedBranch?: Branch;
  accessType: string;
  isValid: boolean;
  message: string;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  name: string;
  organizationName: string;
  status: string;
  message: string;
  otpSent: boolean;
}

export interface OTPVerificationResponse {
  userId: string;
  email: string;
  message: string;
  requiresPasswordSetup: boolean;
  sessionToken: string;
}

export interface SetPasswordResponse {
  message: string;
  tokens: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

// 🔐 Auth Service Layer - Pure Amplify Authentication

/**
 * Login con Amplify usando USER_SRP_AUTH
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<User> => {
      try {
        console.log('🔐 Starting login process for:', credentials.email);

        // Step 1: Authenticate with Amplify
        const { isSignedIn, nextStep } = await signIn({
          username: credentials.email,
          password: credentials.password,
        });

        console.log('🔐 SignIn result:', { isSignedIn, nextStep });

        if (!isSignedIn) {
          // Handle different sign-in steps
          if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
            throw new Error('Se requiere establecer una nueva contraseña');
          }
          if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
            throw new Error('Se requiere código TOTP');
          }
          if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
            throw new Error('Se requiere código SMS');
          }
          if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
            throw new Error('Se requiere completar desafío personalizado');
          }

          // Log the actual error for debugging
          console.error('🔐 SignIn failed:', { isSignedIn, nextStep });
          throw new Error('Credenciales inválidas');
        }

        // Step 2: Get the current session
        console.log('🔐 Getting auth session...');
        const session = await fetchAuthSession();

        if (!session.tokens?.accessToken) {
          console.error('🔐 No access token found in session:', session);
          throw new Error('No se pudo obtener la sesión de autenticación');
        }

        // Step 3: Extract user info from token claims
        const claims = session.tokens.accessToken.payload;

        // Log claims for debugging (remove in production)
        console.log('🔍 Cognito Claims:', claims);

        const user: User = {
          id: claims.sub as string || claims['cognito:username'] as string,
          email: claims.email as string || credentials.email,
          name: claims.name as string || claims['cognito:username'] as string || claims.given_name as string || 'Usuario',
          role: (claims['custom:role'] as UserRole) || 'basic_user',
          organizationId: claims['custom:organizationId'] as string || '',
          businessId: claims['custom:businessId'] as string || '',
          branchId: claims['custom:branchId'] as string || '',
          isActive: true,
          phone: claims.phone_number as string || '',
        };

        console.log('🔐 User extracted from claims:', user);

        // Step 4: Optionally sync with backend for additional data
        try {
          console.log('🔐 Syncing with backend...');
          const { data: backendResponse } = await apiClient.post('/auth/login', {
            email: credentials.email,
            password: credentials.password, // This won't be used by backend, just for validation
          });

          if (backendResponse.success) {
            // Merge backend data with Amplify data
            const mergedUser = {
              ...user,
              ...backendResponse.data.user,
            };
            console.log('🔐 Merged user data:', mergedUser);
            return mergedUser;
          }
        } catch (backendError) {
          console.warn('🔐 Backend sync failed, using Amplify data only:', backendError);
        }

        return user;
      } catch (error: unknown) {
        console.error('🔐 Login error:', error);

        const err = error as { name?: string; message?: string };

        // Handle specific Cognito errors
        if (err.name === 'UserNotConfirmedException') {
          throw new Error('Tu cuenta no está verificada. Revisa tu email para confirmar tu cuenta.');
        }
        if (err.name === 'NotAuthorizedException') {
          throw new Error('Email o contraseña incorrectos');
        }
        if (err.name === 'TooManyRequestsException') {
          throw new Error('Demasiados intentos. Intenta más tarde.');
        }
        if (err.name === 'PasswordResetRequiredException') {
          throw new Error('Se requiere restablecer la contraseña');
        }
        if (err.name === 'UserNotFoundException') {
          throw new Error('Usuario no encontrado');
        }
        if (err.name === 'InvalidParameterException') {
          throw new Error('Parámetros inválidos');
        }
        if (err.name === 'ResourceNotFoundException') {
          throw new Error('Recurso no encontrado');
        }

        throw new Error(err.message || 'Error al iniciar sesión');
      }
    },
    onSuccess: (user) => {
      // Update user cache
      queryClient.setQueryData(queryKeys.user(), user);
      toast.success(`¡Bienvenido de vuelta, ${user.name}!`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Registro con invitationToken o nueva organización
 */
export function useRegister() {
  return useMutation({
    mutationFn: async (registerData: RegisterData): Promise<RegisterResponse> => {
      try {
        // Registro con backend (validaciones multi-tenant)
        const { data: backendResponse } = await apiClient.post('/auth/register', {
          businessId: registerData.businessId,
          contactName: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
          invitationToken: registerData.invitationToken,
          companyName: registerData.businessId ? undefined : 'Nueva Organización',
        });

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error en registro');
        }

        return backendResponse.data;
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error en registro');
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Registro exitoso. Revisa tu email para el código de verificación.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Verificación de código OTP
 */
export function useVerifyOTP() {
  return useMutation({
    mutationFn: async (verification: OTPVerification): Promise<OTPVerificationResponse> => {
      try {
        // Verificar OTP con backend
        const { data: backendResponse } = await apiClient.post('/auth/verify-otp', {
          email: verification.email,
          otpCode: verification.code,
        });

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error en verificación OTP');
        }

        return backendResponse.data;
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error en verificación OTP');
      }
    },
    onSuccess: (data) => {
      if (data.requiresPasswordSetup) {
        toast.success('Email verificado. Ahora configura tu contraseña.');
      } else {
        toast.success(data.message || 'Email verificado exitosamente.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Configurar contraseña después de verificación OTP
 */
export function useSetPassword() {
  return useMutation({
    mutationFn: async (data: { email: string; newPassword: string }): Promise<SetPasswordResponse> => {
      try {
        const { data: backendResponse } = await apiClient.post('/auth/set-password', {
          email: data.email,
          newPassword: data.newPassword,
        });

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error al configurar contraseña');
        }

        return backendResponse.data;
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error al configurar contraseña');
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Contraseña configurada exitosamente.');
      // Aquí podrías redirigir al dashboard o hacer login automático
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Reenviar código OTP
 */
export function useResendOTP() {
  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      try {
        // Reenviar con backend
        const { data: backendResponse } = await apiClient.post('/auth/resend-otp', { email });

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error al reenviar código');
        }
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error al reenviar el código');
      }
    },
    onSuccess: () => {
      toast.success('Nuevo código enviado a tu email');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Solicitar recuperación de contraseña
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData): Promise<void> => {
      try {
        const { data: backendResponse } = await apiClient.post('/auth/forgot-password', data);

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error al solicitar recuperación');
        }
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error al solicitar recuperación');
      }
    },
    onSuccess: () => {
      toast.success('Si el email existe, recibirás un código de recuperación');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Resetear contraseña con código
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordData): Promise<void> => {
      try {
        const { data: backendResponse } = await apiClient.post('/auth/reset-password', data);

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error al resetear contraseña');
        }
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error al resetear contraseña');
      }
    },
    onSuccess: () => {
      toast.success('Contraseña actualizada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Invitar usuario a la organización
 */
export function useInviteUser() {
  return useMutation({
    mutationFn: async (inviteData: InviteUserData): Promise<{ invitationToken: string; invitationUrl: string }> => {
      try {
        const { data: backendResponse } = await apiClient.post('/auth/invite-user', inviteData);

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error al invitar usuario');
        }

        return backendResponse.data;
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        throw new Error(err.message || 'Error al invitar usuario');
      }
    },
    onSuccess: (data) => {
      toast.success(`Usuario invitado exitosamente. URL: ${data.invitationUrl}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Validar businessID para registro
 */
export function useValidateBusinessId() {
  return useMutation({
    mutationFn: async (businessId: string): Promise<ValidateBusinessIdResponse> => {
      try {
        // Usar fetch directo para endpoint público (sin autenticación)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-business-id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ businessId }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Business ID no encontrado');
          }
          throw new Error('Business ID no válido');
        }

        const data = await response.json();

        if (!data.success || !data.data.isValid) {
          throw new Error('Business ID no válido');
        }

        return {
          organization: data.data.organization,
          selectedBranch: data.data.selectedBranch,
          accessType: data.data.accessType,
          isValid: data.data.isValid,
          message: data.data.message,
        };
      } catch (error: unknown) {
        const err = error as Error;
        throw new Error(err.message || 'Error de conexión. Verifica tu Business ID.');
      }
    },
    retry: 0, // No reintentar validaciones de business ID
    onError: (error: Error) => {
      console.warn('Business ID validation error:', error.message);
      // No mostrar toast automáticamente para evitar spam
    },
  });
}
