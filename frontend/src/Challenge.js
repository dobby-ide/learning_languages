import Card from './Card';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Challenge = ({ pairs, subject }) => {
  const numberOfQuestions = pairs.length;
  let [indexQuestion, setIndexQuestion] = useState(0);
  let [score, setScore] = useState(0);
  console.log(pairs.length);
  console.log(subject);
  const onCheckAnswer = (e) => {
    e.preventDefault();
    let answer = e.target[0].value;
    let rightAnswer = pairs[indexQuestion].finnish;
    if (answer === rightAnswer) {
      setScore(score + 1);
    }
    console.log('score is ' + score);
    setIndexQuestion(indexQuestion + 1);
  };
  const createQuestion = () => {
    return (
      <div>
        what is the Finnish word for <b>{pairs[indexQuestion].english}</b>
      </div>
    );
  };
  const answerQuestion = () => {
    return (
      <div>
        <form onSubmit={onCheckAnswer}>
          <input type="text"></input>
          <button type="submit">OK</button>
        </form>
      </div>
    );
  };

  return (
    <Card className="challenge">
      {subject !== '' && numberOfQuestions > 0 ? (
        <div>
          WELCOME, you have chosen the {subject} subject. Let's start learning!!
          <div> {createQuestion()}</div> <div> {answerQuestion()}</div>
          <div>your score is:{score}</div>
        </div>
      ) : null}
    </Card>
  );
};
export default Challenge;
