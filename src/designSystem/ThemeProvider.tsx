// src/designSystem/ThemeProvider.tsx
import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type ColorName } from './colors';

type TextVariant = 'heading1' | 'heading2' | 'body' | 'caption';

type Typography = Record<TextVariant, any>;

export type Theme = {
  mode: 'light' | 'dark';
  colors: Record<ColorName, string>;
  typography: Typography;
};

const baseTypography: Typography = {
  heading1: {
    fontSize: 24,
    fontWeight: '700',
  },
  heading2: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
  },
};

const ThemeContext = createContext<Theme>({
  mode: 'dark',
  colors: darkColors,
  typography: baseTypography,
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const scheme = useColorScheme(); // 'light' | 'dark' | null

  const value = useMemo<Theme>(() => {
    const mode: 'light' | 'dark' = scheme === 'light' ? 'light' : 'dark';
    return {
      mode,
      colors: mode === 'light' ? lightColors : darkColors,
      typography: baseTypography,
    };
  }, [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
