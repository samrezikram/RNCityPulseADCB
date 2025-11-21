import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';

const SplashScreen: React.FC = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="heading1">City Pulse</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Local events explorer
        </Text>
        <ActivityIndicator style={styles.loader} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
  loader: {
    marginTop: 24,
  },
});

export default SplashScreen;
