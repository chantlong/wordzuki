import test from 'tape-catch';
import request from 'supertest';
import mongoose from 'mongoose';
import { wordsFixture } from './fixtures';
import app from '../../src/server/server';

let cookie;
let userSession;

test('setup word', (assert) => {
  mongoose.connection.db.dropDatabase((err) => {
    if (err) { assert.fail(err); }
    // create a user session
    userSession = request.agent(app);
    userSession
      .post('/api/auth/sign-up')
      .set('Accept', 'application/json')
      .send({
        username: 'wordzukitest@wordzukitest.com',
        password: 'test123',
      })
      .expect('set-cookie', /connect.sid/)
      .end((err2, res) => {
        cookie = res.headers['set-cookie'];
        assert.end(err2);
      });
  });
});

test('fetch a created word', (assert) => {
  userSession
    .post('/api/word')
    .set('Cookie', cookie)
    .send(wordsFixture)
    .expect(200)
    .end((err) => {
      if (err) {
        throw err;
      }
      userSession
      .get('/api/word')
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err2, res2) => {
        const actual = {
          word: res2.body[0].word,
          def: JSON.parse(res2.body[0].def),
        };
        const expected = {
          word: 'isolate',
          def: ['«…から» 〈国組織人など〉を孤立させる, 離す'],
        };
        assert.deepEqual(actual, expected, 'should return saved definition');
        assert.end(err2);
      });
    });
});

test('delete a word', (assert) => {
  userSession
    .get('/api/word')
    .set('Cookie', cookie)
    .end((err, res) => {
      // pick 1st word in word array
      const wordId = res.body[0]._id;
      userSession
        .delete(`/api/word/${wordId}`)
        .expect(200)
        .end((err2, res2) => {
          const actual = res2.body.message;
          const expected = 'isolateを削除しました。';
          assert.equal(actual, expected, 'should delete selected word');
          assert.end(err2);
        });
    });
});

test.onFinish(() => process.exit(0));
