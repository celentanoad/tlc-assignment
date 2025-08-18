const express = require('express');
const billRoutes = require('./routes/billRoutes');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use('/api/billnumber', billRoutes);

app.get('/error-test', (req, res) => {
  throw new Error("Forced test error");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      code: 500,
      message: 'Internal Server Error'
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});