import { signIn, signUp, confirmSignUp, resetPassword, confirmResetPassword, resendSignUpCode } from 'aws-amplify/auth';
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
  User
} from '@/types/auth';

// 🔐 Auth Service Layer - Conecta con el backend pharma-hub-cdk

/**
 * Login con Cognito + validación backend
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<User> => {
      try {
        // 1. Login con Cognito
        const { isSignedIn } = await signIn({
          username: credentials.email,
          password: credentials.password,
        });

        if (!isSignedIn) {
          throw new Error('Credenciales inválidas');
        }

        // 2. Validar con backend y obtener datos de usuario
        const { data } = await apiClient.post('/auth/login', credentials);

        if (!data.success) {
          throw new Error(data.error || 'Error en login');
        }

        return data.data.user;
      } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        // Manejo específico de errores de Cognito
        if (err.name === 'UserNotConfirmedException') {
          throw new Error('Tu cuenta no está verificada. Revisa tu email.');
        }
        if (err.name === 'NotAuthorizedException') {
          throw new Error('Email o contraseña incorrectos');
        }
        if (err.name === 'TooManyRequestsException') {
          throw new Error('Demasiados intentos. Intenta más tarde.');
        }

        throw new Error(err.message || 'Error al iniciar sesión');
      }
    },
    onSuccess: (user) => {
      // Actualizar cache de usuario
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registerData: RegisterData): Promise<{ requiresVerification: boolean; user?: User }> => {
      try {
        // 1. Registro con backend (validaciones multi-tenant)
        const { data: backendResponse } = await apiClient.post('/auth/register', {
          businessId: registerData.businessId,
          contactName: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone,
          invitationToken: registerData.invitationToken,
          companyName: registerData.businessId ? undefined : 'Nueva Organización', // Si no hay businessId, crear nueva org
        });

        if (!backendResponse.success) {
          throw new Error(backendResponse.error || 'Error en registro');
        }

        // 2. Registro en Cognito con atributos personalizados
        const { nextStep } = await signUp({
          username: registerData.email,
          password: registerData.password,
          options: {
            userAttributes: {
              email: registerData.email,
              name: registerData.name,
              phone_number: registerData.phone || '',
              'custom:role': backendResponse.data.role || 'assistant',
              'custom:organizationId': backendResponse.data.organizationId,
              'custom:businessId': registerData.businessId,
              'custom:branchId': backendResponse.data.branchId || '',
            },
          },
        });

        // Si requiere verificación OTP
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          return { requiresVerification: true };
        }

        // Si no requiere verificación (auto-confirmado)
        return {
          requiresVerification: false,
          user: backendResponse.data.user
        };

            } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        // Manejo específico de errores
        if (err.name === 'UsernameExistsException') {
          throw new Error('Este email ya está registrado');
        }
        if (err.name === 'InvalidPasswordException') {
          throw new Error('La contraseña no cumple con los requisitos de seguridad');
        }

        throw new Error(err.message || 'Error al crear la cuenta');
      }
    },
    onSuccess: (result) => {
      if (result.requiresVerification) {
        toast.success('¡Cuenta creada! Revisa tu email para el código de verificación.');
      } else {
        toast.success('¡Cuenta creada y verificada exitosamente!');
        if (result.user) {
          queryClient.setQueryData(queryKeys.user(), result.user);
        }
      }
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (verification: OTPVerification): Promise<User> => {
      try {
        // 1. Confirmar con Cognito
        const { isSignUpComplete } = await confirmSignUp({
          username: verification.email,
          confirmationCode: verification.code,
        });

        if (!isSignUpComplete) {
          throw new Error('Código de verificación inválido');
        }

        // 2. Notificar al backend y obtener datos de usuario
        const { data } = await apiClient.post('/auth/verify-otp', verification);

        if (!data.success) {
          throw new Error(data.error || 'Error en verificación');
        }

        return data.data.user;
            } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        if (err.name === 'CodeMismatchException') {
          throw new Error('Código de verificación incorrecto');
        }
        if (err.name === 'ExpiredCodeException') {
          throw new Error('El código ha expirado. Solicita uno nuevo.');
        }

        throw new Error(err.message || 'Error al verificar el código');
      }
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.user(), user);
      toast.success('¡Email verificado exitosamente! Cuenta activada.');
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
        // 1. Reenviar con Cognito
        await resendSignUpCode({ username: email });

        // 2. Notificar al backend para rate limiting
        await apiClient.post('/auth/resend-otp', { email });
            } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        if (err.name === 'TooManyRequestsException') {
          throw new Error('Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.');
        }

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
        // 1. Solicitar reset con Cognito
        await resetPassword({ username: data.email });

        // 2. Notificar al backend para logs de auditoría
        await apiClient.post('/auth/forgot-password', data);
      } catch (error: unknown) {
        // Cognito siempre retorna success para evitar enumeration attacks
        // El backend maneja el rate limiting
        console.warn('Reset password error:', error);
      }
    },
    onSuccess: () => {
      toast.success('Si el email existe, recibirás un código de recuperación');
    },
    onError: () => {
      toast.success('Si el email existe, recibirás un código de recuperación');
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
        // 1. Confirmar reset con Cognito
        await confirmResetPassword({
          username: data.email,
          confirmationCode: data.code,
          newPassword: data.newPassword,
        });

        // 2. Notificar al backend para logs de auditoría
        await apiClient.post('/auth/reset-password', {
          email: data.email,
          resetToken: data.code,
          newPassword: data.newPassword,
        });
            } catch (error: unknown) {
        const err = error as { name?: string; message?: string };
        if (err.name === 'CodeMismatchException') {
          throw new Error('Código de recuperación incorrecto');
        }
        if (err.name === 'ExpiredCodeException') {
          throw new Error('El código ha expirado. Solicita uno nuevo.');
        }
        if (err.name === 'InvalidPasswordException') {
          throw new Error('La nueva contraseña no cumple con los requisitos de seguridad');
        }

        throw new Error(err.message || 'Error al cambiar la contraseña');
      }
    },
    onSuccess: () => {
      toast.success('Contraseña cambiada exitosamente. Ya puedes iniciar sesión.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Invitar usuario (Solo admins)
 */
export function useInviteUser() {
  return useMutation({
    mutationFn: async (inviteData: InviteUserData): Promise<{ invitationUrl: string; invitationToken: string }> => {
      try {
        const { data } = await apiClient.post('/auth/invite-user', inviteData);

        if (!data.success) {
          throw new Error(data.error || 'Error al enviar invitación');
        }

        return {
          invitationUrl: data.data.invitationUrl,
          invitationToken: data.data.invitationToken,
        };
      } catch (error: unknown) {
        const err = error as { message?: string };
        throw new Error(err.message || 'Error al invitar usuario');
      }
    },
    onSuccess: () => {
      toast.success('Invitación enviada exitosamente');
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
    mutationFn: async (businessId: string): Promise<{ organizationName: string; isValid: boolean }> => {
      try {
        const { data } = await apiClient.get(`/auth/validate-business-id/${businessId}`);

        if (!data.success) {
          throw new Error('Business ID no válido');
        }

        return {
          organizationName: data.data.organizationName,
          isValid: true,
        };
      } catch {
        throw new Error('Business ID no encontrado o inválido');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
