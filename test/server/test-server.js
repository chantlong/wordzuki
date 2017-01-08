// /* globals describe it beforeEach afterEach */

// process.env.NODE_ENV = 'test';

// const expect = require('chai').expect;
// const request = require('supertest');
// const server = require('../../src/server/server');
// const Word = require('../../src/server/models/Word');

// const wordSample = {
//   userId: '2',
//   word: 'fire',
//   pron: 'aisu',
//   examples: 'eat adasda',
// };

// describe('Words', () => {
//   beforeEach((done) => {
//     Word.collection.drop();
//     done();
//   });

//   afterEach((done) => {
//     Word.collection.drop();
//     done();
//   });

//   it('should be able to ADD a word on /word POST', (done) => {
//     request(server)
//       .post('/word')
//       .send(wordSample)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         expect(res.body.SUCCESS.userId).to.equal(wordSample.userId);
//         expect(res.body.SUCCESS.word).to.equal(wordSample.word);
//         expect(res.body.SUCCESS.pron).to.equal(wordSample.pron);
//         expect(res.body.SUCCESS.examples).to.include(wordSample.examples);
//         done();
//       });
//   });
// });

// describe('Word Search', () => {
//   it('should be able to SEARCH a word on /search POST', (done) => {
//     request(server)
//       .post('/search')
//       .send({ word: 'fire' })
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         expect(res.body.SUCCESS).to.be.a('array');
//         done();
//       });
//   });
// });
