import { colors } from './colors';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';

export type AppTheme = {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  radius: typeof radius;
};

export const lightTheme: AppTheme = {
  colors,
  spacing,
  typography,
  radius,
};