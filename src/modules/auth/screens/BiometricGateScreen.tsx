import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../bridge/auth/useAuth';
import { useSettings } from '../../../bridge/settings/useSettings';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';

const BiometricGateScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { validateBiometric } = useSettings();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
        return;
      }

      const ok = await validateBiometric();

      if (ok) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        await signOut();
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }

      setChecking(false);
    })();
  }, [user, validateBiometric, signOut, navigation]);

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="heading1">{t('auth.biometric_title') ?? 'Unlock City Pulse'}</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          {t('auth.biometric_subtitle') ?? 'Use your fingerprint or face to continue'}
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
    textAlign: 'center',
  },
  loader: {
    marginTop: 24,
  },
});

export default BiometricGateScreen;
