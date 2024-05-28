const mysql = require('mysql');
var dbConnection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});

module.exports = {
  connecting: () => {
    dbConnection.getConnection((err) => {
      if (err) {
        console.log(err);
        console.log('problem connecting to database');
      } else {
        console.log('connecting to database successfully');
      }
    });
  },
  //find all
  findAll: () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM Subjects', (err, results) => {
        if (err) {
          console.error('Error retrieving subjects:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  },
  //save a subject to Table Subjects(subject_name)
  saveSubject: (subject) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO Subjects (subject_name) VALUES (?)`,
        [subject],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  //SAVE A PAIR
  savePair: (firstlanguage, secondlanguage, firstWord, secondWord, subject) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO Word_Pairs (subject_id) SELECT id FROM Subjects WHERE subject_name = ?`,
        [subject],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          dbConnection.query(
            `INSERT INTO ${secondlanguage} (${secondlanguage}, word_pairs_fk) VALUES (?, (SELECT MAX(id) from Word_Pairs))`,
            [secondWord],
            (err, result) => {
              if (err) {
                return reject(err);
              }

              dbConnection.query(
                `INSERT INTO ${firstlanguage} (${firstlanguage}, word_pairs_fk) VALUES (?, (SELECT word_pairs_fk from ${secondlanguage} WHERE ${secondlanguage} = ?))`,
                [firstWord, secondWord],
                (err, result) => {
                  if (err) {
                    // If an error occurs, reject the promise with the error
                    return reject(err);
                  }

                  // Resolve the promise with the result
                  resolve(result);
                }
              );
            }
          );
        }
      );
    });
  },

  // put a new word whereas an existing word already exists
  patchAWord: (
    existingWord,
    newWord,
    firstLanguage,
    secondLanguage,
    languageToPatch,
    theOtherLanguage
  ) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO ${languageToPatch} (${languageToPatch}, word_pairs_fk) VALUES (?, (SELECT word_pairs_fk FROM ${theOtherLanguage} WHERE ${theOtherLanguage} = ?))`,
        [newWord, existingWord],
        (err, results) => {
          if (err) {
            console.error('Error patching word:', err);
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  },

  //find a single subject word pairs (ADMIN)
  findSingleSubjectPairs: (subject, firstlanguage, secondlanguage) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT ${firstlanguage}.${firstlanguage}, ${secondlanguage}.${secondlanguage}
      FROM ${firstlanguage}
      LEFT JOIN ${secondlanguage} ON ${firstlanguage}.word_pairs_fk = ${secondlanguage}.word_pairs_fk
      INNER JOIN Word_Pairs ON Word_Pairs.id = ${firstlanguage}.word_pairs_fk
      INNER JOIN Subjects ON Word_Pairs.subject_id = Subjects.id
      WHERE Subjects.subject_name=?
    `;

      dbConnection.query(query, [subject], (err, results) => {
        if (err) {
          console.error('Error retrieving word pairs:', err);
          return reject(err);
        }

        // Resolve the promise with the results
        resolve(results);
      });
    });
  },

  //find a single subject word pairs (child)
  findSingleSubjectPairsChild: (subject, firstlanguage, secondlanguage) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT ${firstlanguage}.${firstlanguage}, ${secondlanguage}.${secondlanguage}
      FROM ${firstlanguage}
      LEFT JOIN ${secondlanguage} ON ${firstlanguage}.word_pairs_fk = ${secondlanguage}.word_pairs_fk
      INNER JOIN Word_Pairs ON Word_Pairs.id = ${firstlanguage}.word_pairs_fk
      INNER JOIN Subjects ON Word_Pairs.subject_id = Subjects.id
      WHERE Subjects.subject_name=? AND ${firstlanguage}.${firstlanguage} IS NOT NULL AND ${secondlanguage}.${secondlanguage} IS NOT NULL
    `;

      dbConnection.query(query, [subject], (err, results) => {
        if (err) {
          console.error('Error retrieving word pairs:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  },

  //delete a subject from the table
  //dev: database needs to be set such that "ON DELETE CASCADE";
  deleteSubject: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Subjects WHERE id = ?`;

      dbConnection.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error deleting subject:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  },

  //DELETES PAIR of WORDS
  deletePairs: (firstword, secondword, firstlanguage, secondlanguage) => {
    return new Promise((resolve, reject) => {
      const query = `
      DELETE FROM ${firstlanguage} WHERE ${firstlanguage} = ?;
      DELETE FROM ${secondlanguage} WHERE ${secondlanguage} = ?;
    `;

      dbConnection.query(query, [firstword, secondword], (err, results) => {
        if (err) {
          console.error('Error deleting word pairs:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  },

  getUsers: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User';

      dbConnection.query(query, (err, results) => {
        if (err) {
          console.error('Error retrieving users:', err);
          return reject(err);
        }

        resolve(results);
      });
    });
  },

  saveUser: (name, password) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO User (user, pass, score) VALUES (?, ?, 0)';
      const values = [name, password];

      dbConnection.query(query, values, (err, result) => {
        if (err) {
          console.error('Error saving user:', err);
          return reject(err);
        }

        resolve(result);
      });
    });
  },

  saveUserScore: (name, score) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE User SET score = ? WHERE user = ?';
      const values = [score, name];

      dbConnection.query(query, values, (err, result) => {
        if (err) {
          console.error('Error saving user score:', err);
          return reject(err);
        }

        resolve(result);
      });
    });
  },
};
