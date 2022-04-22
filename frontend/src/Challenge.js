import Card from './Card';
import React from 'react';
import { useState} from 'react';
import SaveChallenge from './SaveChallenge';
const Challenge = ({
  showingTables,
  pairs,
  subject,
  startingscore,
  username,
  back
}) => {
  const numberOfQuestions = pairs.length;
  let [indexQuestion, setIndexQuestion] = useState(0);
  let [score, setScore] = useState(startingscore);
 let[button,setButton]=useState(true);
  const indexQuestionToZero = () => {
     
      
       
  };

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
    if (pairs.length > indexQuestion && button) {
      return (
        <div>
          what is the Finnish word for <b>{pairs[indexQuestion].english}:</b>
        </div>
      );
    } else {
      //call a function to set indeQuestion to 0
      
      //call a function to put the table visible again
     return <div>GAME OVER</div>;
     
     
    }
  };
  
 const checking = () =>{
   
    if (pairs.length === indexQuestion+1) {
setIndexQuestion(0);

console.log('HELLO');
setButton(false)
back();


 }}
  const answerQuestion = () => {
     if(button){
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
    );}
  };

  return (
    <Card className="challenge">
      {subject !== '' && numberOfQuestions > 0 ? (
        <div className="challengesquare">
          <div className="introtext">
            <p>WELCOME, you have chosen the {subject} subject.</p>
            <p> Let's start learning!!</p>
          </div>
          <div className="question"> {createQuestion()}</div>{' '}
          <div className="answer"> {answerQuestion()}</div>
          <div className="score">{score}</div>
        </div>
      ) : null}
      <SaveChallenge usertotalscore={score} username={username} />
      {indexQuestion}
    </Card>
  );
};;
export default Challenge;
