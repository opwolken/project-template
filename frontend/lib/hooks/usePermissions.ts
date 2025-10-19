import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AppPermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
}

interface UserPermissions {
  role?: 'superadmin' | 'recipe_editor' | 'accountant' | string;
  admin?: boolean; // Backwards compatibility
  permissions?: {
    recipes?: AppPermissions;
    invoices?: AppPermissions;
    dashboard?: boolean;
  };
}

interface UsePermissionsReturn {
  permissions: UserPermissions | null;
  loading: boolean;
  
  // Recipe permissions
  canReadRecipes: boolean;
  canWriteRecipes: boolean;
  canDeleteRecipes: boolean;
  
  // Invoice permissions (future)
  canReadInvoices: boolean;
  canWriteInvoices: boolean;
  canDeleteInvoices: boolean;
  
  // Dashboard access
  canAccessDashboard: boolean;
  
  // Role checks
  isSuperAdmin: boolean;
  isRecipeEditor: boolean;
  isAccountant: boolean;
}

/**
 * Hook to check user permissions across different apps
 * 
 * @example
 * const { canWriteRecipes, isSuperAdmin } = usePermissions();
 * if (canWriteRecipes) {
 *   // Show edit button
 * }
 */
export function usePermissions(): UsePermissionsReturn {
  const { user, isAuthorized } = useAuth();
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPermissions() {
      if (!user?.email) {
        setPermissions(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'authorized_users', user.email));
        
        if (userDoc.exists()) {
          const data = userDoc.data() as UserPermissions;
          setPermissions(data);
        } else {
          setPermissions(null);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setPermissions(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPermissions();
  }, [user]);

  // Helper function to check if user is superadmin
  const isSuperAdmin = permissions?.role === 'superadmin' || 
                        permissions?.admin === true;

  // Helper function to check app permissions
  const checkAppPermission = (app: 'recipes' | 'invoices', action: 'read' | 'write' | 'delete'): boolean => {
    if (!permissions) return false;
    if (isSuperAdmin) return true;
    
    const appPerms = permissions.permissions?.[app];
    if (!appPerms) return false;
    
    return appPerms[action] ?? false;
  };

  return {
    permissions,
    loading,
    
    // Recipe permissions
    canReadRecipes: isSuperAdmin || checkAppPermission('recipes', 'read'),
    canWriteRecipes: isSuperAdmin || checkAppPermission('recipes', 'write'),
    canDeleteRecipes: isSuperAdmin || checkAppPermission('recipes', 'delete'),
    
    // Invoice permissions (future)
    canReadInvoices: isSuperAdmin || checkAppPermission('invoices', 'read'),
    canWriteInvoices: isSuperAdmin || checkAppPermission('invoices', 'write'),
    canDeleteInvoices: isSuperAdmin || checkAppPermission('invoices', 'delete'),
    
    // Dashboard access
    canAccessDashboard: isSuperAdmin || permissions?.permissions?.dashboard === true,
    
    // Role checks
    isSuperAdmin,
    isRecipeEditor: permissions?.role === 'recipe_editor',
    isAccountant: permissions?.role === 'accountant',
  };
}
