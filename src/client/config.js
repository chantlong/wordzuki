const config = process.env.NODE_ENV === 'production' ?
{ url: `${process.env.PROTOCOL}//${process.env.HOST}` } :
{ url: 'http://localhost:3000' };

export default config;
