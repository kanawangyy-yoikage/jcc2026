import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  type Firestore,
  type Timestamp,
} from 'firebase/firestore';

export interface RegistrationRecord {
  id: string;
  full_name: string;
  whatsapp: string;
  class_level: string;
  major: string;
  gender: string;
  divisions: string[];
  reason: string;
  created_at?: Timestamp | string | null;
  source?: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

function getApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase belum dikonfigurasi. Tambahkan VITE_FIREBASE_* di Secrets tab.'
    );
  }
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) auth = getAuth(getApp());
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) db = getFirestore(getApp());
  return db;
}

export async function createRegistration(payload: {
  full_name: string;
  whatsapp: string;
  class_level: string;
  major: string;
  gender: string;
  divisions: string[];
  reason: string;
}) {
  const firestore = getFirebaseDb();
  const docRef = await addDoc(collection(firestore, 'registrations'), {
    ...payload,
    source: 'web',
    created_at: serverTimestamp(),
  });
  return docRef.id;
}

export async function fetchRegistrations(): Promise<RegistrationRecord[]> {
  const firestore = getFirebaseDb();
  const q = query(collection(firestore, 'registrations'), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      full_name: String(data.full_name ?? ''),
      whatsapp: String(data.whatsapp ?? ''),
      class_level: String(data.class_level ?? ''),
      major: String(data.major ?? ''),
      gender: String(data.gender ?? ''),
      divisions: Array.isArray(data.divisions) ? data.divisions.map(String) : [],
      reason: String(data.reason ?? ''),
      created_at: data.created_at ?? null,
      source: data.source ? String(data.source) : 'web',
    } satisfies RegistrationRecord;
  });
}

/** Returns created_at as epoch ms for sorting; 0 if unknown/missing. */
export function getCreatedAtMillis(value: RegistrationRecord['created_at']): number {
  if (!value) return 0;
  if (typeof value === 'string') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().getTime();
  }
  return 0;
}

export function formatCreatedAt(value: RegistrationRecord['created_at']): string {
  if (!value) return '-';
  if (typeof value === 'string') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? value : d.toLocaleString('id-ID');
  }
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toLocaleString('id-ID');
  }
  return '-';
}
