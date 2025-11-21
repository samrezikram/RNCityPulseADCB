import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { biometricService } from '../../services/biometric/biometricService';
import { authStorage } from '../auth/authStorage';

const SETTINGS_KEY = 'cityPulse:settings';

type SettingsState = {
  biometricEnabled: boolean;
};

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>({ biometricEnabled: false });
  const [biometricSupported, setBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const supported = await biometricService.isAvailable();
      setBiometricSupported(supported);

      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      if (raw) {
        setState(JSON.parse(raw));
      } else {
        const enabled = await authStorage.getBiometricEnabled();
        setState({ biometricEnabled: enabled });
      }
    })();
  }, []);

  const toggleBiometric = async (enabled: boolean) => {
    const next = { biometricEnabled: enabled };
    setState(next);
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    await authStorage.setBiometricEnabled(enabled);
  };

  const validateBiometric = async () => {
    if (!state.biometricEnabled || !biometricSupported) return true;
    return biometricService.simplePrompt('Confirm it is you');
  };

  return {
    biometricEnabled: state.biometricEnabled,
    biometricSupported,
    toggleBiometric,
    validateBiometric,
  };
};