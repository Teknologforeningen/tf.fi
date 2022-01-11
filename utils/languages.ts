export interface Language {
  title: string
  'om-teknologföreningen': string
  medlemsportal: string
  abiturienter: string
  stälmar: string
  'för-företag': string
  fundraising1: string
  fundraising2: string
  fundraising3: string
  fundraising4: string
}

export type AvailableLanguages = 'swedish' | 'finnish' | 'english'

type Languages = {
  [key in AvailableLanguages]: Language
}

const languages: Languages = {
  swedish: {
    title: 'på svenska',
    'om-teknologföreningen': 'om teknologföreningen',
    medlemsportal: 'medlemsportal',
    abiturienter: 'abiturienter',
    stälmar: 'stämlar',
    'för-företag': 'för företag',
    fundraising1: 'Träffpunkt Aalto - insamlingen är igång!',
    fundraising2: 'TF samlar medel för sitt nya nationshus',
    fundraising3: 'Delta i insamlingen på:',
    fundraising4: 'och läs mera på:',
  },
  finnish: {
    title: 'suomeksi',
    'om-teknologföreningen': 'TEKNOLOGFÖRENINGENISTÄ',
    medlemsportal: 'jäsenille',
    abiturienter: 'abiturienteille',
    stälmar: 'stämlar',
    'för-företag': 'yrityksille',
    fundraising1: 'Träffpunkt Aalto - insamlingen är igång!',
    fundraising2: 'TF samlar medel för sitt nya nationshus',
    fundraising3: 'Delta i insamlingen på',
    fundraising4: ' och läs mera på ',
  },
  english: {
    title: 'in english',
    'om-teknologföreningen': 'about teknologföreningen',
    medlemsportal: 'for members',
    abiturienter: 'for abis',
    stälmar: 'stämlar',
    'för-företag': 'for companies',
    fundraising1: 'Träffpunkt Aalto - the fundraising has begun!',
    fundraising2: 'TF is raising funds for its new home',
    fundraising3: 'Join the fundraising at',
    fundraising4: ' and read more at ',
  },
}

export default languages
