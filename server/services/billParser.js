// logic to parse/validate

const parseBillNumber = (raw) => {
  let result = {
    isValid: true,
    billNumberLong: 'HB00005',
    billNumberShort: "HB5",
    chamber: 'H',
    type: 'B',
    suffix: '00005'
  }
  return result;
}

module.exports = {
  parseBillNumber
}