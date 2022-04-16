const mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  multipleStatements: true,
});

module.exports = {
  connecting: () => {
    dbConnection.connect((err) => {
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
        `INSERT INTO Subjects (subject_name) VALUES("prova");`,
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
  findSingleSubjectPairs: (subject) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT english,finnish
FROM Subjects_pairs
WHERE subject_id IN (SELECT id FROM Subjects WHERE subject_name="${subject}");`,
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
};
