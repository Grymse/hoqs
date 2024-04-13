const { nextui } = require('@nextui-org/react');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    'bg-default-100',
    'text-default-500',
    'bg-primary-100',
    'text-primary-500',
    'bg-success-100',
    'text-success-500',
    'bg-warning-100',
    'text-warning-500',
    'bg-danger-100',
    'text-danger-500',
    'bg-secondary-100',
    'text-secondary-500',
  ],

  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
