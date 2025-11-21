import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch, View } from 'react-native';
import { useAuth } from '../../../bridge/auth/useAuth';
import { useSettings } from '../../../bridge/settings/useSettings';
import Button from '../../../designSystem/components/Button';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';
import { changeLanguage } from '../../../i18n';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { biometricEnabled, biometricSupported, toggleBiometric } = useSettings();

  const currentLang = i18n.language.startsWith('ar') ? 'ar' : 'en';

  const handleLogout = async () => {
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  const handleChangeLanguage = async (lang: 'en' | 'ar') => {
    if (lang === currentLang) return;
    await changeLanguage(lang);
  };

  return (
    <Screen>
      <View style={styles.section}>
        <Text variant="heading1">{t('profile.title') ?? 'Profile'}</Text>
        {user && (
          <>
            <Text variant="body" style={styles.userText}>
              {user.name}
            </Text>
            <Text variant="body" color="textSecondary">
              {user.email}
            </Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text variant="heading2" style={styles.sectionTitle}>
          {t('profile.language') ?? 'Language'}
        </Text>
        <View style={styles.row}>
          <Button
            label="English"
            variant={currentLang === 'en' ? 'primary' : 'ghost'}
            onPress={() => handleChangeLanguage('en')}
            style={styles.langButton}
          />
          <Button
            label="Arabic"
            variant={currentLang === 'ar' ? 'primary' : 'ghost'}
            onPress={() => handleChangeLanguage('ar')}
            style={styles.langButton}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="heading2" style={styles.sectionTitle}>
          {t('profile.security') ?? 'Security'}
        </Text>
        <View style={styles.row}>
          <Text variant="body">{t('profile.biometric') ?? 'Biometric login'}</Text>
          <Switch value={biometricEnabled} disabled={!biometricSupported} onValueChange={toggleBiometric} />
        </View>
        {!biometricSupported && (
          <Text variant="caption" color="textSecondary" style={styles.helper}>
            {t('profile.biometric_not_supported') ?? 'Biometric is not available on this device'}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Button label={t('profile.logout') ?? 'Log out'} variant="ghost" onPress={handleLogout} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langButton: {
    flex: 1,
  },
  userText: {
    marginTop: 8,
  },
  helper: {
    marginTop: 4,
  },
});

export default ProfileScreen;
