// logic to parse/validate

let invalidResult = {
  isValid: false,
  billNumberLong: null,
  billNumberShort: null,
  chamber: null,
  type: null,
  suffix: null
}

const parseBillNumber = (raw) => {
  raw = raw.replace(/\s+/g, '')
  if (raw.length < 3) return invalidResult;
  let result = {
    isValid: true
  };
  const chamber = raw[0].toUpperCase();
  if (chamber !== 'H' && chamber !== 'S') {
    return invalidResult;
  } else {
    result.chamber = chamber
  }
  const type = raw[1].toUpperCase();
  if (Number(raw[2])) {
    result.type = type
  } else {
    result.type = type+raw[2].toUpperCase()
  }
  const number = Number(raw.match(/\d+/));
  if (number) result.suffix = String(number).padStart(5, '0')
  else return invalidResult;
  result.billNumberLong = `${result.chamber}${result.type}${result.suffix}`;
  result.billNumberShort = `${result.chamber}${result.type} ${String(number)}`;
  return result;
}

module.exports = {
  parseBillNumber
}