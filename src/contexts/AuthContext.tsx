import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Email admin tidak pernah ditampilkan ke UI — pengguna cukup input password.
// Diset lewat env var supaya tidak hardcode di source.
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isFirebaseConfigured() && Boolean(ADMIN_EMAIL);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
    });
    return () => unsub();
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      async login(password: string) {
        if (!configured || !ADMIN_EMAIL) {
          throw new Error('Firebase belum dikonfigurasi');
        }
        await signInWithEmailAndPassword(getFirebaseAuth(), ADMIN_EMAIL, password);
      },
      async logout() {
        if (!configured) return;
        await signOut(getFirebaseAuth());
      },
    }),
    [user, loading, configured]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
