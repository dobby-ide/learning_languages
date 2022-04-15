const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());
const database = require('./controllers/admincontrollers');

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
  database.connecting((err) => {
    if (err) {
      console.log('problem connecting');
    } else {
      console.log('MySQL connection succesful');
    }
  });
});
