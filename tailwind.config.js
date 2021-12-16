/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          light: withOpacity('--color-primary-light'),
          100: withOpacity('--color-primary-100'),
          200: withOpacity('--color-primary-200'),
          300: withOpacity('--color-primary-300'),
          400: withOpacity('--color-primary-400'),
          500: withOpacity('--color-primary-500'),
          600: withOpacity('--color-primary-600'),
          700: withOpacity('--color-primary-700'),
          800: withOpacity('--color-primary-800'),
          900: withOpacity('--color-primary-900'),
          dark: withOpacity('--color-primary-dark'),
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            '[class~="lead"]': { color: theme('colors.gray.400') },
            a: { color: theme('colors.gray.100') },
            strong: { color: theme('colors.gray.100') },
            'ul > li::before': { backgroundColor: theme('colors.gray.700') },
            hr: { borderColor: theme('colors.gray.800') },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.800'),
            },
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
            code: { color: theme('colors.gray.100') },
            'a code': { color: theme('colors.gray.100') },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody tr': { borderBottomColor: theme('colors.gray.800') },
          },
        },
      }),
    },
  },
  variants: {
    extend: { typography: ['dark'] },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
