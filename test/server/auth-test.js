import test from 'tape-catch';
import request from 'supertest';
import mongoose from 'mongoose';
import { createUserSetup } from './fixtures';
import app from '../../src/server/server';

let cookie;

test('setup auth', (assert) => {
  mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase(err => err || assert.end());
  });
});

test('creating an account', (assert) => {
  createUserSetup(app)
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      const actual = res.body;
      const expected = 'wordzukitest@wordzukitest.com';
      assert.equal(actual, expected, 'username should be returned from account creation');
      assert.end();
    });
});

test('creating an account with duplicate user', (assert) => {
  createUserSetup(app)
    .expect(400)
    .end((err, res) => {
      const actual = res.body.message;
      const expected = 'ユーザー名は既に存在しています';
      assert.equal(actual, expected, 'should return username already exists');
      assert.end();
    });
});

test('sign in an account with bad credentials', (assert) => {
  request(app)
    .post('/api/auth/sign-in')
    .send({
      username: 'wordzukitest@wordzukitest.com',
      password: 'test1234',
    })
    .expect(401)
    .end((err) => {
      if (err) {
        return assert.fail(err);
      }
      assert.pass('does not sign in on bad credentials');
      return assert.end();
    });
});

test('sign in an account with correct credentials', (assert) => {
  request(app)
    .post('/api/auth/sign-in')
    .send({
      username: 'wordzukitest@wordzukitest.com',
      password: 'test123',
    })
    .expect(200)
    .end((err, res) => {
      const actual = res.body;
      const expected = 'wordzukitest@wordzukitest.com';
      assert.equal(actual, expected, 'username should be returned from signin');
      assert.end();
    });
});

test('verify if user is logged when not logged in', (assert) => {
  request(app)
    .get('/api/auth/is-authorized')
    .end((err, res) => {
      const actual = res.body;
      const expected = { isLoggedIn: false };
      assert.deepEqual(actual, expected, 'should return false login status');
      assert.end(err);
    });
});

// make sure redis server is started
test('verify if user is logged when logged in', (assert) => {
  const testSession = request.agent(app);
  testSession
    .post('/api/auth/sign-in')
    .send({
      username: 'wordzukitest@wordzukitest.com',
      password: 'test123',
    })
    .expect('set-cookie', /connect.sid/)
    .end((err, res) => {
      // authenticated session
      cookie = res.headers['set-cookie'];
      testSession
        .get('/api/auth/is-authorized')
        .set('Cookie', cookie)
        .expect(200)
        .end((err2, res2) => {
          const actual = res2.body;
          const expected = { isLoggedIn: true, user: 'wordzukitest@wordzukitest.com' };
          assert.deepEqual(actual, expected, 'should return verified user');
          assert.end(err);
        });
    });
});
