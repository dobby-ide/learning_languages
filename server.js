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
  const firstWord = req.body.firstword;
  const secondWord = req.body.secondword;
  const subject = req.body.subject;
  const firstlanguage = req.body.firstlanguage;
  const secondlanguage = req.body.secondlanguage;
  const result = await database.savePair(
    firstlanguage,
    secondlanguage,
    firstWord,
    secondWord,
    subject
  );
  res.send(result);
});
//retrieving pairs from a specific subject
app.route('/admin/subjects/subject').get(async (req, res) => {
  const subject = req.query.subject;
  const firstlanguage = req.query.firstlanguage;
  const secondlanguage = req.query.secondlanguage;

  try {
    const result = await database.findSingleSubjectPairs(
      subject,
      firstlanguage,
      secondlanguage
    );
    res.send(result);
  } catch (err) {
    res.status(404);
  }
});
//DELETING A SUBJECT (frontend gets the id from db)
app.route('/admin/subjects/subject').delete(async (req, res) => {
  const id = req.query.subject;
  console.log(id);
  console.log('hello');
  try {
    const result = await database.deleteSubject(id);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});
//DELETE WORDS PAIR
app.route('/admin/subjects/pairs').delete(async (req, res) => {
  const firstword = req.query.firstword;
  const secondword = req.query.secondword;
  const firstlanguage = req.query.firstlanguage;
  const secondlanguage = req.query.secondlanguage;

  try {
    const result = await database.deletePairs(
      firstword,
      secondword,
      firstlanguage,
      secondlanguage
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});
// newword:patchWord,existingword:existingWord,
//   languageToPatch:languageTable,
// firstlanguage:firstlanguage,secondlanguage:secondlanguage
//Putting a word in a language where word does not exist yet
app.route('/put').post(async (req, res) => {
  const existingWord = req.body.existingword;
  const newword = req.body.newword;
  const firstlanguage = req.body.firstlanguage;
  const secondlanguage = req.body.secondlanguage;
  const languageToPatch = req.body.languageToPatch;
  const theotherlanguage= req.body.theotherlanguage;
  console.log(
    newword,
    firstlanguage,
    existingWord,
    secondlanguage,
    languageToPatch
  );
  try {
    const result = await database.patchAWord(
      existingWord,
      newword,
      firstlanguage,
      secondlanguage,
      languageToPatch,
      theotherlanguage
    );
    if (result) {
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});
//USER logged in
app.route('/login/users').get(async (req, res) => {
  try {
    const result = await database.getUsers();
    if (result) {
      res.send(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
});
//user registration
app.route('/register/users').post(async (req, res) => {
  console.log(req.body.data);
  try {
    const name = req.body.data.newuser;
    const password = req.body.data.newpassword;

    const result = await database.saveUser(name, password);
    res.send(result);
  } catch (err) {
    res.send(err);
    res.status(404);
  }
});
//user save its score
app.route('/userscore').post(async (req, res) => {
  console.log(req.body.data);
  const name = req.body.data.username;
  const score = req.body.data.userscore;

  const result = await database.saveUserScore(name, score);
  res.send(result);
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
