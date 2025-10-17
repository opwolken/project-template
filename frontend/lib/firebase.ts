// Firebase client SDK configuration
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Connect to emulators in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';
  
  if (useEmulators) {
    try {
      // Only connect if not already connected
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(db as any)._settingsFrozen) {
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
        console.log('🔥 Connected to Firestore Emulator');
      }
      
      // Auth emulator needs special handling
      const authEmulatorUrl = 'http://127.0.0.1:9099';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(auth as any).emulatorConfig) {
        connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true });
        console.log('🔑 Connected to Auth Emulator');
      }
    } catch {
      console.log('Emulators already connected or not available');
    }
  }
}

export { app, db, auth, googleProvider };
