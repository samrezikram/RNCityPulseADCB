import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import ar from './ar.json';
import en from './en.json';

const STORAGE_KEY = 'cityPulse:language';

export const supportedLanguages = {
  en: { label: 'English', isRTL: false },
  ar: { label: 'العربية', isRTL: true },
};

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

export const initI18n = async () => {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  const deviceLocales = RNLocalize.getLocales();
  const deviceIsArabic = deviceLocales[0]?.languageCode === 'ar';

  const initialLang =
    (saved as 'en' | 'ar') || (deviceIsArabic ? 'ar' : 'en');

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLang,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });

  const isRTL = supportedLanguages[initialLang].isRTL;
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }
};

export const changeLanguage = async (lang: 'en' | 'ar') => {
  if (!supportedLanguages[lang]) return;
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(STORAGE_KEY, lang);
  const isRTL = supportedLanguages[lang].isRTL;
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    // you can optionally alert user to restart app
  }
};

export default i18n;