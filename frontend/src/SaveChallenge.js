import React from 'react';
import axios from 'axios';
import Card from './Card';
const SaveChallenge = ({ usertotalscore, username, saveScore }) => {
  const url = '/userscore';
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
