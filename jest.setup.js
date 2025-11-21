import '@testing-library/jest-native/extend-expect';

// basic mock for i18n
jest.mock('./src/i18n', () => ({
  __esModule: true,
  default: {
    t: (key) => key,
    changeLanguage: jest.fn(),
  },
  initI18n: jest.fn(),
}));

// AsyncStorage mock
jest.mock('@react-native-async-storage/async-storage', () => {
  return require('@react-native-async-storage/async-storage/jest/async-storage-mock');
});