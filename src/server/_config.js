const config = {};

config.mongoURI = {
  development: 'mongodb://localhost/wordzuki',
  test: 'mongodb://localhost/wordzuki-test',
  production: process.env.PROD_MONGODB,
};

module.exports = config;
