export interface Language {
  title: string
  'om-teknologföreningen': string
  medlemsportal: string
  abiturienter: string
  stälmar: string
  'för-företag': string
  fundraising1: string
  fundraising2: string
}

export type AvailableLanguages = 'sv-FI' | 'fi-FI' | 'en-GB'

type Languages = {
  [key in AvailableLanguages]: Language
}

const languages: Languages = {
  'sv-FI': {
    title: 'på svenska',
    'om-teknologföreningen': 'om teknologföreningen',
    medlemsportal: 'medlemsportal',
    abiturienter: 'abiturienter',
    stälmar: 'stälmar',
    'för-företag': 'för företag',
    fundraising1: 'TF samlar medel för sitt nya nationshus!',
    fundraising2: 'Läs mera och delta i insamlingen på: ',
  },
  'fi-FI': {
    title: 'suomeksi',
    'om-teknologföreningen': 'TEKNOLOGFÖRENINGENISTÄ',
    medlemsportal: 'jäsenille',
    abiturienter: 'abiturienteille',
    stälmar: 'stälmar',
    'för-företag': 'yrityksille',
    fundraising1: 'TF kerää rahaa uuteen osakuntataloon!',
    fundraising2: 'Lue lisää ja osallistu varainkeruuseen: ',
  },
  'en-GB': {
    title: 'in english',
    'om-teknologföreningen': 'about teknologföreningen',
    medlemsportal: 'for members',
    abiturienter: 'for abis',
    stälmar: 'stälmar',
    'för-företag': 'for companies',
    fundraising1: 'TF is raising funds for its new home!',
    fundraising2: 'Read more and participate in the fundraising: ',
  },
}

export default languages
