import { alpha } from '@mui/material/styles';

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  extraGrey: '#e5e5e5',
};

const SUBMIT_COLOR = {
  0: '#00783F',
  1: '#339365',
};

const PRIMARY = {
  lighter: '#A2C7E2',
  light: '#1a5b93',
  main: '#004987',
  dark: '#002c51',
  darker: '#001628',
  contrastText: '#FFFFFF',
  extraPrimary: '#87CEFA',
};

const SECONDARY = {
  lighter: '#EFD6FF',
  light: '#C9A2F7',
  main: '#A470E9',
  dark: '#5119B7',
  darker: '#27097A',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#CAFDF5',
  light: '#67CCFB',
  main: '#007FC5',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D3FCD2',
  light: '#77ED8B',
  main: '#00783F',
  dark: '#118D57',
  darker: '#065E49',
  contrastText: '#ffffff',
  extra: '#dbf6e5',
};

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#E3B505',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#d1232a',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
  extraError: '#ee6969',
};

const brandColor = {
  pantone: '#004987',
  darkPantone: '#00205C',
  lightPantone: '#dde5f0',
  teal: '#107e7d',
  lightTeal: '#dfebef',
  crimson: '#95190c',
  lightCrimson: '#ece1e3',
  citrine: '#E3B505',
  lightCitrine: '#f4f0e3',
  greyBackground: '#ebedf76e',
  grey: '#636466',
  cerulean: '#007FC5',
  pantoneC: '#A2C7E2',
  funGreen: '#006D46',
  yellow: '#FFC527',
  acajou: '#4C212A',
};

const COMMON = {
  common: {
    black: '#231F20',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  brandColor,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode) {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
    submit: {
      primary: SUBMIT_COLOR[0],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
    submit: {
      primary: SUBMIT_COLOR[1],
    },
  };

  return mode === 'light' ? light : dark;
}