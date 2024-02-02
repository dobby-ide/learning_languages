const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const route = express.Router();

//enabling cors
app.use(cors());
app.use(express.static('frontend/build'));
app.use(express.json());
const database = require('./controllers/admincontrollers');
//GET ALL
app.route('/admin/subjects').get(async (req, res) => {
  try {
    const result = await database.findAll();

    if (result.length > 0) {
      console.log('Subjects retrieved:', result.length);
      res.status(200).send(result);
    } else {
      console.log('No subjects found.');
      res.status(404).send('No subjects found.');
    }
  } catch (error) {
    console.error('Error retrieving subjects:', error);
    res.status(500).send('Error retrieving subjects: ' + error.message);
  }
});

//saving a subject
app.route('/admin/subjects').post(async (req, res) => {
  try {
    console.log(req.body);
    const resourceToSend = req.body.newsubject;
    const result = await database.saveSubject(resourceToSend);
    res.send(result);
  } catch (error) {
    console.error('Error saving subject:', error);
    res.status(500).send('Error saving subject: ' + error.message);
  }
});
//SAVING a new PAIR
app.route('/admin/subjects/newpair').post(async (req, res) => {
  try {
    console.log(req.body);
    const { firstword, secondword, subject, firstlanguage, secondlanguage } =
      req.body;

    // Call the savePair function to save the word pair
    const result = await database.savePair(
      firstlanguage,
      secondlanguage,
      firstword,
      secondword,
      subject
    );

    // Send the result back as the response
    res.send(result);
  } catch (error) {
    // If an error occurs during the database operation, send an error response
    console.error('Error saving word pair:', error);
    res.status(500).send('Error saving word pair: ' + error.message);
  }
});

//retrieving pairs from a specific subject (ADMIN)
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
//retrieving pairs from a specific subject (Child)
app.route('/child/subjects/subject').get(async (req, res) => {
  const subject = req.query.subject;
  const firstlanguage = req.query.firstlanguage;
  const secondlanguage = req.query.secondlanguage;

  try {
    const result = await database.findSingleSubjectPairsChild(
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
    // Call the deleteSubject function to delete the subject
    const result = await database.deleteSubject(id);
    // Send the result back as the response
    res.status(200).send(result);
  } catch (error) {
    // If an error occurs during the database operation, log the error and send an error response to the client
    console.error('Error deleting subject:', error);
    res.status(500).send('Error deleting subject: ' + error.message);
  }
});

//DELETE WORDS PAIR
app.route('/admin/subjects/pairs').delete(async (req, res) => {
  const firstword = req.query.firstword;
  const secondword = req.query.secondword;
  const firstlanguage = req.query.firstlanguage;
  const secondlanguage = req.query.secondlanguage;

  try {
    // Call the deletePairs function to delete the word pairs
    const result = await database.deletePairs(
      firstword,
      secondword,
      firstlanguage,
      secondlanguage
    );
    // Send the result back as the response
    res.status(200).send(result);
  } catch (error) {
    // If an error occurs during the database operation, log the error and send an error response to the client
    console.error('Error deleting word pairs:', error);
    res.status(500).send('Error deleting word pairs: ' + error.message);
  }
});

// newword:patchWord,existingword:existingWord,
//   languageToPatch:languageTable,
// firstlanguage:firstlanguage,secondlanguage:secondlanguage
//Putting a word in a language where word does not exist yet
app.route('/put').post(async (req, res) => {
  const {
    existingword,
    newword,
    firstlanguage,
    secondlanguage,
    languageToPatch,
    theotherlanguage,
  } = req.body;

  console.log(
    newword,
    firstlanguage,
    existingword,
    secondlanguage,
    languageToPatch
  );

  try {
    // Call the patchAWord function to update the word
    const result = await database.patchAWord(
      existingword,
      newword,
      firstlanguage,
      secondlanguage,
      languageToPatch,
      theotherlanguage
    );

    // Send the result back as the response
    res.status(200).send(result);
  } catch (error) {
    // If an error occurs during the database operation, log the error and send an error response to the client
    console.error('Error updating word:', error);
    res.status(500).send('Error updating word: ' + error.message);
  }
});

//USER logged in
app.route('/login/users').get(async (req, res) => {
  try {
    // Call the getUsers function to retrieve users from the database
    const result = await database.getUsers();

    // Check if any users were retrieved
    if (result && result.length > 0) {
      // Send the retrieved users as the response
      res.status(200).send(result);
    } else {
      // Send a response indicating that no users were found
      res.status(404).send('No users found');
    }
  } catch (error) {
    // Log detailed error message to the console
    console.error('Error retrieving users:', error);

    // Send an error response to the client with a 500 status code
    res.status(500).send('Internal Server Error');
  }
});

//user registration
app.route('/register/users').post(async (req, res) => {
  try {
    // Extract user data from the request body
    const { newuser, newpassword } = req.body.data;

    // Save the new user to the database
    const result = await database.saveUser(newuser, newpassword);

    // Send a success response with the result
    res.status(200).send(result);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error registering user:', error);

    // Send a user-friendly error response to the client
    res.status(500).send('Failed to register user. Please try again later.');
  }
});
app.route('/register/users').post(async (req, res) => {
  try {
    // Extract user data from the request body
    const { newuser, newpassword } = req.body.data;

    // Save the new user to the database
    const result = await database.saveUser(newuser, newpassword);

    // Send a success response with the result
    res.status(200).send(result);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error registering user:', error);

    // Send a user-friendly error response to the client
    res.status(500).send('Failed to register user. Please try again later.');
  }
});

//user save its score
// Define endpoint for updating user scores
app.route('/userscore').post(async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, userscore } = req.body.data;

    // Save the user score to the database
    const result = await database.saveUserScore(username, userscore);

    // Send a success response with the result
    res.status(200).send(result);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating user score:', error);

    // Send a user-friendly error response to the client
    res
      .status(500)
      .send('Failed to update user score. Please try again later.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  // Connect to the database
  database.connecting((err) => {
    if (err) {
      console.error('Problem connecting to the database:', err);
    } else {
      console.log('MySQL connection successful');
    }
  });
});

