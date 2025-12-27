const express = require('express');
const db = require('./models');

const app = express();
app.use(express.json());

db.sequelize.authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server running');
    });
  })
  .catch(err => console.error('❌ DB Error:', err));
