export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const typography = {
  fontFamily: 'Lato, sans-serif',
  fontWeightBold: 700,
  fontWeightRegular: 400,
  fontWeightLight: 300,
  h1: {
    fontSize: pxToRem(64),
    lineHeight: 0,
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 48, md: 56, lg: 64 }),
  },

  h2: {
    fontSize: pxToRem(48),
    lineHeight: 0,
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 24, md: 32, lg: 36 }),
  },

  h3: {
    fontSize: pxToRem(24),
    lineHeight: 0,
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 18, md: 24, lg: 28 }),
  },

  h4: {
    fontSize: pxToRem(18),
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },

  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },

  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 16, md: 17, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    fontWeight: 200,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  quote: {
    fontSize: pxToRem(16),
    lineHeight: pxToRem(20),
  },
  link: {
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(13),
  },
  caption1: {
    lineHeight: 1.5,
    fontSize: pxToRem(10),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
  warning: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    color: '#FFAB00',
  },
};