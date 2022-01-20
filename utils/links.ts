export interface Nation {
  name: string
  url: string
  imgUrl: string
}

const links = {
  'om-teknologföreningen': 'https://about.teknologforeningen.fi/index.php/',
  medlemsportal:
    'https://medlem.teknologforeningen.fi/index.php/login-menu-hidden',
  abiturienter: 'https://abi.teknologforeningen.fi/index.php/',
  stälmar: 'https://stalm.teknologforeningen.fi/index.php/',
  'för-företag':
    'https://about.teknologforeningen.fi/index.php/?option=com_content&view=article&id=615',
  täffäab: 'https://www.taffa.fi/home',
  lunch: 'https://lunch.tf.fi/',
  nations: [
    {
      name: 'Think cell',
      url: 'https://www.teknologforeningen.fi/think-cell/',
      imgUrl: '/images/think-cell-logo_white.png',
    },
    {
      name: 'Visma',
      url: 'https://www.visma.fi/',
      imgUrl: '/images/visma.png',
    },
    {
      name: 'EY',
      url: 'https://www.ey.com/fi_fi/',
      imgUrl: '/images/ey-white.png',
    },
    {
      name: 'trimble',
      url: 'https://www.trimble.com/',
      imgUrl: '/images/trimble.png',
    },
    {
      name: 'futurice',
      url: 'https://www.futurice.com/',
      imgUrl: '/images/futurice.png',
    },
    {
      name: 'Academic work',
      url: 'https://www.academicwork.fi/',
      imgUrl: '/images/academicwork.png',
    },
  ],
  fundraising: {
    donera: 'http://donera.tf.fi/',
    info: 'http://vision.tf.fi/',
  },
}

export default links
