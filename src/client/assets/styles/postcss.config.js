module.exports = {
  // use: [
  //   'postcss-import',
  //   'postcss-cssnext',
  //   'cssnano',
  // ],
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    cssnano: {
      autoprefixer: false,
    },
  },
  // input: 'src/client/assets/styles/_app.css',
  // output: 'src/client/assets/styles/_app.min.css',
  watch: true,
  // cssnano: {
  //   discardComments: {
  //     removeAll: true,
  //   },
  //   autoprefixer: false,
  // },
};
