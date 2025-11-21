import React, { createContext, PropsWithChildren, useContext } from 'react';
import { I18nManager } from 'react-native';
import { AppTheme, lightTheme } from './theme';

const ThemeContext = createContext<AppTheme>(lightTheme);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const isRTL = () => I18nManager.isRTL;
