'use client';

import { useState, useCallback } from 'react';
import { useToast } from '../ToastContext';

interface AsyncActionOptions {
  successMessage?: string;
  successDescription?: string;
  errorMessage?: string;
  errorDescription?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Hook for handling async actions with loading state and toast notifications
 * Reduces boilerplate for common async patterns
 */
export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const execute = useCallback(
    async <T,>(
      action: () => Promise<T>,
      options: AsyncActionOptions = {}
    ): Promise<T | undefined> => {
      setLoading(true);
      
      try {
        const result = await action();
        
        if (options.successMessage) {
          success(options.successMessage, options.successDescription);
        }
        
        if (options.onSuccess) {
          options.onSuccess();
        }
        
        return result;
      } catch (err) {
        console.error('Async action error:', err);
        
        const errorMsg = options.errorMessage || 'Er is iets misgegaan';
        const errorDesc = options.errorDescription || 'Probeer het later opnieuw';
        error(errorMsg, errorDesc);
        
        if (options.onError) {
          options.onError(err);
        }
        
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [success, error]
  );

  return { execute, loading };
}
