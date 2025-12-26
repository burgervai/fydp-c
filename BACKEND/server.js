const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const db = require('./models');
const errorHandler = require('./middleware/errorHandler');
const { authLimiter, apiLimiter } = require('./middleware/rateLimit');
const auditRequest = require('./middleware/auditMiddleware');
const { specs, swaggerUi, swaggerOptions } = require('./docs/api-docs');
require('dotenv').config();

const app = express();

// Polyfill
if (typeof global.File === 'undefined') {
  global.File = class {};
}

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);
app.use(auditRequest);

app.get('/api/health', async (_, res) => {
  try {
    await db.sequelize.authenticate();
    res.json({ status: 'ok', database: 'Neon PostgreSQL' });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
app.use('/api', require('./routes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await db.syncDatabase();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
};

if (require.main === module) startServer();
module.exports = app;
