/* eslint no-undef:0 */
import { assert } from 'chai';
import FirstClass from './FirstClass';

describe('Home Component', () => {
  let firstObject;

  beforeEach(() => {
    firstObject = new FirstClass();
  });

  it('should define basic model', () => {
    assert.equal(firstObject.millesime, '2005');
    assert.equal(firstObject.nom, 'Chateau Poitevin');
  });
});
