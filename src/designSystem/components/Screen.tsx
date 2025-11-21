import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

type Props = PropsWithChildren<{
  scrollable?: boolean;
  contentStyle?: ViewStyle;
}>;

const Screen: React.FC<Props> = ({
  scrollable = true,
  contentStyle,
  children,
}) => {
  const theme = useTheme();

  const content = scrollable ? (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.content, contentStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default Screen;
