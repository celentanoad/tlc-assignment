const { parseBillNumber } = require('../../services/billParser');
const { validCases, invalidCases } = require('./mockData');

describe('Bill Parser', () => {
  describe('Valid Bill Numbers', () => {
    validCases.forEach(({ input, expected }) => {
      test(`parses ${input} correctly`, () => {
        expect(parseBillNumber(input)).toEqual(expected);
      });
    });
    describe('Invalid Bill Numbers', () => {
      invalidCases.forEach(({ input, expected }) => {
        test(`returns ${input} as invalid`, () => {
          expect(parseBillNumber(input)).toEqual(expected);
        });
      });
    });
  });
});