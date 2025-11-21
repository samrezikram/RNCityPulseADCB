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

// react-native-biometrics mock
jest.mock('react-native-biometrics', () => ({
  isSensorAvailable: jest.fn().mockResolvedValue({ available: false }),
  simplePrompt: jest.fn().mockResolvedValue({ success: true }),
}));

// react-native-maps mock
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockMapView = (props) => <View {...props} />;
  const MockMarker = (props) => <View {...props} />;

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});