import { useEffect, useState } from 'react';
import { authStorage, StoredUser } from './authStorage';

type AuthState = {
  user: StoredUser | null;
  loading: boolean;
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    (async () => {
      const user = await authStorage.getUser();
      setState({ user, loading: false });
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    // For assessment you can just match mock credentials
    if (email === 'test@citypulse.com' && password === 'password123') {
      const user: StoredUser = {
        id: '1',
        name: 'City Pulse User',
        email,
      };
      await authStorage.saveUser(user);
      setState({ user, loading: false });
      return user;
    }
    throw new Error('Invalid credentials');
  };

  const signUp = async (name: string, email: string, password: string) => {
    // Same style, just store locally
    const user: StoredUser = { id: Date.now().toString(), name, email };
    await authStorage.saveUser(user);
    setState({ user, loading: false });
    return user;
  };

  const signOut = async () => {
    await authStorage.clearUser();
    setState({ user: null, loading: false });
  };

  return {
    user: state.user,
    loading: state.loading,
    signIn,
    signUp,
    signOut,
  };
};