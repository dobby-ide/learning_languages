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
//GET ALL
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
//SAVING a new PAIR
app.route('/admin/subjects/newpair').post(async (req, res) => {
  console.log(req.body);
  const english = req.body.english;
  const finnish = req.body.finnish;
  const subject = req.body.subject;
  const result = await database.savePair(english,finnish,subject);
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
//DELETING A SUBJECT (frontend gets the id from db)
app.route('/admin/subjects/subject').delete(async (req, res) => {
  const id = req.query.subject;
  console.log(id);
  console.log("hello")
  try{
    const result = await database.deleteSubject(id);
    res.send(result);
  }catch(err){
    console.log(err)
    res.status(404);
  }

});
//DELETE WORDS PAIR
app.route('/admin/subjects/pairs').delete(async (req, res) => {
  const id = req.query.pairs;
  console.log(id);
  
  try {
    const result = await database.deletePairs(id);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
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
