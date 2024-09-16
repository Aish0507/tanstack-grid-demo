import en from './en';


export function i18n(config = 'en') {
  if (typeof config === 'string') {
    return  en;
  }

  return config;
}
