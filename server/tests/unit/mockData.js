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
    input: "HB 005",
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
  },
  {
    input: "HJR00123",
    expected: {
      isValid: true,
      billNumberLong: "HJR00123",
      billNumberShort: "HJR 123",
      chamber: "H",
      type: "JR",
      suffix: "00123"
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
      error: 'Invalid bill number'
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
      error: 'Invalid bill number'
    }
  },
  {
    input: "BH 005",
    expected: {
      isValid: false,
      billNumberLong: null,
      billNumberShort: null,
      chamber: null,
      type: null,
      suffix: null,
      error: 'Invalid bill number'
    }
  }
];

module.exports = {
  validCases,
  invalidCases
}