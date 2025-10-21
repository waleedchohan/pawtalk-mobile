import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    gray: {
      400: '#6A778B',
    },
    primary: {
      600: '#FF5733',
    },
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      200: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      300: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      400: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      500: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      600: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      700: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      800: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
      900: {
        normal: 'Poppins-Regular',
        bold: 'Poppins-Bold',
      },
    },
  },
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    '2xl': 40,
    '3xl': 56,
  },
  fonts: {
    heading: 'Poppins-Bold',
    body: 'Poppins-Regular',
    mono: 'Poppins-Regular',
  },
});

export {theme};
