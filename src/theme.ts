import {
  alpha,
  createTheme as createMuiTheme,
  responsiveFontSizes
} from '@mui/material/styles';

const baseThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          fontSize: 15
        },
        sizeMedium: {
          fontSize: 14
        },
        sizeSmall: {
          fontSize: 13
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },

  },

  typography: {
    h1: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.5
    },
    h2: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.5
    },
    h3: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.5
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.5
    },
    h5: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {},
    body2: {
      lineHeight: 1.6
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75
    },
    caption: {
      fontWeight: 400,
      lineHeight: 1.6
    },
    overline: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 1,
      lineHeight: 2.46
    },
    button: {
      fontWeight: 500,
      textTransform: 'none'
    }
  }
} as const;

const lightThemeOptions = {
  components: {},
  palette: {
    background: {
      default: '#ffffff',
      paper: '#E4EAF3'
    },
    mode: 'light',
    primary: {
      main: '##E4EAF3'
    },
    text: {
      disabled: '#E4EAF3',
      primary: '#03060b',
    },
  },

} as const;

const darkThemeOptions = {
  palette: {
    background: {
      default: '#13141C',
      paper: '#2F3247'
    },
    mode: 'dark',
    primary: {
      main: '#2F3247',
    },
    text: {
      disabled: alpha('#d8dade', 0.14),
      primary: '#d8dade',
    },
  },

} as const;

type ThemeOptions = {
  theme: string
}

export const createCustomTheme = (config: ThemeOptions = { theme: 'light' }) => {
  let themeOptions = config.theme === 'light'
    ? lightThemeOptions
    : darkThemeOptions;

  if (!themeOptions) {
    themeOptions = lightThemeOptions;
  }

  const theme = responsiveFontSizes(createMuiTheme({ ...baseThemeOptions }, { ...themeOptions }))

  return theme;
};