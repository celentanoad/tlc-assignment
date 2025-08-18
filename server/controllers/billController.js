const { parseBillNumber } = require('../services/billParser');

const parseBill = (req, res) => {
  const { billNumber } = req.body;
  if (!billNumber || billNumber.trim() === '') {
    return res.status(400).json({
      isValid: false,
      billNumberLong: null,
      billNumberShort: null,
      chamber: null,
      type: null,
      suffix: null,
      error: 'Bill number is required'
    });
  }

  const result = parseBillNumber(billNumber);
  return res.json(result);
}

module.exports = { parseBill }