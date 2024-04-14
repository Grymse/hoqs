import 'apps/main-site/src/index.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { messages } from '../src';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  (Story: any) => 
    <IntlProvider defaultLocale="en" locale="en" messages={messages}>
      <Story />
    </IntlProvider>
];