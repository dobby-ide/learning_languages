import Card from './Card';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Challenge from './Challenge';

function Child({
  username,
  userscore,
  back,
  setUserScore,
  firstChoice,
  secondChoice,
  sendingAnswersToApp
}) {
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:3000';
  }
  const url = `${port}/admin/subjects`;
  const [subject, setSubject] = useState([]);
  const [tableInUse, setTableInUse] = useState('');
  const [wordPairs, setWordPairs] = useState([]);
  const [tablesInvisible, setTablesInvisible] = useState(false);

  useEffect(() => {
    retrievingData();
  }, []);
  const answersToApp = (answers) =>{
    sendingAnswersToApp(answers);
  }
  const storingSubjectName = (e) => {
    setTableInUse(e);
  };
  const onSettingNewScore = (score) => {
    setUserScore(score);
  };
  const backToApp = () => {
    back();
  };
  const onRemovingTables = () => {
    setTablesInvisible(true);
  };

  const onShowingPairs = async (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);

    storingSubjectName(e.target.innerHTML);

    const parameter = e.target.innerHTML;
    const pairsOfSingleSubject = await axios.get(
      `${port}/child/subjects/subject?subject=${parameter}&firstlanguage=${firstChoice}&secondlanguage=${secondChoice}`
    );
    setWordPairs(pairsOfSingleSubject.data);
  };

  //GET ALL SUBJECTS INTO STATE
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data); //subject = [{id:1,subject_name:Animals},{id:2.......}]
  };

  console.log(wordPairs);
  return (
    <Card className="child">
      {username ? <div>Hello {username}</div> : null}

      <div className="child__subjectscontainer">
        {subject.map((singleSubject) => {
          return (
            <div key={singleSubject.id}>
              {!tablesInvisible ? (
                <div className="child__subjects" onClick={onShowingPairs}>
                  {singleSubject.subject_name}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {tableInUse !== '' ? (
        <div className="tableinusechild">Subject: {tableInUse}</div>
      ) : null}
      <Challenge
      answersToApp={answersToApp}
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        settingScore={onSettingNewScore}
        back={backToApp}
        username={username}
        startingscore={userscore}
        subject={tableInUse}
        pairs={wordPairs}
        removeTables={onRemovingTables}
        className="challengeChild"
      />
    </Card>
  );
}

export default Child;
