import { TextStyle } from 'react-native';

type TextVariant = 'heading1' | 'heading2' | 'body' | 'caption';

export const typography: Record<TextVariant, TextStyle> = {
  heading1: {
    fontSize: 28,
    fontWeight: '700',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
  },
};