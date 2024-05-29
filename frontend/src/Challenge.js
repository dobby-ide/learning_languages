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
  answersToApp,
  settingScore,
}) => {
  const [inputValue, setInputValue] = useState('');
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
  const [theAnswers, setTheAnswers] = useState([]);
  const onCheckAnswer = (e) => {
    e.preventDefault();
    if (numberOfQuestions === indexQuestion - 1) {
      console.log('score is: -----------');
      console.log(score);
      settingScore(score);
      setButton(false);
      back();
      setIndexQuestion(0);
      answersToApp(theAnswers);
      endOfChallenge();
    } else {
      let rightAnswer = pairs[indexQuestion][secondChoice];
      let questionWord = pairs[indexQuestion][firstChoice];
      let answers = theAnswers;
      let wrong_right_obj = {};
      wrong_right_obj.answer = inputValue;
      wrong_right_obj.right = rightAnswer;
      wrong_right_obj.question = questionWord;
      console.log(theAnswers);
      if (inputValue === rightAnswer) {
        wrong_right_obj.true = true;
        answers.push(wrong_right_obj);

        setTheAnswers(answers);
        console.log('right answer your score is now:');
        setScore(score + 1);
        settingScore(score + 1);
      } else {
        wrong_right_obj.true = false;
        answers.push(wrong_right_obj);
        setTheAnswers(answers);
      }
      setIndexQuestion(indexQuestion + 1);
      setInputValue('');
      // let answer = e.target[0].value;
      // let rightAnswer = pairs[indexQuestion][secondChoice];
      // if (answer === rightAnswer) {
      //   setScore(score + 1);
    }
  };
  const endOfChallenge = () => {
    back(score);
    // console.log('score is ' + score);
    // setIndexQuestion(indexQuestion + 1);
  };
  const text = 'english';
  const createQuestion = () => {
    if (
      pairs.length > indexQuestion &&
      pairs[indexQuestion][firstChoice] &&
      pairs[indexQuestion][secondChoice]
    ) {
      return (
        <div>
          what is the {secondChoice} word for{' '}
          <b>{pairs[indexQuestion][firstChoice]}</b>??
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
      axios.post('/userscore', {
        data: { username: username, userscore: score },
      });
    }
  };
  const keepUserScore = (score) => {
    settingScore(score);
  };
  const answerQuestion = () => {
    if (button) {
      return (
        <div className="challenge__square-answer">
          <form
            onSubmit={onCheckAnswer}
            className="challenge__square-answer__form"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="challenge__square-answer__form-input"
            ></input>

            <button
              className="challenge__square-answer__form-btn"
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
        <div className="challenge__square">
          <div className="challenge__introtext">
            <p>
              Hello, you have chosen the {subject} subject. Let's start
              learning!!
            </p>
          </div>
          <div className="challenge__square-question"> {createQuestion()}</div>{' '}
          <div className="challenge__square-answer"> {answerQuestion()}</div>
          <div className="challenge__square-yourscoreis">your score is:</div>
          <div className="challenge__square-score">{score}</div>
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
};
export default Challenge;
