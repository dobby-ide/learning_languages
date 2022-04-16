const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = 3000;
const route = express.Router();
//enabling cors
app.use(cors());
app.use(express.json());
const database = require('./controllers/admincontrollers');
app.route('/admin/subjects').get(async (req, res) => {
  try {
    const result = await database.findAll();
    console.log(result.length);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).end();
  }
});
//saving a subject
app.route('/admin/subjects').post(async (req, res) => {
  console.log(req.body);
  const resourceToSend = req.body.newsubject;
  const result = await database.saveSubject(resourceToSend);
  res.send(result);
});
//retrieving pairs from a specific subject
app.route('/admin/subjects/subject').get(async (req, res) => {
  const subject = req.query.subject;
  console.log(req.query.subject);
  try{
    const result = await database.findSingleSubjectPairs(subject);
    res.send(result);
  }
  catch(err){res.status(404)}
});

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
