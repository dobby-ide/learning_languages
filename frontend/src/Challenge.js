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
  let numberOfQuestions = pairs.length;
  for (let i = 0; i < pairs.length; i++) {
    if (typeof pairs[i][secondChoice] !== 'undefined') {
      numberOfQuestions = i;
    }
  }

  let [indexQuestion, setIndexQuestion] = useState(0);
  let [score, setScore] = useState(startingscore);
  let [button, setButton] = useState(true);
  const [saveButton, setSaveButton] = useState(false);

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
    console.log(indexQuestion);
    if (
      pairs.length > indexQuestion &&
      button &&
      pairs[indexQuestion][firstChoice] &&
      pairs[indexQuestion][secondChoice]
    ) {
      return (
        <div>
          what is the {secondChoice} word for{' '}
          <b>{pairs[indexQuestion][firstChoice]}:</b>
        </div>
      );
    } else {
      return <div>Thank you for playing, press OK</div>;
    }
  };

  const checking = () => {
    removeTables();
    setSaveButton(true);
    if (numberOfQuestions === indexQuestion) {
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
