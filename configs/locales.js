const locale = 'en'

export default {
  // current locale
  locale,
  // when translation is not available fallback to that locale
  fallbackLocale: 'en',

  // availabled locales for user selection
  availableLocales: [{
    code: 'en',
    flag: 'us',
    shortName: 'En',
    dir: 'ltr',
    name: 'English',
    file: 'en.js'
  }, {
    code: 'ar',
    flag: 'ar',
    shortName: 'Ar',
    dir: 'rtl',
    name: 'Arabic',
    file: 'ar.js'
  },
  {
    code: 'fr',
    flag: 'fr',
    shortName: 'Fr',
    dir: 'ltr',
    name: 'French',
    file: 'fr.js'
  }, {
    code: 'es',
    flag: 'es',
    shortName: 'Es',
    dir: 'ltr',
    name: 'Spanish',
    file: 'es.js'
  },
  {
    code: 'ru',
    flag: 'ru',
    ShortName: 'Ru',
    dir: 'ltr',
    name: 'Russian',
    file: 'ru.js',
  },
  {
    code: 'de',
    flag: 'de',
    ShortName: 'De',
    dir: 'ltr',
    name: 'Deutsch',
    file: 'de.js',
  }],

  languages: [{
    code: 'en',
    flag: 'us',
    name: 'English'
  },
  {
    code: 'ar',
    flag: 'ar',
    name: 'Arabic'
  },
  {
    code: 'fr',
    flag: 'fr',
    name: 'French',
  },
  {
    code: 'es',
    flag: 'es',
    name: 'Spanish'
  },
  {
    code: 'ru',
    flag: 'ru',
    name: 'Russian'
  },
  {
    code: 'de',
    flag: 'de',
    name: 'Deutsch'
  }]

};
