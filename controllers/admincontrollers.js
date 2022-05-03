const res = require('express/lib/response');
const mysql = require('mysql');
var dbConnection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
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
    function myProm(resolve, reject) {
      dbConnection.query('SELECT * FROM Subjects', (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject(console.log(err));
        }
      });
    }
    return new Promise(myProm);
  },
  //save a subject to Table Subjects(subject_name)
  saveSubject: (subject) => {
    //dev: IMPORTANT to have validation here to prevent sql injection
    function myProm(resolve, reject) {
      dbConnection.query(
        `INSERT INTO Subjects (subject_name) VALUES("${subject}");`,
        (err, result) => {
          // if (result.affectedRows == 1) {
          resolve(result);
          // } else {
          // reject(err);
        }
      );
    }
    return new Promise(myProm);
  },

  //  INSERT INTO ${firstlanguage} (${firstlanguage}, word_pairs_fk) VALUES ('${firstWord}', (SELECT MAX(id) +1 from Word_Pairs));
  //  INSERT INTO ${secondlanguage} (${secondWord}, word_pairs_fk) VALUES ('${secondWord}', (SELECT MAX(id) +1 from Word_Pairs));
  //SAVE A PAIR
  savePair: (firstlanguage, secondlanguage, firstWord, secondWord, subject) => {
    //dev: IMPORTANT to have validation here to prevent sql injection
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO Word_Pairs (subject_id) SELECT id FROM Subjects WHERE subject_name = "${subject}";`,
        (err, result) => {
          if (result) {
            dbConnection.query(
              `INSERT INTO ${firstlanguage} (${firstlanguage}, word_pairs_fk) VALUES ('${firstWord}', (SELECT MAX(id) from Word_Pairs));
              INSERT INTO ${secondlanguage} (${secondlanguage}, word_pairs_fk) VALUES ('${secondWord}', (SELECT MAX(id) from Word_Pairs));`,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
              }
            );
            resolve(result);
          }
        }
      );
    });
  },
  // put a new word whereas an existing word already exists
  patchAWord: (
    existingWord,
    newword,
    firstlanguage,
    secondlanguage,
    languageToPatch,
    theotherlanguage
  ) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO ${languageToPatch}(${languageToPatch}, word_pairs_fk) VALUES(
          "${newword}", (SELECT word_pairs_fk FROM ${theotherlanguage} WHERE ${theotherlanguage}="${existingWord}")
        );`,
        (err, results) => {
          if (results) {
            resolve(results);
          }
          if (err) {
            console.log(err);
          }
        }
      );
    });
  },
  //find a single subject word pairs (ADMIN)
  findSingleSubjectPairs: (subject, firstlanguage, secondlanguage) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT  ${firstlanguage}.${firstlanguage}, ${secondlanguage}.${secondlanguage} 
FROM ${firstlanguage}
LEFT JOIN ${secondlanguage} ON ${firstlanguage}.word_pairs_fk = ${secondlanguage}.word_pairs_fk
INNER JOIN Word_Pairs ON Word_Pairs.id = ${firstlanguage}.word_pairs_fk
INNER JOIN Subjects ON Word_Pairs.subject_id = Subjects.id WHERE Subjects.subject_name="${subject}"
;`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },
  //find a single subject word pairs (child)
  findSingleSubjectPairsChild: (subject, firstlanguage, secondlanguage) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT  ${firstlanguage}.${firstlanguage}, ${secondlanguage}.${secondlanguage} 
FROM ${firstlanguage}
LEFT JOIN ${secondlanguage} ON ${firstlanguage}.word_pairs_fk = ${secondlanguage}.word_pairs_fk
INNER JOIN Word_Pairs ON Word_Pairs.id = ${firstlanguage}.word_pairs_fk
INNER JOIN Subjects ON Word_Pairs.subject_id = Subjects.id WHERE Subjects.subject_name="${subject}"
AND ${firstlanguage}.${firstlanguage} is not null AND ${secondlanguage}.${secondlanguage} is not null ;`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },

  //delete a subject from the table
  //dev: database needs to be set such that "ON DELETE CASCADE";
  deleteSubject: (id) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `DELETE FROM Subjects WHERE id=${id}`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },
  //DELETES PAIR of WORDS
  deletePairs: (firstword, secondword, firstlanguage, secondlanguage) => {
    console.log(firstword);
    console.log(secondword);
    console.log(firstlanguage);
    console.log(secondlanguage);
    function myProm(resolve, reject) {
      dbConnection.query(
        `DELETE FROM ${firstlanguage} WHERE ${firstlanguage}="${firstword}";
        DELETE FROM ${secondlanguage} WHERE ${secondlanguage}="${secondword}";`,
        (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(console.log(err));
          }
        }
      );
    }
    return new Promise(myProm);
  },
  getUsers: () => {
    function myProm(resolve, reject) {
      dbConnection.query('SELECT * FROM User', (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject(console.log(err));
        }
      });
    }
    return new Promise(myProm);
  },
  saveUser: (name, password) => {
    //dev: IMPORTANT to have validation here to prevent sql injection
    function myProm(resolve, reject) {
      dbConnection.query(
        `INSERT INTO User (user,pass,score) VALUES("${name}", "${password}", 0);`,
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    }
    return new Promise(myProm);
  },
  saveUserScore: (name, score) => {
    //dev: IMPORTANT to have validation here to prevent sql injection
    function myProm(resolve, reject) {
      dbConnection.query(
        `UPDATE User SET score ="${score}"
        WHERE user = "${name}";`,
        (err, result) => {
          // if (result.affectedRows == 1) {
          resolve(result);
          // } else {
          // reject(err);
        }
      );
    }
    return new Promise(myProm);
  },
};
