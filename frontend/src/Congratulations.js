import Card from './Card';
import React from 'react';
const Congratulations = ({ username, userscore }) => {
  return (
    <Card className="savechallenge">
      {username ? (
        <div className="congrats">
          WELL DONE {username}!! You have a total of {userscore} points! Try
          again to earn more points.
        </div>
      ) : null}
      {!username ? (
        <div className="congrats">Your score is {userscore}</div>
      ) : null}
    </Card>
  );
};
export default Congratulations;
