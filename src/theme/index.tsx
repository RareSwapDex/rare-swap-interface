import React, { useMemo } from 'react';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
} from 'styled-components';
import { useIsDarkMode } from '../state/user/hooks';
import { Text, TextProps } from 'rebass';
import { Colors } from './styled';

export * from './components';

const MEDIA_WIDTHS = {
  upToExtraSmall: 540,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {}
) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? 'white' : 'white',
    text2: darkMode ? '#475569' : '#475569',
    text3: darkMode ? '#6C7284' : '#6C7284',
    text4: darkMode ? '#565A69' : '#565A69',
    text5: darkMode ? '#2C2F36' : '#2C2F36',
    text6: darkMode ? '#fafafa' : '#fafafa',
    text7: darkMode ? '#000' : '#000',

    // backgrounds / greys
    bg1: darkMode ? '#27292e' : '#27292e',
    bg2: darkMode ? '#27292e' : '#27292e',
    bg3: darkMode ? '#3a3d47' : '#3a3d47',
    bg4: darkMode ? '#4c4f5c' : '#4c4f5c',
    bg5: darkMode ? '#6C7284' : '#6C7284',
    bg6: darkMode ? '#cc78d4' : '#cc78d4',
    bg7: darkMode ? '#1489f3' : '#1489f3',
    bg8: darkMode ? '#060606' : '#060606',
    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,.425)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.1)',

    //primary colors
    primary1: '#2792d6',
    primary2: '#3099db',
    primary3: '#389fe0',
    primary4: '#54afe8',
    primary5: '#5fb3e8',
    primary6: '#3099db',

    // color text
    primaryText1: darkMode ? '#fff' : '#fff',

    // secondary colors
    secondary1: '#3B6A9C',
    secondary2: darkMode ? '#17000b26' : '#17000b26',
    secondary3: darkMode ? '#17000b26' : '#17000b26',

    // other
    red1: '#cc78d4',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#3B6A9C',
  };
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#000',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: white;
`;

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'black'} {...props} />;
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />;
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />;
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />;
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />;
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />;
  },
};

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}

html,
body {
  margin: 0;
  padding: 0;
}

a {
  color: ${colors(false).blue1};
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 18px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`;

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  // background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
}
`;
