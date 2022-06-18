import Card from './Card';
import React from 'react';
const Congratulations = ({ username, userscore }) => {
  return (
    <Card className="savechallenge">
      {username ? (
        <div className="congrats">
          <h3 className="congrats__heading">
            congratulations, {username}, you have now a total of {userscore}{' '}
            points! Try again to earn more points.
          </h3>
        </div>
      ) : null}
      {!username ? (
        <div className="congrats">
          <h3 className="congrats__heading">
            Total score for this challenge: {userscore}
          </h3>
        </div>
      ) : null}
    </Card>
  );
};
export default Congratulations;
