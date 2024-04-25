// eslint-disable-next-line
import 'apps/main-site/src/index.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { AuthProvider, DarkModeProvider, messages } from '../src';
import { Preview } from '@storybook/react';
import { HashRouter, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => {
      return (
        <AuthProvider>
          <DarkModeProvider>
            <IntlProvider defaultLocale="en" locale="en" messages={messages}>
              <HashRouter>
                <UIProvider>
                  <Story />
                </UIProvider>
              </HashRouter>
            </IntlProvider>
          </DarkModeProvider>
        </AuthProvider>
      );
    },
  ],
};

export default preview;

function UIProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return NextUIProvider({ children, navigate });
}
