/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-import'),
    process.env.NODE_ENV === 'production' &&
      require('cssnano')({
        preset: 'default',
      }),
  ],
};
