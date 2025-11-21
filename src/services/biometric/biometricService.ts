import ReactNativeBiometrics from 'react-native-biometrics';

export const biometricService = {
  async isAvailable() {
    const { available } = await ReactNativeBiometrics.isSensorAvailable();
    return available;
  },
  async simplePrompt(reason: string) {
    const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage: reason });
    return success;
  },
};