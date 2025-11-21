import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../bridge/auth/useAuth';
import Button from '../../../designSystem/components/Button';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();

  const [name, setName] = useState('City Pulse User');
  const [email, setEmail] = useState('test@citypulse.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp(name.trim(), email.trim(), password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err: any) {
      Alert.alert('Sign up failed', err?.message || 'Please check your input');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="heading1">{t('auth.signup_title')}</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Create your City Pulse account
        </Text>
      </View>

      <View style={styles.form}>
        <Text variant="body" style={styles.label}>
          {t('auth.name') ?? 'Name'}
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t('auth.name') ?? 'Name'}
          placeholderTextColor="#6B7280"
          style={styles.input}
        />

        <Text variant="body" style={styles.label}>
          {t('auth.email')}
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t('auth.email')}
          placeholderTextColor="#6B7280"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text variant="body" style={styles.label}>
          {t('auth.password')}
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={t('auth.password')}
          placeholderTextColor="#6B7280"
          secureTextEntry
          style={styles.input}
        />

        <Button label={t('auth.signup')} onPress={handleSignUp} loading={loading} style={styles.signUpButton} />

        <TouchableOpacity onPress={handleGoToSignIn} style={styles.footerLink}>
          <Text color="textSecondary">
            Already have an account? <Text color="primary">{t('auth.signin')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  form: {
    gap: 12,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2933',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F9FAFB',
  },
  signUpButton: {
    marginTop: 24,
  },
  footerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default SignUpScreen;
