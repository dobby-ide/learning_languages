import React from 'react';
import axios from 'axios';
import Card from './Card';
const SaveChallenge = ({ usertotalscore, username, saveScore }) => {
   let port = '';
   if (process.env.NODE_ENV === 'development') {
     port = 'http://localhost:3000';
   }
   const url = `${port}/userscore`;
  const savingScore = () => {
    saveScore(usertotalscore);
    axios.post(url, {
      data: { username: username, userscore: usertotalscore },
    });
  };
  return (
    <div>
      {usertotalscore > 0 && username ? (
        <div onClick={savingScore} className="savinguserscore">
          saving user score to db
        </div>
      ) : null}
    </div>
  );
};
export default SaveChallenge;
