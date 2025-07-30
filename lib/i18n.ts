import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // varsayılan dil
    fallbackLng: 'en',
    ns: ['common', 'home', 'pricing', 'auth', 'dashboard'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json', // public klasöründeki dosya yolu
    },
  });

export default i18n;
