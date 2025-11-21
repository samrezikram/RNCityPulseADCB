import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { colors } from '../colors';

type TextVariant = 'heading1' | 'heading2' | 'body' | 'caption';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: keyof typeof colors;
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'textPrimary',
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <RNText
      {...rest}
      style={[theme.typography[variant], { color: theme.colors[color] }, style]}
    >
      {children}
    </RNText>
  );
};

export default Text;
