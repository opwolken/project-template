"""
Seed Firestore with recipe taxonomies
Run with: python -m api.scripts.seed_taxonomies
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
        # Try to use Application Default Credentials first
        try:
            firebase_admin.initialize_app()
            print("✓ Initialized with Application Default Credentials")
        except Exception as e:
            print(f"✗ Could not initialize with default credentials: {e}")
            print("  Make sure you're authenticated with: gcloud auth application-default login")
            sys.exit(1)

def seed_taxonomies():
    """Add all recipe taxonomies to Firestore"""
    db = firestore.client()
    
    taxonomies = {
        'keukens': {
            'name': 'Keukens',
            'description': 'Verschillende keuken types',
            'items': [
                'Amerikaans',
                'Chinees',
                'Frans',
                'Grieks',
                'Indonesisch',
                'Italiaans',
                'Marokkaans',
                'Mediterraans',
                'Mexicaans',
                'Nederlands',
                'Overig',
                'Spaans',
            ]
        },
        'gerechtsoorten': {
            'name': 'Gang',
            'description': 'Type gang in het menu',
            'items': [
                'Amuse',
                'Bijgerecht',
                'Dessert',
                'Gebak',
                'Hoofdgerecht',
                'Salade',
                'Soep',
                'Tussendoor',
                'Voorgerechtd',
            ]
        },
        'types': {
            'name': 'Type Gerecht',
            'description': 'Type hoofdingrediënt',
            'items': [
                'Brood',
                'Burger',
                'Glutenvrij',
                'Kip',
                'Koekjes',
                'Pasta',
                'Salade',
                'Schaaldier',
                'Tussendoor',
                'Vegetarisch',
                'Vis',
                'Vlees',
            ]
        },
        'bases': {
            'name': 'Gerechtsbasis',
            'description': 'Basis ingrediënt van het gerecht',
            'items': [
                'Aardappelen',
                'Bladerdeeg',
                'Brood',
                'Dumplings',
                'gnocchi',
                'Pasta',
                'Pita',
                'Pizzadeeg',
                'Rijst',
                'Saus',
                "Taco's",
                'Vegetarisch',
                'Vlees',
            ]
        },
        'chefs': {
            'name': 'Chef',
            'description': 'Wie heeft het recept gemaakt',
            'items': [
                'Bianca',
                'Daan',
                'Emée',
                'Jill',
                'Lisanne',
                'Mariëtte',
                'Nienke',
                'Rene',
                'Traditioneel',
            ]
        }
    }
    
    print("🌱 Seeding taxonomies...")
    
    for taxonomy_id, taxonomy_data in taxonomies.items():
        try:
            doc_ref = db.collection('taxonomies').document(taxonomy_id)
            doc_ref.set(taxonomy_data)
            print(f"  ✓ Added {taxonomy_id}: {len(taxonomy_data['items'])} items")
        except Exception as e:
            print(f"  ✗ Error adding {taxonomy_id}: {e}")
    
    print("✅ Taxonomies seeded successfully!")

def seed_sample_recipe():
    """Add a sample recipe for testing"""
    db = firestore.client()
    
    sample_recipe = {
        'recept_naam': 'Gyros Kip',
        'recept_foto': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
        'recept_samenvatting': 'Makkelijke pita met kip',
        'recept_keuken': ['Grieks'],
        'recept_gerechtsoort': ['Hoofdgerecht'],
        'recept_type': ['Kip'],
        'recept_basis': ['Pita'],
        'recept_auteur': 'Daan',
        'recept_bereidingstijd': 30,
        'recept_aantal_personen': 2,
        'recept_ingredientenlijst': [
            '350 gram kippendij',
            '1 bosui',
            '1 paprika',
            '2 teentjes knoflook',
            '1 ui',
            '1 tl paprikapoeder',
            '1 tl komijn',
            ',5 Komkommer',
            '100 gram feta',
            '150 ml Griekse yoghurt',
            '6 pitabroodjes'
        ],
        'recept_bereidingswijzelijst': [
            'Snij de ui, knoflook en bosui',
            'Doe olie in de pan en bak de kippendij op hoog vuur een beetje bruin',
            'Bak de pita af in de oven',
            'Voeg de ui, bosui en knoflook toe',
            'Voeg de kruiden toe met ook peper en zout',
            'Voeg de paprika toe',
            'Maak ondertussen de tzatziki door de komkommer te raspen en te mengen met een extra teentje knoflook, de yoghurt en de feta'
        ],
        'status': 'published',
        'created_at': firestore.SERVER_TIMESTAMP,
        'updated_at': firestore.SERVER_TIMESTAMP,
        'created_by': 'seed_script'
    }
    
    print("\n🍽️  Adding sample recipe...")
    
    try:
        doc_ref = db.collection('recepten').add(sample_recipe)
        print(f"  ✓ Added sample recipe: {sample_recipe['recept_naam']} (ID: {doc_ref[1].id})")
        print("✅ Sample recipe added successfully!")
    except Exception as e:
        print(f"  ✗ Error adding sample recipe: {e}")

def main():
    print("=" * 50)
    print("Recipe Taxonomy Seeder")
    print("=" * 50)
    print()
    
    initialize_firebase()
    seed_taxonomies()
    seed_sample_recipe()
    
    print()
    print("🎉 All done! You can now:")
    print("  1. View taxonomies in Firestore Console")
    print("  2. View sample recipe in recepten collection")
    print("  3. Start building the frontend!")
    print()

if __name__ == '__main__':
    main()
