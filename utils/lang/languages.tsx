export const languages: Record<string, Record<string, string>> = {
  swedish: {
    title: 'på svenska',
    'om-teknologföreningen': 'om teknologföreningen',
    medlemsportal: 'medlemsportal',
    abiturienter: 'abiturienter',
    stämlar: 'stämlar',
    'för-företag': 'för företag',
  },
  finnish: {
    title: 'suomeksi',
    'om-teknologföreningen': 'TEKNOLOGFÖRENINGENISTÄ',
    medlemsportal: 'jäsenille',
    abiturienter: 'abiturienteille',
    stämlar: 'stämlar',
    'för-företag': 'yrityksille',
  },
  english: {
    title: 'in english',
    'om-teknologföreningen': 'about teknologföreningen',
    medlemsportal: 'for members',
    abiturienter: 'for abis',
    stämlar: 'stämlar',
    'för-företag': 'for companies',
  },
}
export const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key]
