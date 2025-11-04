import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // varsayılan dil
    fallbackLng: 'en',
    ns: ['common', 'home', 'pricing', 'auth', 'dashboard', 'profile'],
    defaultNS: 'common',
    debug: false, // Production için false
    interpolation: {
      escapeValue: false,
      format: function(value, format) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json', // public klasöründeki dosya yolu
      requestOptions: {
        cache: 'no-cache' // Cache problemlerini önlemek için
      }
    },
    react: {
      useSuspense: false // SSR ile uyumluluk için
    }
  });

export default i18n;
