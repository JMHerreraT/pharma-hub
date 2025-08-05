'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options
        className: '',
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Success
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
          },
        },

        // Error
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
          },
        },

        // Loading
        loading: {
          style: {
            background: '#3b82f6',
          },
        },
      }}
    />
  );
}
