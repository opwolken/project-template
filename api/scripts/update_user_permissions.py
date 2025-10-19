"""
Update user permissions to superadmin with granular permissions

Usage:
  python -m api.scripts.update_user_permissions your.email@example.com
"""
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    if not firebase_admin._apps:
        try:
            firebase_admin.initialize_app()
            print("✓ Initialized with Application Default Credentials")
        except Exception as e:
            print(f"✗ Could not initialize: {e}")
            sys.exit(1)

def update_user_to_superadmin(email: str):
    """Update user to superadmin with full permissions"""
    db = firestore.client()
    
    user_data = {
        'admin': True,  # Backwards compatibility
        'approved': True,
        'role': 'superadmin',
        'permissions': {
            'recipes': {
                'read': True,
                'write': True,
                'delete': True
            },
            'invoices': {
                'read': True,
                'write': True,
                'delete': True
            },
            'dashboard': True
        }
    }
    
    print(f"🔐 Updating {email} to superadmin...")
    
    try:
        doc_ref = db.collection('authorized_users').document(email)
        doc_ref.set(user_data, merge=True)
        print(f"  ✓ Updated {email} to superadmin")
        print("\n📋 Permissions granted:")
        print("  - Role: superadmin")
        print("  - Recipes: read, write, delete")
        print("  - Invoices: read, write, delete")
        print("  - Dashboard: access")
        print("\n✅ User updated successfully!")
    except Exception as e:
        print(f"  ✗ Error updating user: {e}")
        sys.exit(1)

def create_recipe_editor(email: str):
    """Create a recipe editor user (can only edit recipes)"""
    db = firestore.client()
    
    user_data = {
        'admin': False,
        'approved': True,
        'role': 'recipe_editor',
        'permissions': {
            'recipes': {
                'read': True,
                'write': True,
                'delete': False
            },
            'invoices': {
                'read': False,
                'write': False,
                'delete': False
            },
            'dashboard': False
        }
    }
    
    print(f"👨‍🍳 Creating recipe editor: {email}...")
    
    try:
        doc_ref = db.collection('authorized_users').document(email)
        doc_ref.set(user_data, merge=True)
        print(f"  ✓ Created recipe editor: {email}")
        print("\n📋 Permissions granted:")
        print("  - Role: recipe_editor")
        print("  - Recipes: read, write (no delete)")
        print("  - Invoices: no access")
        print("  - Dashboard: no access")
        print("\n✅ Recipe editor created successfully!")
    except Exception as e:
        print(f"  ✗ Error creating recipe editor: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python -m api.scripts.update_user_permissions EMAIL [--recipe-editor]")
        print("\nExamples:")
        print("  python -m api.scripts.update_user_permissions daan@opwolken.com")
        print("  python -m api.scripts.update_user_permissions editor@example.com --recipe-editor")
        sys.exit(1)
    
    email = sys.argv[1]
    is_recipe_editor = '--recipe-editor' in sys.argv
    
    print("=" * 60)
    print("User Permission Updater")
    print("=" * 60)
    print()
    
    initialize_firebase()
    
    if is_recipe_editor:
        create_recipe_editor(email)
    else:
        update_user_to_superadmin(email)
    
    print()

if __name__ == '__main__':
    main()
