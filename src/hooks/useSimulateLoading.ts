import { useState, useEffect } from 'react'

interface UseSimulateLoadingOptions {
  delay?: number
  enabled?: boolean
}

/**
 * Hook to simulate loading states for development/testing
 * This will be replaced by actual API calls in production
 */
export const useSimulateLoading = ({
  delay = 2000,
  enabled = true
}: UseSimulateLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(enabled)

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, enabled])

  return { isLoading }
}

/**
 * Utility function to create a delayed promise for simulating API calls
 */
export const simulateAPICall = <T>(data: T, delay: number = 1500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}
