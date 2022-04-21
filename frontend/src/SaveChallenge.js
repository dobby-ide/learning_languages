import React from 'react';
import axios from 'axios';
import Card from './Card';
const SaveChallenge = ({ usertotalscore, username }) => {
  const url = 'http://localhost:3000/userscore';
  const savingScore = () => {
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
