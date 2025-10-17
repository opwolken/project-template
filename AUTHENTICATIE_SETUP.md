# Authenticatie Setup Instructies

## 🔐 Google Login Configuratie

Je website heeft nu een volledig werkende login module met Google authenticatie! Hier is hoe je het instelt:

## Stap 1: Firebase Authentication Inschakelen

1. Ga naar de [Firebase Console](https://console.firebase.google.com)
2. Selecteer je project
3. Ga naar **Authentication** in het linkermenu
4. Klik op **Get Started** (als je het nog niet hebt ingeschakeld)
5. Ga naar het tabblad **Sign-in method**
6. Klik op **Google** in de lijst
7. Schakel de toggle **Enable** in
8. Kies een public-facing name voor je project
9. Selecteer een support email (je eigen email)
10. Klik op **Save**

## Stap 2: Gebruikers Autoriseren

### Optie A: Via de Admin Pagina (Aanbevolen)

1. Log eerst in met je eigen Google account op je website
2. Ga naar `/admin` in je browser (bijv. `http://localhost:3000/admin`)
3. Voeg je eigen email toe aan de lijst met geautoriseerde gebruikers
4. Nu heb je toegang tot alle beveiligde pagina's!
5. Voeg andere gebruikers toe door hun email adressen in te voeren

### Optie B: Handmatig via Firebase Console

1. Ga naar **Firestore Database** in de Firebase Console
2. Klik op **Start collection**
3. Collection ID: `authorized_users`
4. Document ID: gebruik het email adres (bijv. `daan@opwolken.com`)
5. Voeg een field toe:
   - Field: `approved`
   - Type: `boolean`
   - Value: `true`
6. Voeg nog een field toe (optioneel):
   - Field: `addedAt`
   - Type: `string`
   - Value: huidige datum (bijv. `2025-10-17`)
7. Klik op **Save**

## 📄 Pagina's in je Applicatie

### Openbare Pagina's (geen login vereist):
- **/** - Home pagina met demo functionaliteit

### Beveiligde Pagina's (login + autorisatie vereist):
- **/dashboard** - Hoofddashboard voor geautoriseerde gebruikers
- **/admin** - Beheer pagina voor gebruikersautorisatie

### Systeem Pagina's:
- **/unauthorized** - Wordt getoond als je wel bent ingelogd maar niet geautoriseerd

## 🔧 Hoe het Werkt

### Authenticatie Flow:
1. Gebruiker klikt op "Inloggen met Google"
2. Google login popup verschijnt
3. Gebruiker logt in met hun Google account
4. De app controleert of hun email in de `authorized_users` collectie staat
5. Als `approved: true`, krijgt de gebruiker toegang tot beveiligde pagina's
6. Anders wordt een "niet geautoriseerd" melding getoond

### Firestore Structuur:
```
authorized_users (collection)
  ├─ user1@example.com (document)
  │   ├─ approved: true
  │   └─ addedAt: "2025-10-17"
  │
  ├─ user2@example.com (document)
  │   ├─ approved: true
  │   └─ addedAt: "2025-10-17"
```

## 🚀 Testen

1. Start je development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open `http://localhost:3000`

3. Klik op "Inloggen met Google"

4. Als het de eerste keer is:
   - Log in met je Google account
   - Je ziet een melding dat je niet geautoriseerd bent
   - Ga naar Firebase Console en voeg je email toe (zie Stap 2, Optie B)
   - Of als je al bent ingelogd, ga direct naar `/admin` en voeg jezelf toe

5. Refresh de pagina - je hebt nu toegang!

## 🔒 Security Rules

Vergeet niet om Firestore Security Rules in te stellen! Ga naar **Firestore Database > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Alleen authenticated users kunnen hun eigen autorisatie status lezen
    match /authorized_users/{email} {
      allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if false; // Gebruik de admin pagina of console om users toe te voegen
    }
    
    // Andere collections...
    match /items/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 📱 Nieuwe Beveiligde Pagina's Maken

Om een nieuwe beveiligde pagina toe te voegen, kopieer het patroon van `/app/dashboard/page.tsx`:

```tsx
'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MijnBeveiligdePagina() {
  const { user, isAuthorized, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        router.push('/');
      } else if (!isAuthorized) {
        router.push('/unauthorized');
      }
    }
  }, [user, isAuthorized, loading, router, mounted]);

  if (loading || !mounted || !user || !isAuthorized) {
    return null; // Of een loading spinner
  }

  return (
    <div>
      {/* Je beveiligde content hier */}
    </div>
  );
}
```

## 🎯 Tips

- **Testing**: Gebruik verschillende Google accounts om te testen
- **Admin toegang**: Zorg dat je als eerste jezelf toevoegt aan de authorized_users
- **Productie**: Zet de juiste Firebase config environment variables in je hosting platform
- **Security**: Gebruik Firestore Rules om je database te beschermen
- **Backup**: Houd een lijst bij van geautoriseerde emails buiten Firebase

## ❓ Troubleshooting

### "Popup geblokkeerd door browser"
- Zorg dat popup blocker uit staat voor je domain
- Probeer in incognito mode

### "Niet geautoriseerd" na login
- Check of je email exact overeenkomt in Firestore (hoofdlettergevoelig!)
- Check of het `approved` field op `true` staat
- Check de browser console voor errors

### Authentication werkt niet lokaal
- Check of je `.env.local` file correct is ingesteld
- Voeg `http://localhost:3000` toe aan Authorized domains in Firebase Console (Authentication > Settings > Authorized domains)

Succes! 🎉
