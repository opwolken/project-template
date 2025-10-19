'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';

/**
 * Hook for protecting routes that require authentication and authorization
 * Redirects to home if not authenticated, or to /unauthorized if not authorized
 */
export function useProtectedRoute() {
  const { user, isAuthorized, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        router.push('/');
      } else if (!isAuthorized) {
        router.push('/unauthorized');
      } else {
        setIsReady(true);
      }
    }
  }, [user, isAuthorized, loading, router, mounted]);

  return {
    isReady,
    loading: loading || !mounted,
    user,
    isAuthorized,
  };
}
