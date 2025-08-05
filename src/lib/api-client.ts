import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include Amplify tokens
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      if (session.tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${session.tokens.accessToken.toString()}`;
      }

      // Log en desarrollo
      if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
        console.log(`🚀 API Call: ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data,
        });
      }
    } catch (error) {
      console.warn('Failed to get auth session:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => {
    // Log exitoso en desarrollo
    if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
      console.log(`✅ API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const { response, config } = error;

    // Log error en desarrollo
    if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
      console.error(`❌ API Error: ${config?.method?.toUpperCase()} ${config?.url}`, {
        status: response?.status,
        data: response?.data,
      });
    }

    if (response?.status === 401) {
      // Token expirado - redirect a login
      toast.error('Sesión expirada. Redirigiendo al login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 1500);
      return Promise.reject(error);
    }

    if (response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción');
    }

    if (response?.status >= 500) {
      toast.error('Error del servidor. Intenta nuevamente.');
    }

    // Mejorar mensajes de error
    const errorMessage = response?.data?.error ||
                        response?.data?.message ||
                        error.message ||
                        'Error desconocido';

    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default apiClient;
