import Card from './Card';
import React from 'react';
const Congratulations = ({ username, userscore }) => {
  return (
    <Card className="savechallenge">
      {username ? (
        <div className="congrats">
          congratulations, {username}, you have now a total of {userscore}{' '}
          points! Try again to earn more points.
        </div>
      ) : null}
      {!username ? (
        <div className="congrats">
          Total score for this challenge: {userscore}
        </div>
      ) : null}
    </Card>
  );
};
export default Congratulations;
