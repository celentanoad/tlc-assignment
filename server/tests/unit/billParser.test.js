const { parseBillNumber } = require("../../services/billParser");

describe('billParser', () => {
  test('parses bill correctly', () => {
    const result = parseBillNumber('HB5');
    expect(result).toEqual({
      isValid: true,
      billNumberLong: 'HB00005',
      billNumberShort: 'HB5',
      chamber: 'H',
      type: 'B',
      suffix: '00005'
    });
  });
});