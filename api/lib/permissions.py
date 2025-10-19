"""
Permission system for multi-app architecture
"""
from typing import Dict, Optional
from firebase_admin import firestore


class PermissionChecker:
    """Check user permissions across different apps"""
    
    def __init__(self):
        self.db = firestore.client()
    
    def get_user_permissions(self, email: str) -> Optional[Dict]:
        """
        Get user permissions from Firestore
        
        Args:
            email: User email address
            
        Returns:
            User permissions dict or None if not found
        """
        try:
            doc = self.db.collection('authorized_users').document(email).get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            print(f"Error fetching permissions for {email}: {e}")
            return None
    
    def is_superadmin(self, email: str) -> bool:
        """Check if user is superadmin"""
        perms = self.get_user_permissions(email)
        if not perms:
            return False
        return perms.get('role') == 'superadmin' or perms.get('admin', False)
    
    def can_access_app(self, email: str, app: str) -> bool:
        """
        Check if user can access specific app
        
        Args:
            email: User email
            app: App name (e.g., 'recipes', 'invoices', 'dashboard')
            
        Returns:
            True if user has read access
        """
        perms = self.get_user_permissions(email)
        if not perms:
            return False
        
        # Superadmin can access everything
        if self.is_superadmin(email):
            return True
        
        # Check specific app permissions
        app_perms = perms.get('permissions', {}).get(app, {})
        return app_perms.get('read', False)
    
    def can_write(self, email: str, app: str) -> bool:
        """Check if user can write to specific app"""
        perms = self.get_user_permissions(email)
        if not perms:
            return False
        
        if self.is_superadmin(email):
            return True
        
        app_perms = perms.get('permissions', {}).get(app, {})
        return app_perms.get('write', False)
    
    def can_delete(self, email: str, app: str) -> bool:
        """Check if user can delete from specific app"""
        perms = self.get_user_permissions(email)
        if not perms:
            return False
        
        if self.is_superadmin(email):
            return True
        
        app_perms = perms.get('permissions', {}).get(app, {})
        return app_perms.get('delete', False)


# Convenience functions
permission_checker = PermissionChecker()

def check_recipe_access(email: str) -> bool:
    """Check if user can access recipes"""
    return permission_checker.can_access_app(email, 'recipes')

def check_recipe_write(email: str) -> bool:
    """Check if user can write recipes"""
    return permission_checker.can_write(email, 'recipes')

def check_recipe_delete(email: str) -> bool:
    """Check if user can delete recipes"""
    return permission_checker.can_delete(email, 'recipes')
