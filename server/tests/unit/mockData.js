const validCases = [
  {
    input: "HB5",
    expected: {
      isValid: true,
      billNumberLong: "HB00005",
      billNumberShort: "HB 5",
      chamber: "H",
      type: "B",
      suffix: "00005"
    }
  },
  {
    input: "h cr 12",
    expected: {
      isValid: true,
      billNumberLong: "HCR00012",
      billNumberShort: "HCR 12",
      chamber: "H",
      type: "CR",
      suffix: "00012"
    }
  },
  {
    input: "scr 7",
    expected: {
      isValid: true,
      billNumberLong: "SCR00007",
      billNumberShort: "SCR 7",
      chamber: "S",
      type: "CR",
      suffix: "00007"
    }
  },
  {
    input: "SB99999",
    expected: {
      isValid: true,
      billNumberLong: "SB99999",
      billNumberShort: "SB 99999",
      chamber: "S",
      type: "B",
      suffix: "99999"
    }
  }
];

// Invalid inputs
const invalidCases = [
  {
    input: "ABC",
    expected: {
      isValid: false,
      billNumberLong: null,
      billNumberShort: null,
      chamber: null,
      type: null,
      suffix: null,
      error: 'Invalid Bill Number'
    }
  },
  {
    input: "BH5",
    expected: {
      isValid: false,
      billNumberLong: null,
      billNumberShort: null,
      chamber: null,
      type: null,
      suffix: null,
      error: 'Invalid Bill Number'
    }
  },
  {
    input: "",
    expected: {
      isValid: false,
      billNumberLong: null,
      billNumberShort: null,
      chamber: null,
      type: null,
      suffix: null,
      error: 'Bill number is required'
    }
  }
];

module.exports = {
  validCases,
  invalidCases
}