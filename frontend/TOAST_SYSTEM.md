# 🎉 Toast Notificatie Systeem

## Overzicht

Een modern, elegant toast notificatie systeem dat perfect geïntegreerd is met het design systeem. Toasts verschijnen rechtsboven in het scherm en verdwijnen automatisch.

## ✨ Features

- ✅ **4 Varianten**: Success, Error, Warning, Info
- ✅ **Auto-dismiss**: Verdwijnt automatisch na 5-7 seconden
- ✅ **Handmatig sluiten**: Met een × button
- ✅ **Smooth animaties**: Slide-in van rechts
- ✅ **Stack support**: Meerdere toasts tegelijk
- ✅ **Type-safe**: Volledige TypeScript ondersteuning
- ✅ **Context API**: Gebruik overal in je app

## 🚀 Gebruik

### Basis Gebruik

```tsx
'use client';

import { useToast } from '@/lib/ToastContext';

export default function MyComponent() {
  const { success, error, warning, info } = useToast();

  const handleClick = () => {
    success('Gelukt!', 'De actie is succesvol uitgevoerd');
  };

  return (
    <button onClick={handleClick}>
      Klik mij
    </button>
  );
}
```

### Toast Varianten

#### Success
```tsx
success('Succesvol opgeslagen', 'Je wijzigingen zijn opgeslagen');
// Verdwijnt na 5 seconden (default)
```

#### Error
```tsx
error('Fout opgetreden', 'Er is iets misgegaan bij het opslaan');
// Verdwijnt na 7 seconden (langer voor errors)
```

#### Warning
```tsx
warning('Let op!', 'Dit kan niet ongedaan gemaakt worden');
// Verdwijnt na 6 seconden
```

#### Info
```tsx
info('Nieuwe update', 'Er is een nieuwe versie beschikbaar');
// Verdwijnt na 5 seconden
```

### Geavanceerd Gebruik

#### Custom Duration
```tsx
const { showToast } = useToast();

// Toast die 10 seconden blijft staan
showToast('success', 'Titel', 'Bericht', 10000);

// Toast die nooit verdwijnt (duration: 0)
showToast('error', 'Kritieke fout', 'Neem contact op', 0);
```

#### Alleen Titel
```tsx
success('Opgeslagen!'); // Zonder bericht
```

#### Handmatig Verwijderen
```tsx
const { removeToast } = useToast();

removeToast('toast-id'); // Als je het ID hebt
```

## 📍 Waar Gebruikt

### Login/Logout
```tsx
// LoginButton.tsx
const handleSignIn = async () => {
  try {
    await signInWithGoogle();
    success('Succesvol ingelogd', 'Welkom terug!');
  } catch (err) {
    error('Inloggen mislukt', 'Er is iets misgegaan');
  }
};
```

### Admin Acties
```tsx
// Admin page
const addUser = async () => {
  try {
    await addUserToDatabase(email);
    success('Gebruiker toegevoegd', `${email} heeft nu toegang`);
  } catch (err) {
    error('Fout bij toevoegen', 'Kon gebruiker niet toevoegen');
  }
};
```

### API Calls
```tsx
// Home page
const handleHello = async () => {
  try {
    const data = await fetchAPI();
    success('API Call Success', 'Hello endpoint bereikt!');
  } catch (err) {
    error('API Error', 'Er is iets misgegaan');
  }
};
```

### Form Validatie
```tsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!email.includes('@')) {
    warning('Ongeldig e-mailadres', 'Voer een geldig e-mailadres in');
    return;
  }
  
  // Submit form...
};
```

## 🎨 Styling

Toasts gebruiken het design systeem en hebben per variant specifieke kleuren:

### Success (Groen)
- Background: Wit
- Border: `green-200`
- Icon background: `green-100`
- Icon & title: `green-600/900`

### Error (Rood)
- Background: Wit
- Border: `red-200`
- Icon background: `red-100`
- Icon & title: `red-600/900`

### Warning (Oranje)
- Background: Wit
- Border: `orange-200`
- Icon background: `orange-100`
- Icon & title: `orange-600/900`

### Info (Blauw)
- Background: Wit
- Border: `blue-200`
- Icon background: `blue-100`
- Icon & title: `blue-600/900`

## 📱 Responsive

- **Desktop**: Rechts boven, max-width 384px
- **Mobile**: Aangepast aan scherm breedte
- **Stack**: Meerdere toasts verticaal gestapeld

## ♿ Accessibility

- `aria-live="polite"` - Screen readers kondigen toasts aan
- `aria-atomic="true"` - Hele toast wordt voorgelezen
- Handmatig sluitbaar met keyboard (focus op × button)
- Goede kleurcontrasten

## 🔧 Implementatie Details

### Context Provider
```tsx
// app/layout.tsx
<ToastProvider>
  <AuthProvider>
    {/* App content */}
  </AuthProvider>
</ToastProvider>
```

### Toast Container
Automatisch gerenderd in de layout:
```tsx
<ToastContainer />
```

### Type Definitie
```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
```

## 💡 Best Practices

### ✅ Do's
- Gebruik korte, duidelijke titels
- Voeg context toe in het message veld
- Gebruik success voor positieve feedback
- Gebruik error voor belangrijke fouten
- Gebruik warning voor waarschuwingen die aandacht vragen
- Gebruik info voor algemene updates

### ❌ Don'ts
- Geen lange berichten (max 2-3 regels)
- Niet te veel toasts tegelijk (max 3-4)
- Geen kritieke informatie (gebruik modal)
- Geen vereiste user input (gebruik dialog)

## 🎯 Voorbeelden per Use Case

### CRUD Operaties
```tsx
// Create
success('Item aangemaakt', 'Je nieuwe item is toegevoegd');

// Update
success('Wijzigingen opgeslagen', 'Je aanpassingen zijn bewaard');

// Delete
success('Item verwijderd', 'Het item is permanent verwijderd');

// Error
error('Kon niet opslaan', 'Controleer je internetverbinding');
```

### Formulieren
```tsx
// Validatie
warning('Vul alle velden in', 'Sommige verplichte velden zijn leeg');

// Success
success('Formulier verzonden', 'We nemen contact met je op');

// Error
error('Verzenden mislukt', 'Probeer het later opnieuw');
```

### Authenticatie
```tsx
// Login success
success('Welkom terug!', 'Je bent succesvol ingelogd');

// Login error
error('Inloggen mislukt', 'Controleer je inloggegevens');

// Logout
info('Uitgelogd', 'Je bent succesvol uitgelogd');

// Unauthorized
warning('Geen toegang', 'Je hebt geen rechten voor deze pagina');
```

### Data Laden
```tsx
// Loading start
info('Laden...', 'Je data wordt opgehaald');

// Success
success('Data geladen', 'Alle gegevens zijn opgehaald');

// Error
error('Laden mislukt', 'Kon data niet ophalen');
```

## 🚀 Uitbreidingen

Mogelijke toekomstige features:

1. **Progress bar** - Visuele timer
2. **Action buttons** - Inline acties in toast
3. **Positions** - Kies positie (top-left, bottom-right, etc.)
4. **Sound effects** - Audio feedback
5. **Persistence** - Toast blijft bij page reload
6. **Queue management** - Intelligente toast queue

## 📚 API Reference

### useToast Hook

```typescript
const {
  toasts,        // Array van actieve toasts
  showToast,     // Custom toast maken
  removeToast,   // Toast verwijderen
  success,       // Success toast
  error,         // Error toast
  warning,       // Warning toast
  info,          // Info toast
} = useToast();
```

### showToast Parameters

```typescript
showToast(
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message?: string,
  duration?: number  // milliseconds, 0 = nooit verdwijnen
)
```

## 🎨 Customization

Om kleuren aan te passen, edit `/components/ui/Toast.tsx`:

```tsx
const styles = {
  success: {
    container: 'bg-white border-green-200',
    icon: 'bg-green-100 text-green-600',
    // ...
  },
  // ...
};
```

---

**Geniet van elegante gebruikersfeedback met het toast systeem! 🎉**
