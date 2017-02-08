import { expect } from 'chai';
import RatingRangeFilter from './RatingRangeFilter';

let rangeFilter = RatingRangeFilter;

describe('Rating range filter', () => {

  it('should create a 5 boolean range out of a note', () => {
    expect(rangeFilter(2)).to.deep.equal([false, false, false, true, true]);
  });
});
