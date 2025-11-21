import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'cityPulse:user';
const BIOMETRIC_KEY = 'cityPulse:biometricEnabled';

export type StoredUser = {
  id: string;
  name: string;
  email: string;
};

export const authStorage = {
  async saveUser(user: StoredUser) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  async getUser(): Promise<StoredUser | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  async clearUser() {
    await AsyncStorage.removeItem(USER_KEY);
  },
  async setBiometricEnabled(enabled: boolean) {
    await AsyncStorage.setItem(BIOMETRIC_KEY, JSON.stringify(enabled));
  },
  async getBiometricEnabled(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(BIOMETRIC_KEY);
    return raw ? JSON.parse(raw) : false;
  },
};