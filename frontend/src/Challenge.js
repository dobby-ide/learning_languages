import Card from './Card';
import React from 'react';
import { useState} from 'react';
import SaveChallenge from './SaveChallenge';
import axios from 'axios';
const Challenge = ({
  firstChoice,
  secondChoice,
  removeTables,
  pairs,
  subject,
  startingscore,
  username,
  back,
  settingScore,
}) => {
  const numberOfQuestions = pairs.length;
  let [indexQuestion, setIndexQuestion] = useState(0);
  let [score, setScore] = useState(startingscore);
  let [button, setButton] = useState(true);
  const [saveButton, setSaveButton] = useState(false);
  const indexQuestionToZero = () => {};

  const onCheckAnswer = (e) => {
    e.preventDefault();

    let answer = e.target[0].value;
    let rightAnswer = pairs[indexQuestion][secondChoice];
    if (answer === rightAnswer) {
      setScore(score + 1);
    }
    console.log('score is ' + score);
    setIndexQuestion(indexQuestion + 1);
  };
  const text = 'english';
  const createQuestion = () => {
    if (pairs.length > indexQuestion && button) {
      return (
        <div>
          what is the {secondChoice} word for{' '}
          <b>{pairs[indexQuestion][firstChoice]}:</b>
        </div>
      );
    } else {
      return <div>GAME OVER</div>;
    }
  };

  const checking = () => {
    removeTables();
    setSaveButton(true);
    if (pairs.length === indexQuestion + 1) {
      setIndexQuestion(0);
      axios.post('http://localhost:3000/userscore', {
        data: { username: username, userscore: score },
      });
      settingScore(score);
      console.log('HELLO');
      setButton(false);
      back();
    }
  };
  const keepUserScore = (score) => {
    settingScore(score);
  };
  const answerQuestion = () => {
    if (button) {
      return (
        <div>
          <form onSubmit={onCheckAnswer}>
            <input type="text"></input>

            <button
              type="submit"
              onClick={() => {
                checking();
              }}
            >
              OK
            </button>
          </form>
        </div>
      );
    }
  };

  return (
    <Card className="challenge">
      {subject !== '' && numberOfQuestions > 0 ? (
        <div className="challengesquare">
          <div className="introtext">
            <p>
              WELCOME, you have chosen the {subject} subject. Let's start
              learning!!
            </p>
          </div>
          <div className="question"> {createQuestion()}</div>{' '}
          <div className="answer"> {answerQuestion()}</div>
          <div className="yourscoreis">your score is:</div>
          <div className="score">{score}</div>
        </div>
      ) : null}
      {saveButton ? (
        <SaveChallenge
          usertotalscore={score}
          username={username}
          saveScore={keepUserScore}
        />
      ) : null}
    </Card>
  );
};;
export default Challenge;
