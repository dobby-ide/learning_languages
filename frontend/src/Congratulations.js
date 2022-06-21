import Card from './Card';
import React from 'react';
const Congratulations = ({ username, userscore, answers }) => {
  //answers is an array of obbjects that [{answer:"answerfromusers", true:true/false}]
  console.log('inside Congratulations');
  console.log(answers);
  return (
    <Card className="savechallenge">
      {username ? (
        <div className="congrats">
          <h3 className="congrats__heading">
            congratulations, {username}, you have now a total of {userscore}{' '}
            points! Try again to earn more points.
          </h3>
          <p>hover the card to see more</p>
        </div>
      ) : null}
      {!username ? (
        <div className="congrats">
          <div className="cardcong">
            <div className="cardcong__side cardcong__side--front">
              <h3 className="congrats__heading">
                Congratulations, now you have a total of {userscore} points! Try
                again!
              </h3>
              <p className="congrats__heading-paragraph">
                hover over the card to see more
              </p>
            </div>
            <div className="cardcong__side cardcong__side--back">
              <h3 className="cardcong__side--back-header">
                Latest challenge results
              </h3>
              <div className="cardcong__answers-container">
                <div className="cardcong__answers-container-titles">
                  original
                </div>
                <div className="cardcong__answers-container-titles">
                  your answer
                </div>
                <div className="cardcong__answers-container-titles">
                  &#10004; or &#10060;
                </div>
                <div className="cardcong__answers-container-titles">
                  correct answer
                </div>
                {answers.map((answer) => {
                  return (
                    <div className="cardcong__answers-container-flex">
                      <div className="cardcong__answers-container-flex-data">
                        {answer.question}
                      </div>
                      <div className="cardcong__answers-container-flex-data">
                        {answer.answer}
                      </div>
                      {answer.true ? (
                        <div className="cardcong__answers-container-flex-data">
                          &#10004;
                        </div>
                      ) : (
                        <div className="cardcong__answers-container-flex-data">
                          &#10060;
                        </div>
                      )}
                      <div className="cardcong__answers-container-flex-data">
                        {answer.right}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};
export default Congratulations;
