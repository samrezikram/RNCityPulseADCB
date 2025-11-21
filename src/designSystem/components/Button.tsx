import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../ThemeProvider';
import AppText from './Text';

type ButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading,
  variant = 'primary',
  style,
}) => {
  const theme = useTheme();
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.base,
        {
          backgroundColor: isGhost ? 'transparent' : theme.colors.primary,
          borderColor: isGhost ? theme.colors.primary : 'transparent',
          borderWidth: isGhost ? 1 : 0,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <AppText
          variant="body"
          color={isGhost ? 'primary' : 'textPrimary'}
          style={styles.label}
        >
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
});

export default Button;
