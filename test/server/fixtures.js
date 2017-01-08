import request from 'supertest';

const createUserSetup = server => (request(server)
  .post('/api/auth/sign-up')
  .send({
    username: 'test@test.com',
    password: 'test123',
  }));

const wordsFixture = {
  word: 'isolate',
  definition: JSON.stringify(['«…から» 〈国組織人など〉を孤立させる, 離す']),
  ex: 'She was isolated in his room from society',
  source: 'www.test.test',
};

module.exports = {
  createUserSetup,
  wordsFixture,
};
