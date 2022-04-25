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
  //SAVE A PAIR
  savePair: (english, finnish, subject) => {
    //dev: IMPORTANT to have validation here to prevent sql injection
    function myProm(resolve, reject) {
      dbConnection.query(
        `INSERT INTO Subjects_pairs (subject_id, english, finnish) VALUES((select id from Subjects where subject_name="${subject}"),"${english}","${finnish}");`,
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
  //find a single subject word pairs
  findSingleSubjectPairs: (subject) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `SELECT id,subject_id,english,finnish
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
  deletePairs: (id) => {
    function myProm(resolve, reject) {
      dbConnection.query(
        `DELETE FROM Subjects_pairs WHERE id=${id}`,
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
          // if (result.affectedRows == 1) {
          resolve(result);
          // } else {
          // reject(err);
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
