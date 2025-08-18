let invalidResult = {
  isValid: false,
  billNumberLong: null,
  billNumberShort: null,
  chamber: null,
  type: null,
  suffix: null,
  error: 'Invalid Bill Number'
}

const removeWhitespace = (string) => string.replace(/\s+/g, '');

const formatSuffix = (raw) => {
  // Converted to Number and back to String to remove leading zeros, then add them back to ensure there are 5 digits total
  const number = String(Number(raw.match(/\d+/)));
  return number ? number.padStart(5, '0') : ''
}

const parseBillNumber = (raw) => {
  if (!raw || raw.length < 3) return invalidResult;
  const formattedRaw = removeWhitespace(raw);

  const chamber = formattedRaw[0].toUpperCase();
  if (chamber !== 'H' && chamber !== 'S') {
    return invalidResult;
  }

  let type = formattedRaw[1].toUpperCase();
  // determine if type has two characters ("CR" or "JR")
  if (isNaN(Number(formattedRaw[2]))) {
    type += formattedRaw[2].toUpperCase();
  }

  const suffix = formatSuffix(formattedRaw);
  // assume that billNumberLong is chamber + type + suffix
  // assume that billNumberShort is chamber + type + ' ' + non-padded number
  const nonPaddedNumber = String(Number(suffix));

  const result = {
    isValid: true,
    billNumberLong: `${chamber}${type}${suffix}`,
    billNumberShort: `${chamber}${type} ${nonPaddedNumber}`,
    chamber,
    type,
    suffix
  };

  return result;
}

module.exports = {
  parseBillNumber
}