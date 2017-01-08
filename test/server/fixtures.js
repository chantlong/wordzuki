import request from 'supertest';

const createUserSetup = server => (request(server)
  .post('/api/auth/sign-up')
  .send({
    username: 'test@test.com',
    password: 'test123',
  }));

module.exports = {
  createUserSetup,
};

