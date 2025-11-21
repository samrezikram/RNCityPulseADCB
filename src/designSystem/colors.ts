export const colors = {
  background: '#020617',
  surface: '#020617',
  card: '#020617',
  primary: '#EF4444',        // ADCB-ish red
  accent: '#F97316',         // accent / secondary
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDanger: '#FCA5A5',
  border: '#111827',
} as const;

export type ColorName = keyof typeof colors;

export const lightColors: Record<ColorName, string> = {
  background: '#F3F4F6',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#EF4444',
  accent: '#F97316',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  textDanger: '#DC2626',
  border: '#D1D5DB',
};

export const darkColors: Record<ColorName, string> = {
  background: '#020617',
  surface: '#020617',
  card: '#020617',
  primary: '#EF4444',
  accent: '#F97316',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDanger: '#FCA5A5',
  border: '#111827',
};