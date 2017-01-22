module.exports = {
  use: [
    'postcss-import',
    'postcss-cssnext',
    'cssnano',
  ],
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      features: {
        autoprefixer: false,
      },
    },
    cssnano: {
      autoprefixer: {
        browsers: '> 5%',
      },
    },
  },
  input: 'src/client/assets/styles/_app.css',
  output: 'src/client/assets/styles/_app.min.css',
  'postcss-cssnext': {
    features: {
      autoprefixer: false,
    },
  },
  cssnano: {
    discardComments: {
      removeAll: true,
    },
    autoprefixer: {
      browsers: '> 5%',
    },
  },
};
