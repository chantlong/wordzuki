import test from 'tape-catch';
import request from 'supertest';
import mongoose from 'mongoose';
import { readKVB } from '../../src/server/controllers/KVBImporter';
import { loadE2JDict, searchE2J } from '../../src/server/controllers/Dict';
import app from '../../src/server/server';

test('load E2JDict', (assert) => {
  loadE2JDict()
    .then((dict) => {
      const actual = dict.absentminded;
      const expected = '放心した,ぼんやりしている / 忘れっぽい';
      assert.equal(actual, expected, 'on successful load of dict, should return a definition in string format');
      assert.end();
    });
});

test('search E2J dict', (assert) => {
  loadE2JDict()
    .then((dict) => {
      const actual = searchE2J('sofa', dict);
      const expected = ['『長いす』,ソファー'];
      assert.deepEqual(actual, expected, 'should return array of definition with word sofa');
      const actual2 = searchE2J('alklzxz', dict);
      const expected2 = null;
      assert.equal(actual2, expected2, 'should return null for an unknown word');
      assert.end();
    });
});
